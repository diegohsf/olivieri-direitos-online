
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, ChevronRight, Calendar } from "lucide-react";

interface ClientProcess {
  id: string;
  process_number: string;
  created_at: string;
}

interface ProcessSelectorProps {
  processes: ClientProcess[];
  selectedProcessId: string | null;
  onProcessSelect: (processId: string, processNumber: string) => void;
}

const ProcessSelector = ({ processes, selectedProcessId, onProcessSelect }: ProcessSelectorProps) => {
  if (processes.length === 0) {
    return (
      <Card className="mb-6">
        <CardContent className="p-6 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Nenhum processo encontrado</p>
        </CardContent>
      </Card>
    );
  }

  if (processes.length === 1) {
    // Se há apenas um processo, não mostrar seletor
    return null;
  }

  return (
    <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Seus Processos ({processes.length})
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Selecione um processo para visualizar os detalhes
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {processes.map((process) => (
            <div
              key={process.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                selectedProcessId === process.id
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onProcessSelect(process.id, process.process_number)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <span className="font-mono text-sm font-medium">
                      {process.process_number}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>Cadastrado em {new Date(process.created_at).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
                <ChevronRight className={`w-5 h-5 transition-transform ${
                  selectedProcessId === process.id ? 'rotate-90 text-blue-600' : 'text-gray-400'
                }`} />
              </div>
              
              {selectedProcessId === process.id && (
                <Badge className="mt-2 bg-blue-100 text-blue-800 hover:bg-blue-100">
                  Selecionado
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessSelector;
