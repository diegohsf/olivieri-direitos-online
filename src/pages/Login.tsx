
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Lock, Mail, Eye, EyeOff, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Credenciais de administrador
      if (email === 'admin@luisolivieri.com.br' && password === 'admin123') {
        localStorage.setItem('adminAuth', 'true');
        toast.success('Login administrativo realizado com sucesso!');
        navigate('/admin');
        return;
      }
      
      // Verificar se é um cliente cadastrado no banco de dados
      const { data: client, error } = await supabase
        .from('clients')
        .select('*')
        .eq('email', email)
        .eq('password_hash', password)
        .single();

      if (error || !client) {
        toast.error('Credenciais inválidas');
        return;
      }

      // Login como cliente
      localStorage.setItem('clientAuth', JSON.stringify(client));
      toast.success('Login realizado com sucesso!');
      navigate('/cliente');

    } catch (error) {
      console.error('Erro no login:', error);
      toast.error('Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppContact = () => {
    // Número do WhatsApp do escritório - ajuste conforme necessário
    const whatsappNumber = "5511947928925"; // Substitua pelo número real
    const message = "Olá! Estou com problemas para acessar a área restrita do site.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="text-center pb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
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
                  className="pl-10 h-12 border-gray-300 focus:border-primary"
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
                  className="pl-10 pr-10 h-12 border-gray-300 focus:border-primary"
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
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
          
          <div className="pt-6 border-t border-gray-200">
            <Button
              onClick={handleWhatsAppContact}
              variant="outline"
              className="w-full h-12 border-green-500 text-green-600 hover:bg-green-50 font-medium"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Precisa de ajuda? Entre em contato via WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
