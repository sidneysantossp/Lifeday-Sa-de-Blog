
import React, { useState } from 'react';
import ArticleCard from './ArticleCard';
import { categories } from './data';
import Button from './Button';
import { ArticleData } from './types';

interface CategoriesPageProps {
  articles: ArticleData[];
}

const CategoriesPage: React.FC<CategoriesPageProps> = ({ articles }) => {
  const [activeFilter, setActiveFilter] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeFilter === 'Todas' || article.category === activeFilter;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 animate-in fade-in duration-500 min-h-screen">
      {/* Header */}
      <div className="bg-emerald-900 py-16 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Explore por Temas</h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Navegue por nossa coleção completa de artigos organizados para facilitar sua jornada de bem-estar.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
          {categories.map((category) => (
            <div 
              key={category.id}
              onClick={() => setActiveFilter(category.name)}
              className={`group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-md transition-all duration-300 hover:shadow-xl ${activeFilter === category.name ? 'ring-4 ring-emerald-500 ring-offset-2' : ''}`}
            >
              <img 
                src={category.imageUrl} 
                alt={category.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>
              
              <div className="absolute bottom-0 left-0 p-4 w-full">
                <h3 className="text-white font-serif font-bold text-lg md:text-xl mb-1">{category.name}</h3>
                <p className="text-white/80 text-xs">{category.count} artigos</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 border-b border-stone-200 pb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto hide-scrollbar">
            <button 
               onClick={() => setActiveFilter('Todas')}
               className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeFilter === 'Todas' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'}`}
            >
              Todas
            </button>
            {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setActiveFilter(cat.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeFilter === cat.name ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
             <input 
               type="text" 
               placeholder="Buscar artigo..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
             />
             <svg className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
          </div>
        </div>

        {/* Articles List */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {filteredArticles.length > 0 ? (
            filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))
          ) : (
            <div className="text-center py-20">
              <div className="inline-block p-4 rounded-full bg-stone-100 mb-4">
                <svg className="w-8 h-8 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-stone-900">Nenhum artigo encontrado</h3>
              <p className="text-stone-500 mt-1">Tente ajustar seus filtros ou busca.</p>
              <Button variant="ghost" className="mt-4" onClick={() => {setActiveFilter('Todas'); setSearchTerm('');}}>Limpar Tudo</Button>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default CategoriesPage;
