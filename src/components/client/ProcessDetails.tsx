
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, FileText, Calendar, User, Hash, MapPin, Scale, Clock, Building, Gavel, DollarSign, AlertCircle, CheckCircle } from "lucide-react";

interface ProcessMovement {
  date: string;
  description: string;
  type: string;
  content?: string;
  step_date?: string;
}

interface ProcessDetailsProps {
  processNumber: string;
  processData: any;
  movements: ProcessMovement[];
  loading: boolean;
  onRefresh: () => void;
}

const ProcessDetails = ({ processNumber, processData, movements, loading, onRefresh }: ProcessDetailsProps) => {
  const getProcessInfo = () => {
    const caseData = processData?.case_data || {};
    
    return {
      numero: caseData.code || caseData.numero || processNumber,
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
              onClick={onRefresh}
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
  );
};

export default ProcessDetails;
