
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { LogOut, RefreshCw, FileText, Calendar, User, Phone, Mail, Hash } from "lucide-react";

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
      navigate('/cliente-login');
      return;
    }

    try {
      const parsedClient = JSON.parse(clientData);
      setClient(parsedClient);
      
      // Dados de demonstração para o processo
      const mockProcessData = {
        case_data: {
          numero: parsedClient.process_number,
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
    } catch (error) {
      console.error('Erro ao carregar dados do cliente:', error);
      navigate('/cliente-login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('clientAuth');
    navigate('/cliente-login');
    toast.success('Logout realizado com sucesso!');
  };

  const requestUpdate = async () => {
    if (!client) return;
    
    setLoading(true);
    try {
      // Simular solicitação de atualização
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Solicitação de atualização enviada com sucesso!');
    } catch (error) {
      toast.error('Erro ao solicitar atualização');
    } finally {
      setLoading(false);
    }
  };

  if (!client) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1a237e] text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Painel do Cliente</h1>
            <p className="text-blue-200">Luis Augusto Olivieri - Advogados</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="bg-transparent border-white text-white hover:bg-white hover:text-[#1a237e]"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Informações do Cliente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Informações do Cliente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Nome:</span>
                <span className="font-medium">{client.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Email:</span>
                <span className="font-medium">{client.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Telefone:</span>
                <span className="font-medium">{client.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Processo:</span>
                <span className="font-medium">{client.process_number}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dados do Processo */}
        {processData && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Dados do Processo
                </CardTitle>
                <Button
                  onClick={requestUpdate}
                  disabled={loading}
                  className="bg-[#1a237e] hover:bg-[#283593]"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Solicitar Atualização
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Número:</span>
                  <p className="font-medium">{processData.case_data.numero}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Classe:</span>
                  <p className="font-medium">{processData.case_data.classe}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Assunto:</span>
                  <p className="font-medium">{processData.case_data.assunto}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Valor:</span>
                  <p className="font-medium">{processData.case_data.valor}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Distribuição:</span>
                  <p className="font-medium">{processData.case_data.distribuicao}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Status:</span>
                  <p className="font-medium text-green-600">{processData.case_data.status}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Movimentações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Movimentações do Processo
            </CardTitle>
            <CardDescription>
              Histórico de movimentações do seu processo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {movements.map((movement, index) => (
                <div key={index} className="border-l-4 border-[#1a237e] pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{movement.description}</p>
                      <p className="text-sm text-gray-600">{movement.type}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(movement.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientPanel;
