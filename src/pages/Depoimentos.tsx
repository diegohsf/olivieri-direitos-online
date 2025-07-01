
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Award, TrendingUp, Quote } from "lucide-react";

const Depoimentos = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      age: 58,
      rating: 5,
      comment: "Excelente profissional! Me ajudou a conseguir minha aposentadoria após anos de luta. Muito dedicado e competente. Sempre me manteve informada sobre o andamento do processo e foi muito paciente com todas as minhas dúvidas.",
      case: "Aposentadoria por Tempo de Contribuição",
      result: "Benefício concedido em 8 meses",
      location: "São Paulo, SP"
    },
    {
      name: "João Santos",
      age: 45,
      rating: 5,
      comment: "Dr. Luis é um advogado excepcional. Conseguiu reverter o indeferimento do meu auxílio-doença após uma perícia que não reconheceu minha condição. Recomendo de olhos fechados!",
      case: "Auxílio por Incapacidade",
      result: "Recurso aprovado com retroativo",
      location: "São Bernardo do Campo, SP"
    },
    {
      name: "Ana Costa",
      age: 62,
      rating: 5,
      comment: "Profissional muito atencioso e dedicado. Me orientou em todo o processo da pensão por morte após o falecimento do meu marido. Gratidão eterna por toda ajuda e suporte emocional também.",
      case: "Pensão por Morte",
      result: "Benefício liberado em 4 meses",
      location: "Santo André, SP"
    },
    {
      name: "Carlos Oliveira",
      age: 52,
      rating: 5,
      comment: "Tinha minha aposentadoria negada há anos. Dr. Luis analisou meu caso e conseguiu não só aprovar o benefício como também garantir um valor muito melhor através de revisões. Profissional top!",
      case: "Aposentadoria Especial",
      result: "Benefício concedido + diferenças pagas",
      location: "Diadema, SP"
    },
    {
      name: "Fernanda Lima",
      age: 39,
      rating: 5,
      comment: "Excelente atendimento! Conseguiu resolver minha questão trabalhista de forma rápida e eficiente. Recebi todas as verbas que tinha direito e ainda por cima com juros. Muito profissional!",
      case: "Rescisão Indireta",
      result: "Acordo favorável em 6 meses",
      location: "São Caetano do Sul, SP"
    },
    {
      name: "Roberto Mendes",
      age: 67,
      rating: 5,
      comment: "Depois de aposentado, descobri que poderia ter um valor maior. Dr. Luis fez a revisão e conseguiu aumentar significativamente minha aposentadoria. Recebo as diferenças todo mês agora.",
      case: "Revisão da Vida Toda",
      result: "Aumento de 35% no benefício",
      location: "Mauá, SP"
    }
  ];

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: "1500+",
      label: "Clientes Atendidos",
      description: "Pessoas que confiaram em nosso trabalho"
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: "800+",
      label: "Casos Resolvidos",
      description: "Benefícios conquistados com sucesso"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      number: "95%",
      label: "Taxa de Sucesso",
      description: "Dos casos que assumimos"
    },
    {
      icon: <Star className="w-8 h-8" />,
      number: "4.9",
      label: "Avaliação Média",
      description: "Baseada em avaliações reais"
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
            <a href="/especialidades" className="hover:text-amber-400 transition-colors">Especialidades</a>
            <a href="/depoimentos" className="text-amber-400">Depoimentos</a>
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
          <Badge className="bg-amber-500 text-slate-800 mb-4 font-medium">Avaliações Reais</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-amber-400">Depoimentos</span> dos Nossos Clientes
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A satisfação e o sucesso dos nossos clientes são a nossa maior conquista. Veja o que eles têm a dizer sobre nosso trabalho.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 border-amber-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-amber-600">{stat.icon}</div>
                  </div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">{stat.number}</div>
                  <div className="text-lg font-semibold text-slate-800 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">O Que Nossos Clientes Dizem</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Cada depoimento representa uma vida transformada, um direito conquistado e uma família mais segura.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-amber-200 hover:border-amber-400 relative">
                <div className="absolute top-4 right-4">
                  <Quote className="w-8 h-8 text-amber-200" />
                </div>
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-slate-800">{testimonial.name}</CardTitle>
                      <p className="text-sm text-gray-500">{testimonial.age} anos • {testimonial.location}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Badge className="bg-amber-100 text-amber-800 mr-2">{testimonial.case}</Badge>
                    <Badge variant="outline" className="border-green-500 text-green-700">{testimonial.result}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 italic leading-relaxed">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Por Que Confiar em Nosso Trabalho?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Mais de 15 anos de experiência transformando vidas através do Direito
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-slate-800" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Experiência Comprovada</h3>
              <p className="text-gray-300">
                Mais de 800 casos resolvidos com sucesso, abrangendo todas as áreas do Direito Previdenciário e Trabalhista
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-slate-800" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Atendimento Humanizado</h3>
              <p className="text-gray-300">
                Cada cliente é tratado com atenção individual, recebendo orientação clara e acompanhamento constante
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-slate-800" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Resultados Efetivos</h3>
              <p className="text-gray-300">
                95% de taxa de sucesso nos casos assumidos, sempre buscando o melhor resultado para nossos clientes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Seja o Próximo Caso de Sucesso</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Não deixe seus direitos para depois. Entre em contato conosco e descubra como podemos ajudar você também.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-800 font-medium">
              <a href="/contato">Consulta Gratuita</a>
            </Button>
            <Button size="lg" variant="outline" className="border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white">
              Ver Mais Depoimentos
            </Button>
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

export default Depoimentos;
