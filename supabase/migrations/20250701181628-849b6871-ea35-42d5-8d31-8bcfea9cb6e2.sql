
-- Criar tabela para conversas/chats
CREATE TABLE public.conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela para mensagens do chat
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('client', 'admin')),
  sender_id UUID NOT NULL,
  message_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  read_at TIMESTAMP WITH TIME ZONE NULL
);

-- Habilitar RLS nas tabelas
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para conversations
CREATE POLICY "Clients can view own conversations" 
  ON public.conversations 
  FOR SELECT 
  USING (client_id IN (
    SELECT clients.id 
    FROM clients 
    WHERE clients.email = ((current_setting('request.jwt.claims'::text, true))::json ->> 'email'::text)
  ));

CREATE POLICY "Clients can create own conversations" 
  ON public.conversations 
  FOR INSERT 
  WITH CHECK (client_id IN (
    SELECT clients.id 
    FROM clients 
    WHERE clients.email = ((current_setting('request.jwt.claims'::text, true))::json ->> 'email'::text)
  ));

CREATE POLICY "Admins can view all conversations" 
  ON public.conversations 
  FOR ALL 
  USING (true);

-- Políticas RLS para chat_messages
CREATE POLICY "Clients can view own conversation messages" 
  ON public.chat_messages 
  FOR SELECT 
  USING (conversation_id IN (
    SELECT conversations.id 
    FROM conversations 
    WHERE conversations.client_id IN (
      SELECT clients.id 
      FROM clients 
      WHERE clients.email = ((current_setting('request.jwt.claims'::text, true))::json ->> 'email'::text)
    )
  ));

CREATE POLICY "Clients can send messages in own conversations" 
  ON public.chat_messages 
  FOR INSERT 
  WITH CHECK (
    conversation_id IN (
      SELECT conversations.id 
      FROM conversations 
      WHERE conversations.client_id IN (
        SELECT clients.id 
        FROM clients 
        WHERE clients.email = ((current_setting('request.jwt.claims'::text, true))::json ->> 'email'::text)
      )
    ) AND sender_type = 'client'
  );

CREATE POLICY "Admins can view all messages" 
  ON public.chat_messages 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admins can send messages" 
  ON public.chat_messages 
  FOR INSERT 
  WITH CHECK (sender_type = 'admin');

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_conversations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at
CREATE TRIGGER update_conversations_updated_at
    BEFORE UPDATE ON public.conversations
    FOR EACH ROW
    EXECUTE FUNCTION update_conversations_updated_at();

-- Função para atualizar last_message_at quando uma nova mensagem é criada
CREATE OR REPLACE FUNCTION update_conversation_last_message()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.conversations 
    SET last_message_at = NEW.created_at 
    WHERE id = NEW.conversation_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar last_message_at
CREATE TRIGGER update_conversation_last_message
    AFTER INSERT ON public.chat_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_conversation_last_message();
