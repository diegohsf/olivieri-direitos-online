import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Clock, Scale, MapPin, Phone, MessageCircle, GraduationCap, BookOpen, Target } from "lucide-react";

const Sobre = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-slate-800 text-white py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <img src="/lovable-uploads/cdd2862a-e90c-4d36-b585-2687f9cfcee1.png" alt="Luis Olivieri Logo" className="h-8 sm:h-12 w-auto" />
              <div>
                <span className="text-lg sm:text-xl font-bold">Luis Augusto Olivieri</span>
                <p className="text-xs sm:text-sm text-amber-400">Sociedade de Advogados</p>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <button className="md:hidden p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <nav className="hidden md:flex space-x-4 lg:space-x-6 items-center">
              <a href="/" className="hover:text-amber-400 transition-colors">Início</a>
              <a href="/sobre" className="text-amber-400">Sobre</a>
              <a href="/especialidades" className="hover:text-amber-400 transition-colors">Especialidades</a>
              <a href="/depoimentos" className="hover:text-amber-400 transition-colors">Depoimentos</a>
              <a href="/contato" className="hover:text-amber-400 transition-colors">Contato</a>
              <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-800 font-medium">
                <a href="/login">Área do Cliente</a>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-amber-500 text-slate-800 mb-4 font-medium">OAB/SP 252.648</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Sobre <span className="text-amber-400">Dr. Luis Augusto Olivieri</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Mais de 15 anos dedicados à defesa incansável dos direitos previdenciários e trabalhistas
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
            <div className="bg-slate-800 text-white p-6 sm:p-8 rounded-lg">
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <img src="/lovable-uploads/f7c000e0-5104-4e8a-bdf4-0c193e78c323.png" alt="Dr. Luis Augusto Olivieri" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-semibold">Dr. Luis Augusto Olivieri</h3>
                <p className="text-amber-400 text-lg">OAB/SP 252.648</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800">Trajetória Profissional</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Com mais de 15 anos de experiência em Direito Previdenciário e Trabalhista, 
                Dr. Luis Augusto Olivieri construiu uma carreira sólida baseada na defesa 
                incansável dos direitos de trabalhadores e segurados do INSS.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Sua expertise abrange desde casos de aposentadoria até questões trabalhistas complexas, 
                sempre com foco na obtenção dos melhores resultados para seus clientes.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 lg:mb-16">
            <Card className="text-center p-6 border-amber-200">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-amber-600 mb-2">4000+</div>
                <div className="text-gray-600">Benefícios Conquistados</div>
              </CardContent>
            </Card>
            <Card className="text-center p-6 border-amber-200">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-amber-600 mb-2">15+</div>
                <div className="text-gray-600">Anos de Experiência</div>
              </CardContent>
            </Card>
            <Card className="text-center p-6 border-amber-200">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-amber-600 mb-2">95%</div>
                <div className="text-gray-600">Taxa de Sucesso</div>
              </CardContent>
            </Card>
            <Card className="text-center p-6 border-amber-200">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-amber-600 mb-2">15000+</div>
                <div className="text-gray-600">Clientes Atendidos</div>
              </CardContent>
            </Card>
          </div>

          {/* Qualifications */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
            <Card className="border-amber-200">
              <CardHeader>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="w-8 h-8 text-amber-600" />
                </div>
                <CardTitle className="text-xl text-slate-800">Formação Acadêmica</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Graduação em Direito e especialização em Direito Previdenciário e Trabalhista, 
                  com constante atualização nas mudanças legislativas.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-amber-200">
              <CardHeader>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8 text-amber-600" />
                </div>
                <CardTitle className="text-xl text-slate-800">Experiência Prática</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Mais de 4000 casos resolvidos com sucesso, abrangendo aposentadorias, 
                  auxílios, pensões e questões trabalhistas complexas.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-amber-200">
              <CardHeader>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-8 h-8 text-amber-600" />
                </div>
                <CardTitle className="text-xl text-slate-800">Foco no Cliente</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Atendimento personalizado e humanizado, com acompanhamento constante 
                  do processo e orientação clara em cada etapa.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Mission */}
          <div className="bg-slate-800 text-white p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-6">Nossa Missão</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Defender incansavelmente os direitos previdenciários e trabalhistas, 
              proporcionando segurança jurídica e tranquilidade aos nossos clientes 
              através de um atendimento diferenciado e resultados efetivos.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Entre em Contato</h2>
            <p className="text-lg text-gray-600">
              Agende uma consulta e conheça melhor nosso trabalho
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Endereço</h3>
              <p className="text-gray-600">
                Av Antártico, 381 – 6º andar – Sala 63<br />
                Jd do Mar – São Bernardo do Campo<br />
                SP – CEP: 09726-150
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Telefone</h3>
              <p className="text-gray-600">
                (11) 3380-6725<br />
                Telefone fixo
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">WhatsApp</h3>
              <p className="text-gray-600">
                (11) 94792-8925<br />
                Atendimento rápido
              </p>
            </div>
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

export default Sobre;
