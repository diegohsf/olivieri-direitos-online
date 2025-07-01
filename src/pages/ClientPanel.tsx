
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogOut, RefreshCw, FileText, Calendar } from "lucide-react";

interface ProcessData {
  case_data?: any;
  movements?: any[];
  last_updated: string;
}

interface UpdateRequest {
  id: string;
  status: string;
  requested_at: string;
  completed_at?: string;
}

const ClientPanel = () => {
  const [client, setClient] = useState<any>(null);
  const [processData, setProcessData] = useState<ProcessData | null>(null);
  const [updateRequests, setUpdateRequests] = useState<UpdateRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar autenticação cliente
    const clientAuth = localStorage.getItem('clientAuth');
    if (!clientAuth) {
      navigate('/cliente-login');
      return;
    }

    const clientData = JSON.parse(clientAuth);
    setClient(clientData);
    fetchProcessData(clientData.process_number);
    fetchUpdateRequests(clientData.id);
  }, [navigate]);

  const fetchProcessData = async (processNumber: string) => {
    try {
      const { data, error } = await supabase
        .from('process_data')
        .select('*')
        .eq('process_number', processNumber)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setProcessData(data);
    } catch (error) {
      console.error('Erro ao carregar dados do processo:', error);
    }
  };

  const fetchUpdateRequests = async (clientId: string) => {
    try {
      const { data, error } = await supabase
        .from('process_update_requests')
        .select('*')
        .eq('client_id', clientId)
        .order('requested_at', { ascending: false });

      if (error) throw error;
      setUpdateRequests(data || []);
    } catch (error) {
      console.error('Erro ao carregar solicitações:', error);
    }
  };

  const requestUpdate = async () => {
    if (!client) return;
    
    setLoading(true);
    try {
      // Inserir solicitação no banco
      const { error: insertError } = await supabase
        .from('process_update_requests')
        .insert([{
          client_id: client.id,
          process_number: client.process_number,
          status: 'pending'
        }]);

      if (insertError) throw insertError;

      // Enviar para webhook do n8n
      const response = await fetch('https://webhook.n8n.io/webhook/process-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          process_number: client.process_number,
          client_id: client.id
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao solicitar atualização');
      }

      toast.success('Solicitação de atualização enviada!');
      fetchUpdateRequests(client.id);
    } catch (error) {
      toast.error('Erro ao solicitar atualização');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('clientAuth');
    navigate('/cliente-login');
  };

  if (!client) return <div>Carregando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#1a237e]">Área do Cliente</h1>
            <p className="text-gray-600">Bem-vindo, {client.name}</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={requestUpdate}
              className="bg-[#ffd700] text-[#1a237e] hover:bg-[#ffed4e]"
              disabled={loading}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {loading ? 'Solicitando...' : 'Atualizar Processo'}
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-[#1a237e] text-[#1a237e]"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Informações do Processo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Número do Processo</p>
                  <p className="font-semibold">{client.process_number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Última Atualização</p>
                  <p className="font-semibold">
                    {processData?.last_updated 
                      ? new Date(processData.last_updated).toLocaleString('pt-BR')
                      : 'Nenhuma atualização disponível'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {processData?.case_data && (
            <Card>
              <CardHeader>
                <CardTitle>Dados da Capa do Processo</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                  {JSON.stringify(processData.case_data, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}

          {processData?.movements && processData.movements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Movimentações do Processo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {processData.movements.map((movement: any, index: number) => (
                    <div key={index} className="border-l-4 border-[#1a237e] pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm text-gray-600">
                          {movement.date || 'Data não informada'}
                        </span>
                      </div>
                      <p className="text-sm">{movement.description || 'Descrição não disponível'}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Histórico de Solicitações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {updateRequests.map((request) => (
                  <div key={request.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">
                      {new Date(request.requested_at).toLocaleString('pt-BR')}
                    </span>
                    <Badge variant={
                      request.status === 'completed' ? 'default' :
                      request.status === 'failed' ? 'destructive' : 'secondary'
                    }>
                      {request.status === 'completed' ? 'Concluída' :
                       request.status === 'failed' ? 'Falhou' : 'Pendente'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientPanel;
