
-- Adicionar uma tabela de relacionamento entre clientes e processos
CREATE TABLE public.client_processes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  process_number TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(client_id, process_number)
);

-- Migrar dados existentes da tabela clients para client_processes
INSERT INTO public.client_processes (client_id, process_number, created_at, updated_at)
SELECT id, process_number, created_at, updated_at
FROM public.clients
WHERE process_number IS NOT NULL AND process_number != '';

-- Remover a coluna process_number da tabela clients (será feito após confirmar a migração)
-- ALTER TABLE public.clients DROP COLUMN process_number;

-- Adicionar índices para melhor performance
CREATE INDEX idx_client_processes_client_id ON public.client_processes(client_id);
CREATE INDEX idx_client_processes_process_number ON public.client_processes(process_number);
