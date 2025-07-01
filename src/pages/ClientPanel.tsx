
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogOut, RefreshCw, Clock } from "lucide-react";

interface ProcessData {
  id: string;
  process_number: string;
  case_data: any;
  movements: any[];
  last_updated: string;
}

interface UpdateRequest {
  id: string;
  status: string;
  requested_at: string;
  completed_at: string | null;
}

const ClientPanel = () => {
  const [client, setClient] = useState<any>(null);
  const [processData, setProcessData] = useState<ProcessData | null>(null);
  const [updateRequests, setUpdateRequests] = useState<UpdateRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const clientAuth = localStorage.getItem('clientAuth');
    if (!clientAuth) {
      navigate('/cliente-login');
      return;
    }
    
    const clientData = JSON.parse(clientAuth);
    setClient(clientData);
    fetchProcessData(clientData.id);
    fetchUpdateRequests(clientData.id);
  }, [navigate]);

  const fetchProcessData = async (clientId: string) => {
    try {
      const { data, error } = await supabase
        .from('process_data')
        .select('*')
        .eq('client_id', clientId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching process data:', error);
        return;
      }

      if (data) {
        // Ensure movements is always an array
        const processData: ProcessData = {
          ...data,
          movements: Array.isArray(data.movements) ? data.movements : []
        };
        setProcessData(processData);
      }
    } catch (error) {
      console.error('Error fetching process data:', error);
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
      console.error('Error fetching update requests:', error);
    }
  };

  const requestProcessUpdate = async () => {
    if (!client) return;
    
    setLoading(true);
    try {
      // Create update request in database
      const { error: dbError } = await supabase
        .from('process_update_requests')
        .insert([{
          client_id: client.id,
          process_number: client.process_number,
          status: 'pending'
        }]);

      if (dbError) throw dbError;

      // Send request to n8n webhook
      const response = await fetch('https://webhook.n8n.io/your-webhook-url', {
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
        throw new Error('Failed to send request to n8n');
      }

      toast.success('Solicitação de atualização enviada com sucesso!');
      fetchUpdateRequests(client.id);
    } catch (error) {
      console.error('Error requesting update:', error);
      toast.error('Erro ao solicitar atualização do processo');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('clientAuth');
    navigate('/cliente-login');
  };

  if (!client) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#1a237e]">Área do Cliente</h1>
            <p className="text-gray-600">Bem-vindo, {client.name}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-[#1a237e] text-[#1a237e]"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Process Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Informações do Processo
                <Button
                  onClick={requestProcessUpdate}
                  disabled={loading}
                  size="sm"
                  className="bg-[#ffd700] text-[#1a237e] hover:bg-[#ffed4e]"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  {loading ? 'Atualizando...' : 'Atualizar'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold text-gray-700">Número do Processo:</p>
                <p className="text-lg">{client.process_number}</p>
              </div>
              
              {processData?.case_data && (
                <div>
                  <p className="font-semibold text-gray-700">Dados do Processo:</p>
                  <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                    {JSON.stringify(processData.case_data, null, 2)}
                  </pre>
                </div>
              )}
              
              {processData && (
                <div>
                  <p className="font-semibold text-gray-700">Última Atualização:</p>
                  <p>{new Date(processData.last_updated).toLocaleString('pt-BR')}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Process Movements */}
          <Card>
            <CardHeader>
              <CardTitle>Movimentações do Processo</CardTitle>
            </CardHeader>
            <CardContent>
              {processData?.movements && processData.movements.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {processData.movements.map((movement: any, index: number) => (
                    <div key={index} className="border-l-4 border-[#ffd700] pl-4 py-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{movement.date || 'Data não informada'}</span>
                      </div>
                      <p className="font-medium">{movement.title || 'Movimento'}</p>
                      <p className="text-gray-600 text-sm">{movement.description || 'Descrição não disponível'}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Nenhuma movimentação encontrada</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Update Requests History */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Histórico de Solicitações</CardTitle>
          </CardHeader>
          <CardContent>
            {updateRequests.length > 0 ? (
              <div className="space-y-2">
                {updateRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">Solicitação de Atualização</p>
                      <p className="text-sm text-gray-500">
                        {new Date(request.requested_at).toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      request.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : request.status === 'failed'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.status === 'completed' ? 'Concluída' : 
                       request.status === 'failed' ? 'Falhou' : 'Pendente'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Nenhuma solicitação encontrada</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientPanel;
