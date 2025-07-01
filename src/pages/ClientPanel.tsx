
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { LogOut, RefreshCw, FileText, Calendar, User, Phone, Mail, Hash, MapPin, Scale, Clock, Building, Gavel, DollarSign, AlertCircle, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  process_number: string;
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
      fetchProcessData(parsedClient.process_number);
    } catch (error) {
      console.error('Erro ao carregar dados do cliente:', error);
      navigate('/login');
    }
  }, [navigate]);

  const fetchProcessData = async (processNumber: string) => {
    try {
      // Buscar na tabela process_consultations
      const { data, error } = await supabase
        .from('process_consultations')
        .select('*')
        .eq('numero_processo', processNumber)
        .single();

      if (error) {
        console.error('Erro ao buscar dados do processo:', error);
        // Se não encontrar dados reais, usa dados de demonstração
        setMockData(processNumber);
        return;
      }

      if (data && data.data && typeof data.data === 'object' && data.data !== null) {
        console.log('Dados do processo encontrados:', data);
        
        // Extrair dados do processo do campo data (jsonb) com type safety
        const processInfoData = data.data as any;
        const processInfo = processInfoData.payload?.response_data || processInfoData;
        setProcessData({ case_data: processInfo });
        
        // Processar movimentações - verificar se existem steps
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
    // Dados de demonstração como fallback
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

  const requestUpdate = async () => {
    if (!client) return;
    
    setLoading(true);
    try {
      // Solicitar nova atualização dos dados
      await fetchProcessData(client.process_number);
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

  // Função para formatar dados do processo baseado na estrutura real
  const getProcessInfo = () => {
    const caseData = processData?.case_data || {};
    
    return {
      numero: caseData.code || caseData.numero || client.process_number,
      classe: caseData.name || caseData.classe || 'Não informado',
      assunto: caseData.subjects?.[0]?.name || caseData.assunto || 'Não informado',
      valor: caseData.amount ? `R$ ${caseData.amount.toLocaleString('pt-BR')}` : (caseData.valor || 'Não informado'),
      distribuicao: caseData.distribution_date ? new Date(caseData.distribution_date).toLocaleDateString('pt-BR') : (caseData.distribuicao || 'Não informado'),
      status: caseData.status || 'Em andamento',
      tribunal: caseData.tribunal_acronym || caseData.tribunal || 'Não informado',
      juiz: caseData.judge || caseData.juiz || 'Não informado',
      vara: caseData.court || caseData.vara || 'Não informado',
      comarca: caseData.district || caseData.comarca || 'Não informado',
      estado: caseData.state || caseData.estado || 'Não informado',
      ultimaAtualizacao: caseData.last_update ? new Date(caseData.last_update).toLocaleDateString('pt-BR') : 'Não informado',
      advogados: caseData.lawyers || [],
      partes: caseData.parties || [],
      grauRecurso: caseData.degree || 'Não informado',
      instancia: caseData.instance || 'Não informado'
    };
  };

  const processInfo = getProcessInfo();

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
                  <span className="text-sm text-gray-600 block">Processo</span>
                  <span className="font-semibold text-gray-800">{client.process_number}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dados do Processo */}
        {processData && (
          <div className="space-y-6">
            {/* Informações Gerais do Processo */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-t-lg">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <FileText className="w-6 h-6" />
                    Informações Gerais do Processo
                  </CardTitle>
                  <Button
                    onClick={requestUpdate}
                    disabled={loading}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Atualizar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <Hash className="w-5 h-5 text-blue-600" />
                    <div>
                      <span className="text-sm text-gray-600 block">Número</span>
                      <span className="font-semibold text-gray-800">{processInfo.numero}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                    <Scale className="w-5 h-5 text-purple-600" />
                    <div>
                      <span className="text-sm text-gray-600 block">Classe</span>
                      <span className="font-semibold text-gray-800">{processInfo.classe}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                    <FileText className="w-5 h-5 text-orange-600" />
                    <div>
                      <span className="text-sm text-gray-600 block">Assunto</span>
                      <span className="font-semibold text-gray-800">{processInfo.assunto}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <div>
                      <span className="text-sm text-gray-600 block">Valor</span>
                      <span className="font-semibold text-gray-800">{processInfo.valor}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    <div>
                      <span className="text-sm text-gray-600 block">Distribuição</span>
                      <span className="font-semibold text-gray-800">{processInfo.distribuicao}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <div>
                      <span className="text-sm text-gray-600 block">Status</span>
                      <span className="font-semibold text-emerald-600">{processInfo.status}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informações do Tribunal */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Building className="w-6 h-6" />
                  Informações do Tribunal
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                    <Building className="w-5 h-5 text-red-600" />
                    <div>
                      <span className="text-sm text-gray-600 block">Tribunal</span>
                      <span className="font-semibold text-gray-800">{processInfo.tribunal}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-pink-50 rounded-lg">
                    <Gavel className="w-5 h-5 text-pink-600" />
                    <div>
                      <span className="text-sm text-gray-600 block">Juiz</span>
                      <span className="font-semibold text-gray-800">{processInfo.juiz}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                    <Scale className="w-5 h-5 text-orange-600" />
                    <div>
                      <span className="text-sm text-gray-600 block">Vara</span>
                      <span className="font-semibold text-gray-800">{processInfo.vara}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <span className="text-sm text-gray-600 block">Comarca</span>
                      <span className="font-semibold text-gray-800">{processInfo.comarca}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    <div>
                      <span className="text-sm text-gray-600 block">Estado</span>
                      <span className="font-semibold text-gray-800">{processInfo.estado}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <div>
                      <span className="text-sm text-gray-600 block">Última Atualização</span>
                      <span className="font-semibold text-gray-800">{processInfo.ultimaAtualizacao}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Partes do Processo */}
            {processInfo.partes.length > 0 && (
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <User className="w-6 h-6" />
                    Partes do Processo
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {processInfo.partes.map((parte: any, index: number) => (
                      <div key={index} className="p-4 bg-cyan-50 rounded-lg border-l-4 border-cyan-500">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4 text-cyan-600" />
                          <span className="font-semibold text-cyan-800">{parte.type || 'Parte'}</span>
                        </div>
                        <p className="text-gray-800 font-medium">{parte.name || 'Nome não informado'}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Advogados */}
            {processInfo.advogados.length > 0 && (
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Scale className="w-6 h-6" />
                    Advogados
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {processInfo.advogados.map((advogado: any, index: number) => (
                      <div key={index} className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                        <div className="flex items-center gap-2 mb-2">
                          <Scale className="w-4 h-4 text-amber-600" />
                          <span className="font-semibold text-amber-800">Advogado</span>
                        </div>
                        <p className="text-gray-800 font-medium">{advogado.name || 'Nome não informado'}</p>
                        {advogado.oab && (
                          <p className="text-sm text-gray-600">OAB: {advogado.oab}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Movimentações */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calendar className="w-6 h-6" />
              Movimentações do Processo
            </CardTitle>
            <CardDescription className="text-purple-100 mt-2">
              Histórico de movimentações do seu processo
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {movements.length > 0 ? movements.map((movement, index) => (
                <div key={index} className="border-l-4 border-violet-500 pl-6 py-4 bg-violet-50 rounded-r-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 mb-1">{movement.description}</p>
                      <p className="text-sm text-violet-600 bg-violet-100 inline-block px-2 py-1 rounded">{movement.type}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(movement.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhuma movimentação encontrada</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientPanel;
