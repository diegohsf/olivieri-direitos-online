
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, MessageCircle, Clock, Mail, Calendar, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contato = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://webhook.zapelegante.com.br/webhook/0b510213-58c3-41a8-8002-5af506cd6ee6', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'Site Luis Olivieri - Página de Contato'
        }),
      });

      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em até 24 horas.",
      });

      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente ou entre em contato por telefone/WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const whatsappNumber = "5511947928925";
    const message = "Olá! Vim do site e preciso tirar algumas duvidas.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    console.log('WhatsApp URL:', whatsappUrl); // Para debug
    window.open(whatsappUrl, '_blank');
  };

  const handlePhoneClick = () => {
    console.log('Phone click'); // Para debug
    window.open('tel:+551133806725', '_self');
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Endereço",
      info: "Av Antártico, 381 – 6º andar – Sala 63",
      details: "Jd do Mar – São Bernardo do Campo\nSP – CEP: 09726-150",
      color: "text-amber-600"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Telefone Fixo",
      info: "(11) 3380-6725",
      details: "Atendimento de segunda a sexta\ndas 8h às 17h",
      color: "text-amber-600"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "WhatsApp",
      info: "(11) 94792-8925",
      details: "Atendimento rápido e direto\n24 horas para resposta",
      color: "text-green-600"
    }
  ];

  const services = [
    "Análise do seu caso",
    "Orientação jurídica completa",
    "Acompanhamento personalizado",
    "Atendimento 100% digital",
    "Resposta em até 24 horas",
    "Consulta inicial com um dos melhores do país"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-slate-800 text-white py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/lovable-uploads/cdd2862a-e90c-4d36-b585-2687f9cfcee1.png" alt="Luis Olivieri Logo" className="h-12 w-auto" />
            <div>
              <span className="text-xl font-bold">Luis Augusto Olivieri</span>
              <p className="text-sm text-amber-400">Sociedade de Advogados</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="hover:text-amber-400 transition-colors">Início</a>
            <a href="/sobre" className="hover:text-amber-400 transition-colors">Sobre</a>
            <a href="/especialidades" className="hover:text-amber-400 transition-colors">Especialidades</a>
            <a href="/depoimentos" className="hover:text-amber-400 transition-colors">Depoimentos</a>
            <a href="/contato" className="text-amber-400">Contato</a>
            <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-800 font-medium">
              <a href="/login">Área do Cliente</a>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-amber-500 text-slate-800 mb-4 font-medium">Agende sua consulta</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Entre em <span className="text-amber-400">Contato</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Estamos prontos para defender seus direitos. Agende uma consulta e descubra como podemos ajudar você.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="border-amber-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-800 flex items-center">
                    <MessageCircle className="w-6 h-6 mr-2 text-amber-600" />
                    Fale Conosco
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Preencha o formulário abaixo e entraremos em contato em até 24 horas para uma análise do seu caso.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-800 mb-2">Nome Completo</label>
                        <Input
                          name="name"
                          placeholder="Seu nome completo"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="border-amber-200 focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-800 mb-2">E-mail</label>
                        <Input
                          name="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="border-amber-200 focus:border-amber-400"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-800 mb-2">Telefone / WhatsApp</label>
                      <Input
                        name="phone"
                        placeholder="(11) 99999-9999"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="border-amber-200 focus:border-amber-400"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-800 mb-2">Descreva seu caso</label>
                      <Textarea
                        name="message"
                        placeholder="Conte-nos sobre sua situação: aposentadoria, auxílio, questão trabalhista, etc. Quanto mais detalhes, melhor poderemos ajudar."
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className="border-amber-200 focus:border-amber-400"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-amber-500 hover:bg-amber-600 text-slate-800 font-medium py-3 text-lg" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Enviando...' : '📧 Enviar Mensagem'}
                    </Button>
                    
                    <p className="text-sm text-gray-500 text-center">
                      Ao enviar, você concorda em receber contato para análise do seu caso
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-6">Informações de Contato</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Oferecemos atendimento personalizado e consultoria jurídica especializada. 
                  Entre em contato conosco pelos canais abaixo:
                </p>
              </div>

              <div className="space-y-6">
                <Card className="border-amber-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-800 mb-1">Endereço</h3>
                        <p className="text-xl text-slate-700 font-medium mb-1">Av Antártico, 381 – 6º andar – Sala 63</p>
                        <p className="text-sm text-gray-600 whitespace-pre-line">Jd do Mar – São Bernardo do Campo{'\n'}SP – CEP: 09726-150</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-800 mb-1">Telefone Fixo</h3>
                        <p className="text-xl text-slate-700 font-medium mb-1">(11) 3380-6725</p>
                        <p className="text-sm text-gray-600 whitespace-pre-line">Atendimento de segunda a sexta{'\n'}das 8h às 18h</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                        <MessageCircle className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-800 mb-1">WhatsApp</h3>
                        <p className="text-xl text-slate-700 font-medium mb-1">(11) 94792-8925</p>
                        <p className="text-sm text-gray-600 whitespace-pre-line">Atendimento rápido e direto{'\n'}24 horas para resposta</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Services Included */}
              <Card className="bg-slate-800 text-white border-0">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <CheckCircle2 className="w-6 h-6 mr-2 text-amber-400" />
                    O que está incluído na consulta:
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      <span className="text-gray-300">Análise gratuita do seu caso</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      <span className="text-gray-300">Orientação jurídica completa</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      <span className="text-gray-300">Acompanhamento personalizado</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      <span className="text-gray-300">Atendimento 100% digital</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      <span className="text-gray-300">Resposta em até 24 horas</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      <span className="text-gray-300">Sem cobrança para consulta inicial</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Quick Contact Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleWhatsAppClick}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp: (11) 94792-8925
                </Button>
                <Button 
                  onClick={handlePhoneClick}
                  variant="outline" 
                  className="flex-1 border-amber-500 text-amber-600 hover:bg-amber-50 font-medium"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Ligar: (11) 3380-6725
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Horário de Atendimento</h2>
            <p className="text-lg text-gray-600">Estamos disponíveis nos seguintes horários para melhor atendê-lo</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800 flex items-center">
                  <Clock className="w-6 h-6 mr-2 text-amber-600" />
                  Atendimento Presencial (com hora marcada) e WhatsApp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-gray-700"><strong>Segunda a Sexta:</strong> 8h às 18h</p>
                  <p className="text-gray-700"><strong>Sábado:</strong> Fechado</p>
                  <p className="text-gray-700"><strong>Domingo:</strong> Fechado</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800 flex items-center">
                  <MessageCircle className="w-6 h-6 mr-2 text-green-600" />
                  WhatsApp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-gray-700"><strong>Segunda a Sexta:</strong> 8h às 17h</p>
                  <p className="text-gray-700"><strong>Sábado:</strong> Fechado</p>
                  <p className="text-gray-700"><strong>Domingo:</strong> Fechado</p>
                  <p className="text-sm text-green-600 mt-3">Resposta garantida em até 24h</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/lovable-uploads/cdd2862a-e90c-4d36-b585-2687f9cfcee1.png" alt="Luis Olivieri Logo" className="h-8 w-auto" />
                <span className="text-xl font-bold">Luis Augusto Olivieri</span>
              </div>
              <p className="text-gray-400 mb-4">
                Advogado especialista em Direito Previdenciário e Trabalhista
              </p>
              <Badge className="bg-amber-500 text-slate-800">OAB/SP 252.648</Badge>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-white">Início</a></li>
                <li><a href="/sobre" className="hover:text-white">Sobre</a></li>
                <li><a href="/especialidades" className="hover:text-white">Especialidades</a></li>
                <li><a href="/depoimentos" className="hover:text-white">Depoimentos</a></li>
                <li><a href="/contato" className="hover:text-white">Contato</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Especialidades</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Aposentadoria</li>
                <li>Auxílio por TER</li>
                <li>Pensão por Morte</li>
                <li>Revisão de Benefícios</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-gray-400">
                <p>(11) 3380-6725</p>
                <p>(11) 94792-8925</p>
                <p>São Bernardo do Campo, SP</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Luis Augusto Olivieri - Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contato;
