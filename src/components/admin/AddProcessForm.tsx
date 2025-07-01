
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";

interface AddProcessFormProps {
  clientId: string;
  clientName: string;
  onProcessAdded: () => void;
  onCancel: () => void;
}

const AddProcessForm = ({ clientId, clientName, onProcessAdded, onCancel }: AddProcessFormProps) => {
  const [processNumber, setProcessNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('client_processes')
        .insert([{
          client_id: clientId,
          process_number: processNumber
        }]);

      if (error) {
        if (error.code === '23505') {
          toast.error('Este processo já está cadastrado para este cliente');
        } else {
          throw error;
        }
        return;
      }

      toast.success('Processo adicionado com sucesso!');
      setProcessNumber('');
      onProcessAdded();
    } catch (error) {
      console.error('Erro ao adicionar processo:', error);
      toast.error('Erro ao adicionar processo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-6 bg-white border-2 border-blue-200">
      <CardHeader className="bg-blue-50">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg text-blue-800">
            Adicionar Processo para {clientName}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Número do Processo CNJ"
            value={processNumber}
            onChange={(e) => setProcessNumber(e.target.value)}
            required
          />
          <div className="flex gap-2">
            <Button
              type="submit"
              className="bg-[#1a237e] text-white hover:bg-[#283593]"
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Adicionar Processo'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddProcessForm;
