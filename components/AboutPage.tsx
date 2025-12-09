import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 animate-in fade-in duration-500 min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative py-20 bg-stone-50 mb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 opacity-60"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="text-emerald-600 font-bold tracking-widest text-xs uppercase mb-4 block">Nossa Essência</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-8 leading-tight">
            Valorizamos a vida em <br/> <span className="text-emerald-700 italic">cada detalhe.</span>
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto font-light">
            Somos um coletivo de apaixonados pelo bem-estar, exploradores de hábitos saudáveis e curadores de boas histórias.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative">
             <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-stone-200">
               <img 
                 src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2000&auto=format&fit=crop" 
                 alt="Grupo de amigos caminhando" 
                 className="w-full h-full object-cover"
                 loading="lazy"
               />
             </div>
             <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-900 rounded-full p-8 flex items-center justify-center text-white text-center hidden md:flex">
                <p className="font-serif italic text-lg">"Viver bem é uma arte diária."</p>
             </div>
          </div>

          <div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">Mais que um blog, um movimento de consciência.</h2>
            <div className="space-y-6 text-stone-600 text-lg leading-relaxed">
              <p>
                O <strong>Lifeday Saúde</strong> nasceu de uma conversa simples entre amigos que compartilhavam o mesmo desejo: encontrar informações confiáveis sobre como viver uma vida mais plena, sem extremismos e com mais equilíbrio.
              </p>
              <p>
                Não acreditamos em fórmulas mágicas. Acreditamos no poder dos pequenos hábitos, na conexão com a natureza e na importância de nutrir não apenas o corpo, mas também a mente e as relações humanas.
              </p>
              <p>
                Nossa missão é traduzir tendências de bem-estar e conhecimentos ancestrais em uma linguagem acessível, inspiradora e humana. Somos escritores, pesquisadores, pais, mães e jovens curiosos unidos pelo propósito de valorizar a vida.
              </p>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="bg-stone-50 rounded-3xl p-12 mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-stone-900">Nossos Pilares</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
                🌱
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Autenticidade</h3>
              <p className="text-stone-600">
                Trazemos conteúdo real, testado e vivido. Valorizamos a transparência e a honestidade em cada artigo publicado.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
                🤝
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Comunidade</h3>
              <p className="text-stone-600">
                Somos feitos de pessoas para pessoas. Acreditamos que a jornada do bem-estar é melhor quando compartilhada.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
                ⚖️
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Equilíbrio</h3>
              <p className="text-stone-600">
                Fugimos dos excessos. Buscamos o caminho do meio, onde saúde e prazer caminham juntos harmoniosamente.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;