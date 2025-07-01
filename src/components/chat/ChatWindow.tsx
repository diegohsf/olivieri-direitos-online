
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Send, MessageCircle } from "lucide-react";

interface Message {
  id: string;
  message_text: string;
  sender_type: 'client' | 'admin';
  sender_id: string;
  created_at: string;
  read_at: string | null;
}

interface ChatWindowProps {
  clientId: string;
  clientName: string;
  isAdmin?: boolean;
  currentUserId: string;
}

const ChatWindow = ({ clientId, clientName, isAdmin = false, currentUserId }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    initializeConversation();
  }, [clientId]);

  const initializeConversation = async () => {
    try {
      // Buscar conversa existente
      const { data: conversation, error: convError } = await supabase
        .from('conversations')
        .select('*')
        .eq('client_id', clientId)
        .single();

      if (convError && convError.code !== 'PGRST116') {
        throw convError;
      }

      let convId = conversation?.id;

      // Se não existe conversa, criar uma nova
      if (!conversation) {
        const { data: newConv, error: createError } = await supabase
          .from('conversations')
          .insert([{ client_id: clientId }])
          .select()
          .single();

        if (createError) throw createError;
        convId = newConv.id;
      }

      setConversationId(convId);
      await loadMessages(convId);
      setupRealtimeSubscription(convId);
    } catch (error) {
      console.error('Erro ao inicializar conversa:', error);
      toast.error('Erro ao carregar conversa');
    }
  };

  const loadMessages = async (convId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', convId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setMessages(data.map(msg => ({
        id: msg.id,
        message_text: msg.message_text,
        sender_type: msg.sender_type as 'client' | 'admin',
        sender_id: msg.sender_id,
        created_at: msg.created_at,
        read_at: msg.read_at
      })));
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
    }
  };

  const setupRealtimeSubscription = (convId: string) => {
    const channel = supabase
      .channel('chat_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `conversation_id=eq.${convId}`
        },
        (payload) => {
          const newMsg = payload.new as any;
          setMessages(prev => [...prev, {
            id: newMsg.id,
            message_text: newMsg.message_text,
            sender_type: newMsg.sender_type as 'client' | 'admin',
            sender_id: newMsg.sender_id,
            created_at: newMsg.created_at,
            read_at: newMsg.read_at
          }]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !conversationId || loading) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert([{
          conversation_id: conversationId,
          sender_type: isAdmin ? 'admin' : 'client',
          sender_id: currentUserId,
          message_text: newMessage.trim()
        }]);

      if (error) throw error;

      setNewMessage('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      toast.error('Erro ao enviar mensagem');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="h-96 flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MessageCircle className="w-5 h-5" />
          Chat {isAdmin ? `com ${clientName}` : 'com o Advogado'}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-3 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  (isAdmin && message.sender_type === 'admin') || 
                  (!isAdmin && message.sender_type === 'client')
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
                    (isAdmin && message.sender_type === 'admin') || 
                    (!isAdmin && message.sender_type === 'client')
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.message_text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {formatTime(message.created_at)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Digite sua mensagem..."
              disabled={loading}
              className="flex-1"
            />
            <Button
              onClick={sendMessage}
              disabled={!newMessage.trim() || loading}
              size="sm"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatWindow;
