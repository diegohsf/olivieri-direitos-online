-- Criar bucket para arquivos dos clientes
INSERT INTO storage.buckets (id, name, public) VALUES ('client-documents', 'client-documents', false);

-- Criar tabela para gerenciar os documentos dos clientes
CREATE TABLE public.client_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  file_type TEXT NOT NULL,
  uploaded_by_admin BOOLEAN NOT NULL DEFAULT false,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS na tabela de documentos
ALTER TABLE public.client_documents ENABLE ROW LEVEL SECURITY;

-- Políticas para client_documents
-- Clientes podem ver apenas seus próprios documentos
CREATE POLICY "Clients can view own documents" 
ON public.client_documents 
FOR SELECT 
USING (client_id IN (
  SELECT id FROM public.clients WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
));

-- Clientes podem inserir documentos para si mesmos
CREATE POLICY "Clients can upload own documents" 
ON public.client_documents 
FOR INSERT 
WITH CHECK (client_id IN (
  SELECT id FROM public.clients WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
) AND uploaded_by_admin = false);

-- Admins podem ver todos os documentos
CREATE POLICY "Admins can view all documents" 
ON public.client_documents 
FOR ALL 
USING (true);

-- Políticas de storage para o bucket client-documents
-- Clientes podem visualizar seus próprios arquivos
CREATE POLICY "Clients can view own files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'client-documents' AND (storage.foldername(name))[1] IN (
  SELECT id::text FROM public.clients WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
));

-- Clientes podem fazer upload de arquivos para sua pasta
CREATE POLICY "Clients can upload own files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'client-documents' AND (storage.foldername(name))[1] IN (
  SELECT id::text FROM public.clients WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
));

-- Admins podem acessar todos os arquivos
CREATE POLICY "Admins can access all client files" 
ON storage.objects 
FOR ALL 
USING (bucket_id = 'client-documents');

-- Trigger para atualizar updated_at
CREATE TRIGGER update_client_documents_updated_at
BEFORE UPDATE ON public.client_documents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();