import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Upload, X, FileText } from "lucide-react";
import DocumentsList from "@/components/client/DocumentsList";

interface ClientInfo {
  id: string;
  name: string;
  email: string;
}

const ClientDocuments = () => {
  const navigate = useNavigate();
  const { clientId } = useParams<{ clientId: string }>();
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Verificar se é admin
    const adminAuth = localStorage.getItem('adminAuth');
    setIsAdmin(!!adminAuth);

    if (!clientId) {
      navigate('/admin');
      return;
    }

    fetchClientInfo();
  }, [clientId, navigate]);

  const fetchClientInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('id, name, email')
        .eq('id', clientId)
        .single();

      if (error) throw error;
      setClientInfo(data);
    } catch (error) {
      console.error('Erro ao carregar informações do cliente:', error);
      toast.error('Erro ao carregar informações do cliente');
      navigate('/admin');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      toast.error('Selecione pelo menos um arquivo');
      return;
    }

    if (!clientId) return;

    setUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = `${clientId}/${Date.now()}-${isAdmin ? 'admin' : 'client'}-${file.name}`;

        // Upload do arquivo para o storage
        const { error: uploadError } = await supabase.storage
          .from('client-documents')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Registrar o documento na tabela
        const { error: dbError } = await supabase
          .from('client_documents')
          .insert({
            client_id: clientId,
            file_name: file.name,
            file_path: fileName,
            file_size: file.size,
            file_type: file.type || 'application/octet-stream',
            description: description || null,
            uploaded_by_admin: isAdmin
          });

        if (dbError) throw dbError;
      }

      toast.success(`${files.length} arquivo(s) enviado(s) com sucesso!`);
      setFiles(null);
      setDescription('');
      setRefreshTrigger(prev => prev + 1);
      
      // Limpar o input
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Erro no upload:', error);
      toast.error('Erro ao enviar arquivo(s)');
    } finally {
      setUploading(false);
    }
  };

  const clearFiles = () => {
    setFiles(null);
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  if (!clientInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate(isAdmin ? '/admin' : '/cliente')}
              variant="outline"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Documentos de {clientInfo.name}
              </h1>
              <p className="text-gray-600">{clientInfo.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="view" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="view">Visualizar Documentos</TabsTrigger>
            <TabsTrigger value="upload">Enviar Documentos</TabsTrigger>
          </TabsList>

          <TabsContent value="view" className="mt-6">
            <DocumentsList 
              clientId={clientId!} 
              isAdmin={isAdmin} 
              refreshTrigger={refreshTrigger} 
            />
          </TabsContent>

          <TabsContent value="upload" className="mt-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Enviar Documentos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Selecionar Arquivos
                  </label>
                  <Input
                    id="file-input"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="cursor-pointer"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Formatos aceitos: PDF, DOC, DOCX, JPG, PNG, TXT
                  </p>
                </div>

                {files && files.length > 0 && (
                  <div className="bg-gray-50 p-3 rounded-lg border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {files.length} arquivo(s) selecionado(s):
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFiles}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    {Array.from(files).map((file, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText className="w-4 h-4" />
                        <span>{file.name}</span>
                        <span className="text-xs">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Descrição (opcional)
                  </label>
                  <Textarea
                    placeholder="Descreva o conteúdo dos documentos..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleUpload}
                    disabled={!files || files.length === 0 || uploading}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploading ? 'Enviando...' : 'Enviar Documentos'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientDocuments;