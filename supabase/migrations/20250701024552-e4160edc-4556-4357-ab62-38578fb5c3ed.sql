
-- Criar tabela para clientes
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  process_number TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para dados dos processos
CREATE TABLE public.process_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  process_number TEXT NOT NULL UNIQUE,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  case_data JSONB,
  movements JSONB,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para logs de solicitações de atualização
CREATE TABLE public.process_update_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  process_number TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, completed, failed
  requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Habilitar RLS nas tabelas
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.process_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.process_update_requests ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para clients (apenas administrador pode ver todos)
CREATE POLICY "Admin can view all clients" ON public.clients
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Clients can view own data" ON public.clients
  FOR SELECT USING (email = auth.jwt() ->> 'email');

-- Políticas RLS para process_data
CREATE POLICY "Admin can view all process data" ON public.process_data
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Clients can view own process data" ON public.process_data
  FOR SELECT USING (
    client_id IN (
      SELECT id FROM public.clients 
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- Políticas RLS para process_update_requests
CREATE POLICY "Admin can view all update requests" ON public.process_update_requests
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Clients can view own update requests" ON public.process_update_requests
  FOR SELECT USING (
    client_id IN (
      SELECT id FROM public.clients 
      WHERE email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Clients can create own update requests" ON public.process_update_requests
  FOR INSERT WITH CHECK (
    client_id IN (
      SELECT id FROM public.clients 
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_process_data_updated_at BEFORE UPDATE ON public.process_data
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
