
import React from 'react';
import ArticleCard from './ArticleCard';
import { categories } from './data';
import Button from './Button';
import { ArticleData } from './types';

interface CategoryDetailPageProps {
  categoryName: string;
  onNavigate: (page: string) => void;
  articles: ArticleData[];
}

const CategoryDetailPage: React.FC<CategoryDetailPageProps> = ({ categoryName, onNavigate, articles }) => {
  // Find category metadata
  const categoryInfo = categories.find(
    c => c.name.toLowerCase() === categoryName.toLowerCase()
  );

  // Filter articles for this category dynamically
  const categoryArticles = articles.filter(
    article => article.category.toLowerCase().includes(categoryName.toLowerCase()) || 
               categoryName.toLowerCase().includes(article.category.toLowerCase())
  );

  // Fallback if category info isn't found
  const displayTitle = categoryInfo ? categoryInfo.name : categoryName;
  const displayImage = categoryInfo ? categoryInfo.imageUrl : 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=2000';
  const displayDescription = categoryInfo ? categoryInfo.description : 'Explore nossos artigos sobre este tema.';

  return (
    <div className="pt-24 pb-20 animate-in fade-in duration-500 min-h-screen bg-stone-50">
      
      {/* Hero Section for Category */}
      <div className="relative bg-white mb-16 border-b border-stone-200">
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-[500px] overflow-hidden order-2 lg:order-1 lg:rounded-r-3xl">
                <img 
                    src={displayImage} 
                    alt={displayTitle}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-stone-900/10"></div>
            </div>
            
            <div className="flex items-center p-8 lg:p-20 order-1 lg:order-2">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <button onClick={() => onNavigate('categories')} className="text-stone-400 hover:text-emerald-600 text-sm font-medium transition-colors">
                            Categorias
                        </button>
                        <span className="text-stone-300">/</span>
                        <span className="text-emerald-600 font-bold tracking-widest text-xs uppercase">
                            {displayTitle}
                        </span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6">
                        {displayTitle}
                    </h1>
                    
                    <p className="text-xl text-stone-600 leading-relaxed max-w-lg font-light">
                        {displayDescription}
                    </p>

                    <div className="mt-8 flex gap-4 text-sm text-stone-500">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-stone-900">{categoryArticles.length}</span> Artigos
                        </div>
                        <span className="text-stone-300">|</span>
                        <div className="flex items-center gap-2">
                             Atualizado <span className="font-bold text-stone-900">Hoje</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Articles Grid */}
        <div className="mb-10 flex items-center justify-between">
             <h2 className="text-2xl font-serif font-bold text-stone-900">Últimas Publicações</h2>
        </div>

        {categoryArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-stone-100 shadow-sm">
                <div className="inline-block p-4 rounded-full bg-stone-50 mb-4">
                    <svg className="w-10 h-10 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                <h3 className="text-xl font-medium text-stone-900 mb-2">Em breve</h3>
                <p className="text-stone-500 max-w-md mx-auto mb-6">
                    Ainda estamos escrevendo conteúdos incríveis para a seção de {displayTitle}. Volte em breve!
                </p>
                <Button variant="outline" onClick={() => onNavigate('categories')}>
                    Explorar outras Categorias
                </Button>
            </div>
        )}
        
        {categoryArticles.length > 0 && (
             <div className="mt-16 text-center">
                <p className="text-stone-500 text-sm mb-4">Você chegou ao fim da lista.</p>
                <Button variant="ghost" onClick={() => onNavigate('categories')}>Ver todas as categorias</Button>
             </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetailPage;
