import React from 'react';
import Button from './Button';
import { ArticleData } from './types';

interface ArticleCardProps {
  article: ArticleData;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  
  const handleShare = (e: React.MouseEvent, platform: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const url = encodeURIComponent(`https://bloom-blog.com/article/${article.id}`);
    const text = encodeURIComponent(article.title);
    
    let shareUrl = '';
    
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="group flex flex-col h-full bg-white border border-stone-200/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-stone-200/40 hover:border-emerald-100/50 hover:-translate-y-1">
      
      {/* Image Section - Link */}
      <a 
        href={`/article/${article.id}`}
        className="w-full aspect-[16/10] relative block cursor-pointer overflow-hidden"
        aria-label={`Ler artigo: ${article.title}`}
      >
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors duration-300" />
      </a>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-6">
        
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-bold tracking-wider uppercase text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
            {article.category}
          </span>
          <span className="text-xs text-stone-400 font-medium">• {article.readTime}</span>
        </div>

        <h3 className="text-xl font-bold font-serif text-stone-900 mb-3 leading-tight group-hover:text-emerald-700 transition-colors duration-300">
          <a href={`/article/${article.id}`} className="focus:outline-none block">
            {article.title}
          </a>
        </h3>
        
        <p className="text-stone-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
          {article.description}
        </p>

        <div className="mb-6">
          <a href={`/article/${article.id}`} tabIndex={-1} className="block w-full">
            <Button variant="outline" className="!w-full !justify-center !py-2.5 !text-xs !border-stone-200 hover:!border-emerald-500 hover:!bg-emerald-50 hover:text-emerald-700 !font-semibold">
              Ler Mais
            </Button>
          </a>
        </div>

        {/* Footer: Author & Social */}
        <div className="flex items-center justify-between pt-5 border-t border-stone-100 mt-auto">
           <div className="flex items-center gap-3">
               <img 
                 src={article.authorAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(article.author)}&background=10b981&color=fff`} 
                 alt={article.author}
                 className="w-8 h-8 rounded-full object-cover border border-stone-200"
                 loading="lazy"
               />
               <div className="flex flex-col">
                  <span className="text-xs font-bold text-stone-900">
                    {article.author}
                  </span>
                  <span className="text-[10px] text-stone-400">
                    {article.date}
                  </span>
               </div>
           </div>
           
           <div className="flex items-center gap-1">
             <button 
               onClick={(e) => handleShare(e, 'facebook')}
               className="text-stone-300 hover:text-blue-600 transition-colors p-1.5 hover:bg-stone-50 rounded-full"
               aria-label="Compartilhar no Facebook"
             >
               <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
             </button>
             <button 
               onClick={(e) => handleShare(e, 'twitter')}
               className="text-stone-300 hover:text-black transition-colors p-1.5 hover:bg-stone-50 rounded-full"
               aria-label="Compartilhar no Twitter"
             >
               <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
             </button>
             <button 
               onClick={(e) => handleShare(e, 'linkedin')}
               className="text-stone-300 hover:text-blue-700 transition-colors p-1.5 hover:bg-stone-50 rounded-full"
               aria-label="Compartilhar no LinkedIn"
             >
               <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;