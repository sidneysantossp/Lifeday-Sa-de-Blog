import React from 'react';
import { ArticleData } from './types';

interface CategorySectionProps {
  title: string;
  subtitle?: string;
  articles: ArticleData[];
  variant?: 'white' | 'stone'; // Background variant
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, subtitle, articles, variant = 'white' }) => {
  const bgClass = variant === 'stone' ? 'bg-stone-50 border-y border-stone-200/60' : 'bg-white';

  return (
    <section className={`py-16 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-2">{title}</h2>
            {subtitle && <p className="text-stone-500 max-w-xl">{subtitle}</p>}
          </div>
          <a href="#" className="group flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-800 transition-colors">
            Ver tudo
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <a 
              key={article.id} 
              href={`/article/${article.id}`}
              className="group flex flex-col h-full cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-stone-100">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors duration-300" />
                
                {/* Floating Tag */}
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-stone-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-stone-100">
                  {article.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-3 text-xs text-stone-500 font-medium">
                  <span>{article.date}</span>
                  <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-xl font-serif font-bold text-stone-900 mb-3 leading-tight group-hover:text-emerald-700 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-stone-600 text-sm leading-relaxed mb-4 line-clamp-2">
                  {article.description}
                </p>

                {/* Author Mini */}
                <div className="mt-auto pt-4 border-t border-stone-100 flex items-center gap-2">
                  <img 
                    src={article.authorAvatar || `https://ui-avatars.com/api/?name=${article.author}`} 
                    alt={article.author}
                    className="w-6 h-6 rounded-full object-cover"
                    loading="lazy"
                  />
                  <span className="text-xs font-semibold text-stone-900 group-hover:text-emerald-700 transition-colors">
                    {article.author}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;