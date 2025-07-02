
-- Remover políticas existentes que podem estar causando conflito
DROP POLICY IF EXISTS "Clients can send messages in own conversations" ON chat_messages;
DROP POLICY IF EXISTS "Clients can send messages" ON chat_messages;

-- Criar nova política mais simples para clientes enviarem mensagens
CREATE POLICY "Clients can send messages to own conversations" 
  ON chat_messages 
  FOR INSERT 
  WITH CHECK (
    sender_type = 'client' AND 
    sender_id::text IN (
      SELECT c.id::text 
      FROM clients c 
      WHERE c.id::text = sender_id::text
    )
  );

-- Garantir que admins possam enviar mensagens (política já existe mas vamos recriar para ter certeza)
DROP POLICY IF EXISTS "Admins can send messages" ON chat_messages;
CREATE POLICY "Admins can send messages" 
  ON chat_messages 
  FOR INSERT 
  WITH CHECK (sender_type = 'admin');
