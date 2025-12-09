import React from 'react';

const teamMembers = [
  {
    name: "Clara Mendes",
    role: "Editora Chefe",
    bio: "Jornalista apaixonada por yoga e culinária plant-based. Acredita que as palavras têm o poder de curar.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    name: "Lucas Viana",
    role: "Redator Sênior",
    bio: "Corredor de maratonas e entusiasta da produtividade consciente. Escreve sobre rotinas e alta performance.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    name: "Sofia Alencar",
    role: "Pesquisadora de Tendências",
    bio: "Viajante incansável em busca de rituais de bem-estar ao redor do mundo. Especialista em chás e meditação.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    name: "André Costa",
    role: "Colunista de Sustentabilidade",
    bio: "Defensor do estilo de vida minimalista e agricultura urbana. Ensina como viver com menos e ser mais.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    name: "Mariana Luz",
    role: "Gestora de Comunidade",
    bio: "A voz por trás das nossas redes sociais. Adora conectar pessoas e organizar retiros de fim de semana.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    name: "Pedro Siqueira",
    role: "Redator de Tecnologia",
    bio: "Explora como gadgets e aplicativos podem auxiliar na saúde mental e física sem criar dependência.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400"
  }
];

const TeamPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 animate-in fade-in duration-500 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">Quem Faz Acontecer</h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            Conheça as mentes criativas e os corações pulsantes por trás de cada artigo do Lifeday.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="group bg-stone-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-stone-100 hover:border-emerald-200">
              <div className="aspect-square overflow-hidden relative">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <p className="text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">{member.role}</p>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-3 group-hover:text-emerald-700 transition-colors">
                  {member.name}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-emerald-900 rounded-3xl text-center text-white relative overflow-hidden">
           <div className="relative z-10">
             <h2 className="text-3xl font-serif font-bold mb-4">Quer fazer parte do time?</h2>
             <p className="text-emerald-100 mb-8 max-w-xl mx-auto">Estamos sempre em busca de novas vozes e perspectivas apaixonadas pela vida.</p>
             <button className="bg-white text-emerald-900 px-8 py-3 rounded-full font-bold hover:bg-emerald-50 transition-colors">
               Ver Vagas Abertas
             </button>
           </div>
           {/* Decorative circles */}
           <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-400 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
        </div>

      </div>
    </div>
  );
};

export default TeamPage;