
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, FileText, UserCheck, Calculator, Briefcase, Scale, Clock, CheckCircle, AlertCircle } from "lucide-react";

const Especialidades = () => {
  const specialties = [
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Aposentadoria",
      description: "Aposentadoria por tempo de contribuição, idade, invalidez e especial",
      details: [
        "Aposentadoria por tempo de contribuição",
        "Aposentadoria por idade",
        "Aposentadoria por invalidez",
        "Aposentadoria especial",
        "Revisão de aposentadorias",
        "Conversão de tempo especial"
      ]
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: "Auxílio por TER",
      description: "Auxílio por incapacidade temporária para o trabalho",
      details: [
        "Auxílio por incapacidade temporária",
        "Auxílio-acidente",
        "Recursos de auxílios negados",
        "Prorrogação de auxílios",
        "Conversão em aposentadoria por invalidez",
        "Perícia médica especializada"
      ]
    },
    {
      icon: <UserCheck className="w-12 h-12" />,
      title: "Pensão por Morte",
      description: "Direitos dos dependentes em casos de pensão por morte",
      details: [
        "Pensão por morte do segurado",
        "Pensão por morte do aposentado",
        "Habilitação de dependentes",
        "Desabilitação de pensão",
        "Revisão de pensões",
        "Acumulação de benefícios"
      ]
    },
    {
      icon: <Calculator className="w-12 h-12" />,
      title: "Revisão de Benefícios",
      description: "Revisão e cálculo de benefícios previdenciários",
      details: [
        "Revisão da vida toda",
        "Revisão do teto",
        "Revisão de vínculos",
        "Revisão de salários de contribuição",
        "Cálculo de benefícios",
        "Restituição de valores"
      ]
    },
    {
      icon: <Briefcase className="w-12 h-12" />,
      title: "Direito Trabalhista",
      description: "Defesa dos direitos trabalhistas e rescisões",
      details: [
        "Rescisão indireta",
        "Horas extras não pagas",
        "Diferenças salariais",
        "Adicional de insalubridade",
        "Adicional de periculosidade",
        "FGTS e multas rescisórias"
      ]
    },
    {
      icon: <Scale className="w-12 h-12" />,
      title: "Ações Judiciais",
      description: "Representação em ações contra o INSS e empregadores",
      details: [
        "Ações previdenciárias",
        "Ações trabalhistas",
        "Mandados de segurança",
        "Recursos em tribunais",
        "Execuções de sentença",
        "Acordos judiciais"
      ]
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
            <a href="/" className="hover:text-amber-400 transition-colors">Início</a>
            <a href="/sobre" className="hover:text-amber-400 transition-colors">Sobre</a>
            <a href="/especialidades" className="text-amber-400">Especialidades</a>
            <a href="/depoimentos" className="hover:text-amber-400 transition-colors">Depoimentos</a>
            <a href="/contato" className="hover:text-amber-400 transition-colors">Contato</a>
            <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-800 font-medium">
              Área do Cliente
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-amber-500 text-slate-800 mb-4 font-medium">Áreas de Atuação</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nossas <span className="text-amber-400">Especialidades</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Atuação focada em Direito Previdenciário e Trabalhista, com expertise comprovada em diversos tipos de benefícios e ações judiciais
          </p>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {specialties.map((specialty, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-amber-200 hover:border-amber-400">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-amber-600">{specialty.icon}</div>
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-slate-800 mb-2">{specialty.title}</CardTitle>
                      <CardDescription className="text-gray-600 text-base">
                        {specialty.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {specialty.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Como Trabalhamos</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nossa metodologia garante eficiência e transparência em todas as etapas do processo
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center border-amber-200">
              <CardHeader>
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-amber-600">1</span>
                </div>
                <CardTitle className="text-xl text-slate-800">Análise do Caso</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Avaliação completa da documentação e histórico para identificar os melhores caminhos jurídicos
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-amber-200">
              <CardHeader>
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-amber-600">2</span>
                </div>
                <CardTitle className="text-xl text-slate-800">Estratégia Jurídica</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Desenvolvimento de estratégia personalizada baseada na legislação vigente e jurisprudência
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-amber-200">
              <CardHeader>
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-amber-600">3</span>
                </div>
                <CardTitle className="text-xl text-slate-800">Acompanhamento</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Monitoramento constante do processo com comunicação regular sobre andamentos e decisões
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-amber-200">
              <CardHeader>
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-amber-600">4</span>
                </div>
                <CardTitle className="text-xl text-slate-800">Resultado</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Obtenção do benefício ou direito pleiteado com o máximo de eficiência e segurança jurídica
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Precisa de Ajuda com Seu Caso?</h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Cada situação é única e merece atenção especializada. Entre em contato para uma análise gratuita do seu caso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-800 font-medium">
              <a href="/contato">Consulta Gratuita</a>
            </Button>
            <Button size="lg" variant="outline" className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-800">
              WhatsApp: (11) 94792-8925
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">800+</div>
              <div className="text-gray-600">Benefícios Conquistados</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">95%</div>
              <div className="text-gray-600">Taxa de Sucesso</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">15+</div>
              <div className="text-gray-600">Anos de Experiência</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">24h</div>
              <div className="text-gray-600">Resposta Máxima</div>
            </div>
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

export default Especialidades;
