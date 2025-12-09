import React from 'react';
import Button from './Button';
import { ArticleData } from './types';

interface FeaturedArticleCardProps {
  article: ArticleData;
}

const FeaturedArticleCard: React.FC<FeaturedArticleCardProps> = ({ article }) => {
  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 items-center mb-16">
      
      {/* Visual Side */}
      <div className="lg:col-span-7 relative group">
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-2xl shadow-stone-200/50">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          {/* Subtle gradient overlay for text readability if needed, mostly for aesthetics */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Content Side */}
      <div className="lg:col-span-5 relative mt-8 lg:mt-0 lg:-ml-12 z-10">
        <div className="bg-white/95 backdrop-blur-xl p-8 lg:p-10 rounded-2xl shadow-xl shadow-stone-200/40 border border-white/50">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-100">
              Destaque
            </span>
            <span className="text-stone-400 text-sm font-medium border-l border-stone-200 pl-3">
              {article.readTime}
            </span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900 leading-tight mb-4">
            {article.title}
          </h3>
          
          <p className="text-stone-600 text-base leading-relaxed mb-8">
            {article.description}
          </p>

          <div className="flex items-center gap-4 mb-8">
             <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-emerald-200 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-stone-200 border-2 border-white"></div>
             </div>
             <div className="text-xs">
                <p className="font-bold text-stone-900">Escrito por {article.author}</p>
                <p className="text-stone-500">{article.date}</p>
             </div>
          </div>

          <div className="flex gap-3">
            <Button variant="primary">Ler Agora</Button>
            <Button variant="outline">Salvar</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticleCard;