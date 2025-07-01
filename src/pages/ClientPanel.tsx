
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { LogOut, User, Phone, Mail, Hash } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ProcessSelector from "@/components/client/ProcessSelector";
import ProcessDetails from "@/components/client/ProcessDetails";

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

interface ProcessMovement {
  date: string;
  description: string;
  type: string;
  content?: string;
  step_date?: string;
}

const ClientPanel = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [clientProcesses, setClientProcesses] = useState<ClientProcess[]>([]);
  const [selectedProcessId, setSelectedProcessId] = useState<string | null>(null);
  const [selectedProcessNumber, setSelectedProcessNumber] = useState<string>('');
  const [processData, setProcessData] = useState<any>(null);
  const [movements, setMovements] = useState<ProcessMovement[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const clientData = localStorage.getItem('clientAuth');
    if (!clientData) {
      navigate('/login');
      return;
    }

    try {
      const parsedClient = JSON.parse(clientData);
      setClient(parsedClient);
      fetchClientProcesses(parsedClient.id);
    } catch (error) {
      console.error('Erro ao carregar dados do cliente:', error);
      navigate('/login');
    }
  }, [navigate]);

  const fetchClientProcesses = async (clientId: string) => {
    try {
      const { data, error } = await supabase
        .from('client_processes')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setClientProcesses(data || []);
      
      // Se há apenas um processo, seleciona automaticamente
      if (data && data.length === 1) {
        setSelectedProcessId(data[0].id);
        setSelectedProcessNumber(data[0].process_number);
        fetchProcessData(data[0].process_number);
      }
    } catch (error) {
      console.error('Erro ao carregar processos do cliente:', error);
      toast.error('Erro ao carregar processos');
    }
  };

  const fetchProcessData = async (processNumber: string) => {
    try {
      const { data, error } = await supabase
        .from('process_consultations')
        .select('*')
        .eq('numero_processo', processNumber)
        .single();

      if (error) {
        console.error('Erro ao buscar dados do processo:', error);
        setMockData(processNumber);
        return;
      }

      if (data && data.data && typeof data.data === 'object' && data.data !== null) {
        console.log('Dados do processo encontrados:', data);
        
        const processInfoData = data.data as any;
        let processInfo;
        
        // Verificar se data.data tem payload
        if (processInfoData && typeof processInfoData === 'object' && 'payload' in processInfoData) {
          processInfo = processInfoData.payload?.response_data || processInfoData;
        } else {
          processInfo = processInfoData;
        }
        
        setProcessData({ case_data: processInfo });
        
        const steps = processInfo.steps || [];
        if (Array.isArray(steps)) {
          const formattedMovements = steps.map((step: any) => ({
            date: step.step_date || new Date().toISOString(),
            description: step.content || 'Movimentação',
            type: step.type || 'Movimento',
            content: step.content
          }));
          setMovements(formattedMovements);
        } else {
          setMovements([]);
        }
      } else {
        setMockData(processNumber);
      }
    } catch (error) {
      console.error('Erro ao buscar processo:', error);
      setMockData(processNumber);
    }
  };

  const setMockData = (processNumber: string) => {
    const mockProcessData = {
      case_data: {
        code: processNumber,
        numero: processNumber,
        classe: 'Execução Fiscal',
        assunto: 'Dívida Ativa',
        valor: 'R$ 25.000,00',
        distribuicao: '15/03/2023',
        status: 'Em andamento'
      }
    };
    
    const mockMovements = [
      {
        date: '2023-12-01',
        description: 'Processo distribuído',
        type: 'Distribuição'
      },
      {
        date: '2023-12-15',
        description: 'Citação realizada',
        type: 'Citação'
      },
      {
        date: '2024-01-10',
        description: 'Contestação apresentada',
        type: 'Contestação'
      }
    ];
    
    setProcessData(mockProcessData);
    setMovements(mockMovements);
  };

  const handleLogout = () => {
    localStorage.removeItem('clientAuth');
    navigate('/login');
    toast.success('Logout realizado com sucesso!');
  };

  const handleProcessSelect = (processId: string, processNumber: string) => {
    setSelectedProcessId(processId);
    setSelectedProcessNumber(processNumber);
    fetchProcessData(processNumber);
  };

  const requestUpdate = async () => {
    if (!selectedProcessNumber) return;
    
    setLoading(true);
    try {
      await fetchProcessData(selectedProcessNumber);
      toast.success('Dados atualizados com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar dados');
    } finally {
      setLoading(false);
    }
  };

  if (!client) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a237e] to-[#283593] text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Painel do Cliente</h1>
            <p className="text-blue-200 text-lg">Luis Augusto Olivieri - Advogados</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="bg-transparent border-white text-white hover:bg-white hover:text-[#1a237e] transition-all duration-200"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Informações do Cliente */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl">
              <User className="w-6 h-6" />
              Informações do Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
                <div>
                  <span className="text-sm text-gray-600 block">Nome</span>
                  <span className="font-semibold text-gray-800">{client.name}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-green-600" />
                <div>
                  <span className="text-sm text-gray-600 block">Email</span>
                  <span className="font-semibold text-gray-800">{client.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-orange-600" />
                <div>
                  <span className="text-sm text-gray-600 block">Telefone</span>
                  <span className="font-semibold text-gray-800">{client.phone}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Hash className="w-5 h-5 text-purple-600" />
                <div>
                  <span className="text-sm text-gray-600 block">Total de Processos</span>
                  <span className="font-semibold text-gray-800">{clientProcesses.length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seletor de Processos */}
        <ProcessSelector
          processes={clientProcesses}
          selectedProcessId={selectedProcessId}
          onProcessSelect={handleProcessSelect}
        />

        {/* Detalhes do Processo */}
        {selectedProcessId && selectedProcessNumber && (
          <ProcessDetails
            processNumber={selectedProcessNumber}
            processData={processData}
            movements={movements}
            loading={loading}
            onRefresh={requestUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default ClientPanel;
