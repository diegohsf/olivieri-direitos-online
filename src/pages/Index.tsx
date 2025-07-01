
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, MessageCircle, Mail, Shield, Users, Award, Clock, Star, Scale, FileText, UserCheck, Calculator, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
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
          source: 'Site Luis Olivieri'
        }),
      });

      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em breve.",
      });

      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente ou entre em contato por telefone.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const specialties = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Aposentadoria",
      description: "Aposentadoria por tempo de contribuição, idade, invalidez e especial"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Auxílio por TER",
      description: "Auxílio por incapacidade temporária para o trabalho"
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Pensão por Morte",
      description: "Direitos dos dependentes em casos de pensão por morte"
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Revisão de Benefícios",
      description: "Revisão e cálculo de benefícios previdenciários"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Direito Trabalhista",
      description: "Defesa dos direitos trabalhistas e rescisões"
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: "Ações Judiciais",
      description: "Representação em ações contra o INSS e empregadores"
    }
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      rating: 5,
      comment: "Excelente profissional! Me ajudou a conseguir minha aposentadoria após anos de luta. Muito dedicado e competente.",
      case: "Aposentadoria por Tempo de Contribuição"
    },
    {
      name: "João Santos",
      rating: 5,
      comment: "Dr. Luis é um advogado excepcional. Conseguiu reverter o indeferimento do meu auxílio-doença. Recomendo!",
      case: "Auxílio por Incapacidade"
    },
    {
      name: "Ana Costa",
      rating: 5,
      comment: "Profissional muito atencioso e dedicado. Me orientou em todo o processo da pensão por morte. Gratidão eterna!",
      case: "Pensão por Morte"
    }
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
            <a href="#inicio" className="hover:text-amber-400 transition-colors">Início</a>
            <a href="#sobre" className="hover:text-amber-400 transition-colors">Sobre</a>
            <a href="#especialidades" className="hover:text-amber-400 transition-colors">Especialidades</a>
            <a href="#depoimentos" className="hover:text-amber-400 transition-colors">Depoimentos</a>
            <a href="#contato" className="hover:text-amber-400 transition-colors">Contato</a>
            <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-800 font-medium">
              Área do Cliente
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-amber-500 text-slate-800 mb-4 font-medium">OAB/SP 252.648</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Seus Direitos<br />
                <span className="text-amber-400">Previdenciários</span>
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                Especialista em Direito Previdenciário e Trabalhista com mais de 15 anos de experiência. Atuamos em todo território nacional de forma 100% digital.
              </p>
              <div className="flex flex-wrap gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400">800+</div>
                  <div className="text-sm text-gray-300">Benefícios Conquistados</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400">15+</div>
                  <div className="text-sm text-gray-300">Anos de Experiência</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400">100%</div>
                  <div className="text-sm text-gray-300">Atendimento Digital</div>
                </div>
              </div>
              <div className="flex gap-4">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-800 font-medium">
                  <a href="#contato">Fale Conosco</a>
                </Button>
                <Button size="lg" variant="outline" className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-800">
                  WhatsApp
                </Button>
              </div>
            </div>
            <div className="bg-slate-700/50 backdrop-blur-sm rounded-lg p-6 border border-slate-600">
              <div className="flex items-center mb-4">
                <MessageCircle className="w-6 h-6 text-amber-400 mr-2" />
                <h3 className="text-xl font-semibold text-center">Entre em Contato</h3>
              </div>
              <p className="text-gray-300 text-center mb-6">Descreva seu caso previdenciário ou trabalhista</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  name="name"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-gray-400"
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Seu e-mail"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-gray-400"
                />
                <Input
                  name="phone"
                  placeholder="Seu telefone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-gray-400"
                />
                <Textarea
                  name="message"
                  placeholder="Descreva seu caso (aposentadoria, auxílio, questão trabalhista...)"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-gray-400"
                  rows={3}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-800 font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : '✈️ Enviar Mensagem'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-800">Sobre Dr. Luis Augusto Olivieri</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Advogado especialista em Direito Previdenciário e Trabalhista, com mais de 15 anos de experiência na defesa dos direitos de trabalhadores e segurados do INSS.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-slate-800 text-white p-8 rounded-lg">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <img src="/lovable-uploads/f7c000e0-5104-4e8a-bdf4-0c193e78c323.png" alt="Dr. Luis Augusto Olivieri" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-semibold">Dr. Luis Augusto Olivieri</h3>
                <p className="text-amber-400">OAB/SP 252.648</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span>Especialista em Direito Previdenciário</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-amber-400" />
                  <span>Mais de 800 casos resolvidos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <span>15+ anos de experiência</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-slate-800">Especialização e Experiência</h3>
              <p className="text-gray-600">
                Com formação sólida e especialização em Direito Previdenciário e Trabalhista, 
                Dr. Luis Augusto Olivieri dedica sua carreira à defesa incansável dos direitos 
                de trabalhadores e segurados do INSS.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-amber-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-amber-600">95%</div>
                    <div className="text-sm text-gray-600">Taxa de Sucesso</div>
                  </CardContent>
                </Card>
                <Card className="border-amber-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-amber-600">24h</div>
                    <div className="text-sm text-gray-600">Resposta Máxima</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section id="especialidades" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-800">Especialidades</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Atuação focada em Direito Previdenciário e Trabalhista, com expertise em diversos tipos de benefícios e ações judiciais.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialties.map((specialty, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-amber-200 hover:border-amber-400">
                <CardHeader>
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-amber-600">{specialty.icon}</div>
                  </div>
                  <CardTitle className="text-xl text-slate-800">{specialty.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {specialty.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Não deixe seus direitos para depois</h2>
          <p className="text-xl mb-8 text-gray-300">
            Cada caso é único e específico. Entre em contato para uma análise personalizada da sua situação.
          </p>
          <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-800 font-medium">
            <a href="#contato">Fale Conosco Agora</a>
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-800">Depoimentos de Clientes</h2>
            <p className="text-lg text-gray-600">
              A satisfação dos nossos clientes é nossa maior conquista.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-amber-200">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg text-slate-800">{testimonial.name}</CardTitle>
                  <CardDescription className="text-amber-600 font-medium">
                    {testimonial.case}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-amber-600">95%</div>
              <div className="text-gray-600">Taxa de Sucesso</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600">800+</div>
              <div className="text-gray-600">Casos Resolvidos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600">1500+</div>
              <div className="text-gray-600">Clientes Atendidos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-800">Entre em Contato</h2>
            <p className="text-lg text-gray-600">
              Estamos prontos para defender seus direitos. Entre em contato conosco.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6 text-slate-800">Informações de Contato</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-amber-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-800">Endereço</h4>
                    <p className="text-gray-600">
                      Av Antártico, 381 – 6º andar – Sala 63<br />
                      Jd do Mar – São Bernardo do Campo<br />
                      SP – CEP: 09726-150
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-amber-600" />
                  <div>
                    <h4 className="font-semibold text-slate-800">Telefone Fixo</h4>
                    <p className="text-gray-600">(11) 3380-6725</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <MessageCircle className="w-6 h-6 text-amber-600" />
                  <div>
                    <h4 className="font-semibold text-slate-800">WhatsApp</h4>
                    <p className="text-gray-600">(11) 94792-8925</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800 text-white p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-3">Atendimento 100% digital</h4>
                <p className="text-gray-300 mb-4">
                  Realizamos consultas e acompanhamento de processos de forma totalmente digital, proporcionando comodidade e agilidade.
                </p>
                <Button className="bg-green-600 hover:bg-green-700">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
            
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-slate-800">Fale Conosco</CardTitle>
                <CardDescription>
                  Preencha o formulário e entraremos em contato em breve.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="name"
                      placeholder="Nome completo"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="border-amber-200 focus:border-amber-400"
                    />
                    <Input
                      name="email"
                      type="email"
                      placeholder="E-mail"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="border-amber-200 focus:border-amber-400"
                    />
                  </div>
                  <Input
                    name="phone"
                    placeholder="Telefone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="border-amber-200 focus:border-amber-400"
                  />
                  <Textarea
                    name="message"
                    placeholder="Descreva seu caso"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="border-amber-200 focus:border-amber-400"
                  />
                  <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-800 font-medium" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
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
                <li><a href="#inicio" className="hover:text-white">Início</a></li>
                <li><a href="#sobre" className="hover:text-white">Sobre</a></li>
                <li><a href="#especialidades" className="hover:text-white">Especialidades</a></li>
                <li><a href="#depoimentos" className="hover:text-white">Depoimentos</a></li>
                <li><a href="#contato" className="hover:text-white">Contato</a></li>
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

export default Index;
