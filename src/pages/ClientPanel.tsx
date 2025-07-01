
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, MessageCircle, User, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import DocumentsList from "@/components/client/DocumentsList";
import ProcessDetails from "@/components/client/ProcessDetails";
import DocumentUpload from "@/components/client/DocumentUpload";
import ClientChat from "@/components/chat/ClientChat";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  process_number: string;
}

export default function ClientPanel() {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshDocuments, setRefreshDocuments] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const clientEmail = localStorage.getItem('clientEmail');
    const clientAuth = localStorage.getItem('clientAuth');

    if (!clientEmail || !clientAuth) {
      navigate('/login');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('email', clientEmail)
        .single();

      if (error) throw error;
      setClient(data);
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      toast({
        title: "Erro de Autenticação",
        description: "Sessão expirada. Faça login novamente.",
        variant: "destructive",
      });
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('clientEmail');
    localStorage.removeItem('clientAuth');
    navigate('/login');
  };

  const handleUploadSuccess = () => {
    setRefreshDocuments(prev => prev + 1);
    toast({
      title: "Sucesso",
      description: "Documentos enviados com sucesso!",
    });
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

  if (!client) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              Erro de Acesso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Não foi possível carregar os dados do cliente.</p>
            <Button onClick={() => navigate('/login')} className="w-full">
              Fazer Login
            </Button>
          </CardContent>
        </Card>
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
                <User className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Painel do Cliente</h1>
                  <p className="text-sm text-gray-500">Bem-vindo, {client.name}</p>
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
        <Tabs defaultValue="processo" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="processo" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Processo
            </TabsTrigger>
            <TabsTrigger value="documentos" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Documentos
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Chat
            </TabsTrigger>
          </TabsList>

          <TabsContent value="processo">
            <ProcessDetails processNumber={client.process_number} />
          </TabsContent>

          <TabsContent value="documentos">
            <DocumentsList clientId={client.id} key={refreshDocuments} />
          </TabsContent>

          <TabsContent value="upload">
            <DocumentUpload clientId={client.id} onUploadSuccess={handleUploadSuccess} />
          </TabsContent>

          <TabsContent value="chat">
            <ClientChat 
              clientId={client.id}
              clientEmail={client.email}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
