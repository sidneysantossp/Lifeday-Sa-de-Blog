import React from 'react';
import Button from './Button';

const CareersPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 animate-in fade-in duration-500 min-h-screen bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-bold tracking-widest text-xs uppercase mb-4 block">Trabalhe Conosco</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">Junte-se à Nossa Missão</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Estamos construindo o destino digital favorito para quem busca inspiração e equilíbrio. Se você ama escrever, criar e impactar vidas positivamente, seu lugar é aqui.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden mb-12">
           <div className="p-8 border-b border-stone-100">
             <h2 className="text-2xl font-serif font-bold text-stone-900">Vagas Abertas</h2>
           </div>

           {/* Job Item 1 */}
           <div className="p-8 border-b border-stone-100 hover:bg-stone-50 transition-colors group">
             <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
               <div>
                 <h3 className="text-xl font-bold text-stone-900 mb-1 group-hover:text-emerald-700 transition-colors">Redator(a) de Conteúdo Wellness</h3>
                 <p className="text-stone-500 text-sm">Remoto • Tempo Integral • Criação</p>
               </div>
               <Button variant="outline" className="md:w-auto w-full">Aplicar Agora</Button>
             </div>
           </div>

           {/* Job Item 2 */}
           <div className="p-8 border-b border-stone-100 hover:bg-stone-50 transition-colors group">
             <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
               <div>
                 <h3 className="text-xl font-bold text-stone-900 mb-1 group-hover:text-emerald-700 transition-colors">Community Manager</h3>
                 <p className="text-stone-500 text-sm">São Paulo/Híbrido • Tempo Integral • Social</p>
               </div>
               <Button variant="outline" className="md:w-auto w-full">Aplicar Agora</Button>
             </div>
           </div>

            {/* Job Item 3 */}
            <div className="p-8 hover:bg-stone-50 transition-colors group">
             <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
               <div>
                 <h3 className="text-xl font-bold text-stone-900 mb-1 group-hover:text-emerald-700 transition-colors">Editor(a) de Vídeo (Reels/TikTok)</h3>
                 <p className="text-stone-500 text-sm">Remoto • Freelance • Design</p>
               </div>
               <Button variant="outline" className="md:w-auto w-full">Aplicar Agora</Button>
             </div>
           </div>
        </div>

        <div className="text-center">
          <p className="text-stone-600 mb-4">Não encontrou a vaga ideal?</p>
          <a href="mailto:talentos@lifedaysaude.com" className="text-emerald-600 font-bold hover:text-emerald-800 underline underline-offset-4">
            Envie seu portfólio para nosso banco de talentos
          </a>
        </div>

      </div>
    </div>
  );
};

export default CareersPage;