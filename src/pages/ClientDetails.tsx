
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, User, Mail, Phone, Hash, MessageCircle } from "lucide-react";
import AdminChat from "@/components/chat/AdminChat";
import DocumentsList from "@/components/client/DocumentsList";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface ClientProcess {
  id: string;
  process_number: string;
  created_at: string;
}

const ClientDetails = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);
  const [clientProcesses, setClientProcesses] = useState<ClientProcess[]>([]);
  const [activeTab, setActiveTab] = useState<'info' | 'chat' | 'documents'>('info');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      navigate('/login');
      return;
    }

    if (clientId) {
      fetchClientDetails();
    }
  }, [clientId, navigate]);

  const fetchClientDetails = async () => {
    if (!clientId) return;

    try {
      // Buscar dados do cliente
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .select('*')
        .eq('id', clientId)
        .single();

      if (clientError) throw clientError;

      setClient(clientData);

      // Buscar processos do cliente
      const { data: processesData, error: processesError } = await supabase
        .from('client_processes')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: false });

      if (processesError) throw processesError;

      setClientProcesses(processesData || []);
    } catch (error) {
      console.error('Erro ao carregar detalhes do cliente:', error);
      toast.error('Erro ao carregar dados do cliente');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Carregando...</div>;
  }

  if (!client) {
    return <div className="p-6">Cliente não encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate('/admin')}
            variant="outline"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Detalhes do Cliente
            </h1>
            <p className="text-gray-600">{client.name}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('info')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'info'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <User className="w-4 h-4 inline mr-2" />
                Informações
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'chat'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <MessageCircle className="w-4 h-4 inline mr-2" />
                Chat
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'documents'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Documentos
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'info' && (
          <div className="space-y-6">
            {/* Informações do Cliente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Informações Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 text-primary" />
                    <div>
                      <span className="text-sm text-gray-600 block">Nome</span>
                      <span className="font-semibold text-gray-800">{client.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-accent" />
                    <div>
                      <span className="text-sm text-gray-600 block">Email</span>
                      <span className="font-semibold text-gray-800">{client.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <span className="text-sm text-gray-600 block">Telefone</span>
                      <span className="font-semibold text-gray-800">{client.phone}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Hash className="w-5 h-5 text-accent" />
                    <div>
                      <span className="text-sm text-gray-600 block">Total de Processos</span>
                      <span className="font-semibold text-gray-800">{clientProcesses.length}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Processos do Cliente */}
            <Card>
              <CardHeader>
                <CardTitle>Processos</CardTitle>
              </CardHeader>
              <CardContent>
                {clientProcesses.length > 0 ? (
                  <div className="space-y-2">
                    {clientProcesses.map((process) => (
                      <div
                        key={process.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="font-medium">{process.process_number}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(process.created_at).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Nenhum processo cadastrado</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="max-w-4xl">
            <AdminChat
              clientId={client.id}
              clientName={client.name}
              adminId="admin-user-id"
            />
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="max-w-4xl">
            <DocumentsList 
              clientId={client.id} 
              refreshTrigger={0} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDetails;
