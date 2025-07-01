
-- Remover políticas existentes se existirem
DROP POLICY IF EXISTS "Admin can view all clients" ON public.clients;
DROP POLICY IF EXISTS "Clients can view own data" ON public.clients;

-- Criar novas políticas que permitam operações sem autenticação para admins
-- Permitir SELECT para todos (sem autenticação)
CREATE POLICY "Allow public select on clients" ON public.clients
  FOR SELECT USING (true);

-- Permitir INSERT para todos (sem autenticação) 
CREATE POLICY "Allow public insert on clients" ON public.clients
  FOR INSERT WITH CHECK (true);

-- Permitir UPDATE para todos (sem autenticação)
CREATE POLICY "Allow public update on clients" ON public.clients
  FOR UPDATE USING (true);

-- Permitir DELETE para todos (sem autenticação)
CREATE POLICY "Allow public delete on clients" ON public.clients
  FOR DELETE USING (true);
