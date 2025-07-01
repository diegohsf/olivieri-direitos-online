
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ChatWindow from './ChatWindow';

interface ClientChatProps {
  clientId: string;
  clientEmail: string;
}

export default function ClientChat({ clientId, clientEmail }: ClientChatProps) {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    findOrCreateConversation();
  }, [clientId]);

  const findOrCreateConversation = async () => {
    try {
      // Primeiro, tenta encontrar uma conversa existente
      let { data: existingConversation, error: searchError } = await supabase
        .from('conversations')
        .select('id')
        .eq('client_id', clientId)
        .single();

      if (searchError && searchError.code !== 'PGRST116') {
        throw searchError;
      }

      if (existingConversation) {
        setConversationId(existingConversation.id);
      } else {
        // Se não encontrar, cria uma nova conversa
        const { data: newConversation, error: createError } = await supabase
          .from('conversations')
          .insert({
            client_id: clientId
          })
          .select('id')
          .single();

        if (createError) throw createError;
        setConversationId(newConversation.id);
      }
    } catch (error) {
      console.error('Erro ao buscar/criar conversa:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar o chat.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Chat com Advogado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">Carregando chat...</p>
        </CardContent>
      </Card>
    );
  }

  if (!conversationId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Chat com Advogado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">Erro ao carregar o chat.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <ChatWindow
        conversationId={conversationId}
        currentUserId={clientId}
        userType="client"
      />
    </div>
  );
}
