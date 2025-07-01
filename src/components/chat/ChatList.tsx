
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Conversation {
  id: string;
  client_id: string;
  last_message_at: string;
  clients: {
    name: string;
    email: string;
  };
}

interface ChatListProps {
  onSelectConversation: (conversationId: string, clientName: string) => void;
  selectedConversationId?: string;
}

export default function ChatList({ onSelectConversation, selectedConversationId }: ChatListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          id,
          client_id,
          last_message_at,
          clients (
            name,
            email
          )
        `)
        .order('last_message_at', { ascending: false });

      if (error) throw error;
      setConversations(data || []);
    } catch (error) {
      console.error('Erro ao buscar conversas:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as conversas.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatLastMessage = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else {
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit'
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Conversas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">Carregando conversas...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Conversas ({conversations.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {conversations.length === 0 ? (
          <p className="text-sm text-gray-500">Nenhuma conversa encontrada.</p>
        ) : (
          conversations.map((conversation) => (
            <Button
              key={conversation.id}
              variant={selectedConversationId === conversation.id ? "default" : "outline"}
              className="w-full justify-start h-auto p-3"
              onClick={() => onSelectConversation(conversation.id, conversation.clients.name)}
            >
              <div className="flex flex-col items-start w-full">
                <div className="flex justify-between w-full items-center">
                  <span className="font-medium">{conversation.clients.name}</span>
                  <span className="text-xs text-gray-500">
                    {formatLastMessage(conversation.last_message_at)}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{conversation.clients.email}</span>
              </div>
            </Button>
          ))
        )}
      </CardContent>
    </Card>
  );
}
