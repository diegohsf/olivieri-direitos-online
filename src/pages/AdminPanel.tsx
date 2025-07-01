import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogOut, Plus, Trash2, Users, Eye, UserPlus, Search, Edit } from "lucide-react";

interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  process_number: string;
  created_at: string;
  password_hash: string;
}

const AdminPanel = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    process_number: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar autenticação admin
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      navigate('/login');
      return;
    }
    
    fetchClients();
  }, [navigate]);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      toast.error('Erro ao carregar clientes');
    }
  };

  const generateRandomPassword = () => {
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  };

  const sendToZapelegante = async (clientData: any) => {
    try {
      // Enviando dados no formato correto para o n8n
      const response = await fetch('https://webhook.zapelegante.com.br/webhook/e87de2ba-baa4-4421-a8eb-821e537f9da2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          processNumber: clientData.process_number,
          clientId: clientData.id,
          clientName: clientData.name,
          clientPhone: clientData.phone,
          clientEmail: clientData.email,
          clientPassword: clientData.password_hash,
          requestDate: new Date().toISOString(),
          webhookUrl: "https://webhook.zapelegante.com.br/webhook/280c16d7-4a8e-43a1-ba0c-80bb831b47ac",
          executionMode: "production"
        }),
      });

      console.log('Dados enviados para Zapelegante:', {
        processNumber: clientData.process_number,
        clientId: clientData.id,
        clientName: clientData.name,
        clientPhone: clientData.phone,
        clientEmail: clientData.email,
        clientPassword: clientData.password_hash,
        requestDate: new Date().toISOString(),
        webhookUrl: "https://webhook.zapelegante.com.br/webhook/280c16d7-4a8e-43a1-ba0c-80bb831b47ac",
        executionMode: "production"
      });
    } catch (error) {
      console.error('Erro ao enviar para Zapelegante:', error);
    }
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Gerar senha automaticamente
      const generatedPassword = generateRandomPassword();
      
      const { data, error } = await supabase
        .from('clients')
        .insert([{
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          password_hash: generatedPassword, // Usando a senha gerada
          process_number: formData.process_number
        }])
        .select()
        .single();

      if (error) throw error;

      // Enviar dados para o webhook do Zapelegante
      await sendToZapelegante({
        ...data,
        password_hash: generatedPassword // Garantir que a senha gerada seja enviada
      });

      toast.success(`Cliente adicionado com sucesso! Senha gerada: ${generatedPassword}`);
      setFormData({ name: '', phone: '', email: '', process_number: '' });
      setShowAddForm(false);
      fetchClients();
    } catch (error) {
      console.error('Erro detalhado:', error);
      toast.error('Erro ao adicionar cliente');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return;

    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Cliente excluído com sucesso!');
      fetchClients();
    } catch (error) {
      toast.error('Erro ao excluir cliente');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/login');
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.process_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalClients = clients.length;
  const newThisMonth = clients.filter(client => {
    const created = new Date(client.created_at);
    const now = new Date();
    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Painel Administrativo</h1>
            <p className="text-gray-600">Bem-vindo, Dr. Luis Augusto Olivieri</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total de Clientes</p>
                  <p className="text-2xl font-bold text-gray-800">{clients.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Acessos Hoje</p>
                  <p className="text-2xl font-bold text-gray-800">0</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <UserPlus className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Novos Este Mês</p>
                  <p className="text-2xl font-bold text-gray-800">{clients.filter(client => {
                    const created = new Date(client.created_at);
                    const now = new Date();
                    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
                  }).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Add Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-96">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-[#1a237e] text-white hover:bg-[#283593]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Cliente
          </Button>
        </div>

        {/* Add Client Form */}
        {showAddForm && (
          <Card className="mb-6 bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Adicionar Novo Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddClient} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  placeholder="Telefone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <Input
                  placeholder="Número do Processo CNJ"
                  value={formData.process_number}
                  onChange={(e) => setFormData({ ...formData, process_number: e.target.value })}
                  required
                  className="md:col-span-2"
                />
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600 mb-2">
                    ℹ️ A senha será gerada automaticamente e exibida após o cadastro
                  </p>
                </div>
                <div className="md:col-span-2 flex gap-2">
                  <Button
                    type="submit"
                    className="bg-[#1a237e] text-white hover:bg-[#283593]"
                    disabled={loading}
                  >
                    {loading ? 'Salvando...' : 'Salvar Cliente'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Clients Table */}
        <Card className="bg-white">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">CLIENTE</TableHead>
                  <TableHead className="font-semibold">CONTATO</TableHead>
                  <TableHead className="font-semibold">PROCESSO</TableHead>
                  <TableHead className="font-semibold">SENHA</TableHead>
                  <TableHead className="font-semibold">ÚLTIMO ACESSO</TableHead>
                  <TableHead className="font-semibold">AÇÕES</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.filter(client =>
                  client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  client.process_number.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((client) => (
                  <TableRow key={client.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{client.name}</p>
                        <p className="text-sm text-gray-500">ID: {client.id.slice(0, 8)}...</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{client.email}</p>
                        <p className="text-sm text-gray-500">{client.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {client.process_number}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{client.password_hash}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-500">Nunca</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteClient(client.id)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;
