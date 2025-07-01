
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Credenciais do admin
    if (email === 'admin@luisolivieri.com.br' && password === 'admin123') {
      localStorage.setItem('adminAuth', 'true');
      toast.success('Login realizado com sucesso!');
      navigate('/admin');
    } else {
      toast.error('Credenciais inválidas');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#1a237e] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#1a237e]">
            Painel Administrativo
          </CardTitle>
          <CardDescription>
            Acesso restrito ao advogado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#ffd700] text-[#1a237e] hover:bg-[#ffed4e]"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
          
          <div className="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-600">
            <p><strong>Credenciais de acesso:</strong></p>
            <p>Email: admin@luisolivieri.com.br</p>
            <p>Senha: admin123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
