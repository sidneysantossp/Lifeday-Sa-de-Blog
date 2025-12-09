import React, { useState } from 'react';
import Button from './Button';

interface PopularCategory {
  name: string;
  count: number;
  icon: string; 
}

interface SidebarProps {
  popularCategories: PopularCategory[];
  onNavigateToCategory?: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ popularCategories, onNavigateToCategory }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('O campo de e-mail é obrigatório.');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Por favor, insira um e-mail válido.');
      return;
    }

    setStatus('success');
    setMessage('Inscrição realizada com sucesso!');
    
    setTimeout(() => {
      setEmail('');
      setStatus('idle');
      setMessage('');
    }, 3000);
  };

  return (
    <aside className="sticky top-24 space-y-10 lg:pl-8 border-l border-stone-100/0 lg:border-stone-200/50 max-h-[calc(100vh-6rem)] overflow-y-auto hide-scrollbar pb-10">
      
      {/* Newsletter Widget - Minimalist */}
      <div className="bg-emerald-900 rounded-2xl p-8 text-center relative overflow-hidden group flex-shrink-0">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-emerald-800/50 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-emerald-500/20 rounded-full blur-xl"></div>
        
        <div className="relative z-10">
          <span className="inline-block p-3 bg-emerald-800 rounded-xl mb-4 text-emerald-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          </span>
          <h3 className="text-xl font-serif font-bold text-white mb-2">Weekly Wellness</h3>
          <p className="text-emerald-100/80 text-sm mb-6 leading-relaxed">
            Junte-se a 10.000+ leitores e receba dicas de saúde e nutrição toda semana.
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="space-y-3" noValidate>
            <div className="relative">
              <input
                type="email"
                placeholder="Seu melhor email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== 'idle') {
                    setStatus('idle');
                    setMessage('');
                  }
                }}
                className={`w-full px-4 py-3 bg-emerald-800/50 border rounded-lg text-white placeholder-emerald-400/70 focus:outline-none focus:ring-2 focus:bg-emerald-800 transition-all text-sm
                  ${status === 'error' ? 'border-red-400 focus:ring-red-400' : 'border-emerald-700/50 focus:ring-emerald-400'}`}
              />
            </div>
            
            {message && (
              <p className={`text-xs text-left ${status === 'error' ? 'text-red-300' : 'text-emerald-300'}`}>
                {message}
              </p>
            )}

            <button type="submit" className="w-full py-3 bg-white text-emerald-900 font-bold rounded-lg hover:bg-emerald-50 transition-colors shadow-lg text-sm">
              Inscrever-se
            </button>
          </form>
        </div>
      </div>

      {/* Tópicos Populares Widget */}
      <div className="pt-2 flex-shrink-0">
        <h3 className="text-lg font-serif font-bold text-stone-900 mb-6 flex items-center gap-2 border-b border-stone-200 pb-3">
          Tópicos Populares
        </h3>
        <ul className="space-y-2">
          {popularCategories.map((category) => (
            <li key={category.name}>
              <button 
                onClick={() => onNavigateToCategory && onNavigateToCategory(category.name)}
                className="w-full flex items-center justify-between group p-3 rounded-xl hover:bg-white hover:shadow-md hover:shadow-stone-200/50 border border-transparent hover:border-stone-100 transition-all duration-300 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl opacity-70 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300">{category.icon}</span>
                  <span className="text-stone-600 font-medium group-hover:text-emerald-700 transition-colors text-sm">{category.name}</span>
                </div>
                <span className="text-stone-400 text-xs font-semibold bg-stone-100 px-2.5 py-1 rounded-full group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">
                  {category.count}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

       {/* Trending Tags - Cloud */}
       <div className="pt-2 flex-shrink-0">
          <h3 className="text-sm font-bold text-stone-900 uppercase tracking-widest mb-4 border-b border-stone-200 pb-3">Trending Tags</h3>
          <div className="flex flex-wrap gap-2">
            {['#Detox', '#Yoga', '#VitaminaD', '#Sleep', '#Mindfulness', '#Natural', '#Organico'].map(tag => (
              <span key={tag} className="px-3 py-1.5 bg-white border border-stone-200 rounded-full text-xs text-stone-500 hover:border-emerald-500 hover:text-emerald-600 hover:shadow-sm cursor-pointer transition-all duration-200">
                {tag}
              </span>
            ))}
          </div>
       </div>
    </aside>
  );
};

export default Sidebar;