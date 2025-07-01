
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

const ClientLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Verificar credenciais na tabela clients
      const { data: client, error } = await supabase
        .from('clients')
        .select('*')
        .eq('email', email)
        .eq('password_hash', password) // Em produção, use hash adequado
        .single();

      if (error || !client) {
        toast.error('Credenciais inválidas');
        return;
      }

      localStorage.setItem('clientAuth', JSON.stringify(client));
      toast.success('Login realizado com sucesso!');
      navigate('/cliente');
    } catch (error) {
      toast.error('Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a237e] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="text-center pb-8">
          <div className="w-16 h-16 bg-[#1a237e] rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#1a237e]">
            Área Restrita
          </CardTitle>
          <CardDescription className="text-gray-600">
            Luis Augusto Olivieri - Advogados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 h-12 border-gray-300 focus:border-[#1a237e]"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-10 h-12 border-gray-300 focus:border-[#1a237e]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full h-12 bg-[#1a237e] text-white hover:bg-[#283593] font-medium"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
          
          <div className="pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Acesso de Demonstração:</strong></p>
              <p><strong>Admin:</strong> admin@luisolivieri.com.br / admin123</p>
              <p><strong>Cliente:</strong> Será fornecido pelo advogado</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientLogin;
