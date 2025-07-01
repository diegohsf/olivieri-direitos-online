
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash2, FileText } from "lucide-react";

interface ClientProcess {
  id: string;
  process_number: string;
  created_at: string;
}

interface ClientProcessesListProps {
  clientId: string;
  processes: ClientProcess[];
  onProcessDeleted: () => void;
}

const ClientProcessesList = ({ clientId, processes, onProcessDeleted }: ClientProcessesListProps) => {
  const handleDeleteProcess = async (processId: string, processNumber: string) => {
    if (!confirm(`Tem certeza que deseja remover o processo ${processNumber}?`)) return;

    try {
      const { error } = await supabase
        .from('client_processes')
        .delete()
        .eq('id', processId);

      if (error) throw error;

      toast.success('Processo removido com sucesso!');
      onProcessDeleted();
    } catch (error) {
      console.error('Erro ao remover processo:', error);
      toast.error('Erro ao remover processo');
    }
  };

  if (processes.length === 0) {
    return (
      <div className="text-sm text-gray-500 italic">
        Nenhum processo cadastrado
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {processes.map((process) => (
        <div key={process.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-600" />
            <span className="font-mono text-sm">{process.process_number}</span>
            <Badge variant="outline" className="text-xs">
              {new Date(process.created_at).toLocaleDateString('pt-BR')}
            </Badge>
          </div>
          <Button
            onClick={() => handleDeleteProcess(process.id, process.process_number)}
            size="sm"
            variant="ghost"
            className="text-red-600 hover:text-red-800 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ClientProcessesList;
