
-- Habilitar real-time para a tabela chat_messages
ALTER TABLE public.chat_messages REPLICA IDENTITY FULL;

-- Adicionar a tabela à publicação do real-time
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
