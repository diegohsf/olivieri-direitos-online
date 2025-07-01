
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, FileText, Settings, Plus, MessageCircle, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import AddProcessForm from "@/components/admin/AddProcessForm";
import ClientProcessesList from "@/components/admin/ClientProcessesList";
import AdminChat from "@/components/chat/AdminChat";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  process_number: string;
  created_at: string;
}

export default function AdminPanel() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchClients();
  }, []);

  const checkAuth = () => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      navigate('/login');
      return;
    }
  };

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os clientes.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/login');
  };

  const handleClientAdded = () => {
    setShowAddForm(false);
    fetchClients();
    toast({
      title: "Sucesso",
      description: "Cliente adicionado com sucesso!",
    });
  };

  const handleViewDocuments = (clientId: string) => {
    navigate(`/cliente/${clientId}/documentos`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Settings className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Painel Administrativo</h1>
                  <p className="text-sm text-gray-500">Gestão de clientes e processos</p>
                </div>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="clientes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="clientes" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Clientes
            </TabsTrigger>
            <TabsTrigger value="processos" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Processos
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Chat
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clientes">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Clientes Cadastrados</h2>
                <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Adicionar Cliente
                </Button>
              </div>

              {showAddForm && (
                <Card>
                  <CardHeader>
                    <CardTitle>Adicionar Novo Cliente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AddProcessForm 
                      onSuccess={handleClientAdded}
                      onCancel={() => setShowAddForm(false)}
                    />
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-6">
                {clients.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-8">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Nenhum cliente cadastrado ainda.</p>
                    </CardContent>
                  </Card>
                ) : (
                  clients.map((client) => (
                    <Card key={client.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p><strong>Email:</strong> {client.email}</p>
                              <p><strong>Telefone:</strong> {client.phone}</p>
                              <p><strong>Processo:</strong> {client.process_number}</p>
                              <p><strong>Cadastrado em:</strong> {new Date(client.created_at).toLocaleDateString('pt-BR')}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewDocuments(client.id)}
                              className="flex items-center gap-2"
                            >
                              <ExternalLink className="h-4 w-4" />
                              Ver Documentos
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="processos">
            <ClientProcessesList />
          </TabsContent>

          <TabsContent value="chat">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Chat com Clientes</h2>
                <p className="text-gray-600">Gerencie as conversas com seus clientes.</p>
              </div>
              <AdminChat />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
