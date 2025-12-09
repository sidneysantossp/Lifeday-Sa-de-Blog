
import React, { useRef, useEffect, useState, useCallback } from 'react';
import Button from './Button';
import FeaturedArticleCard from './FeaturedArticleCard';
import ArticleCard from './ArticleCard';
import Sidebar from './Sidebar';
import CategorySection from './CategorySection';
import { categories, popularCategories } from './data'; // Import data only for static structures like category list
import { ArticleData } from './types';

interface HomePageProps {
  onNavigateToCategory: (category: string) => void;
  articles: ArticleData[]; // Dynamic Data
}

const HomePage: React.FC<HomePageProps> = ({ onNavigateToCategory, articles }) => {
  const categoriesRef = useRef<HTMLDivElement>(null);
  const articlesSectionRef = useRef<HTMLDivElement>(null);
  const [categorySetWidth, setCategorySetWidth] = useState(0);
  const [showScrollButtons, setShowScrollButtons] = useState(true);
  const hoverTimeoutRef = useRef<number | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Derived Data from Props
  const featuredArticle = articles.find(a => a.id === 'feat-1') || articles[0];
  const nutritionArticles = articles.filter(a => a.category === 'Nutrição').slice(0, 3);
  const mindBodyArticles = articles.filter(a => a.category === 'Meditação' || a.category === 'Yoga' || a.category === 'Bem-Estar').slice(0, 3);
  // Recents (All except featured, latest first)
  const recentArticles = articles.filter(a => a.id !== featuredArticle?.id);

  const displayCategories = [...categories, ...categories, ...categories];

  const initializeScroll = useCallback(() => {
    if (categoriesRef.current && categoriesRef.current.scrollWidth > 0 && categories.length > 0) {
      const singleSetWidth = categoriesRef.current.scrollWidth / 3; 
      setCategorySetWidth(singleSetWidth);
      categoriesRef.current.scrollLeft = singleSetWidth;
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (!categoriesRef.current || categorySetWidth === 0) return;

    const container = categoriesRef.current;
    const currentScrollLeft = container.scrollLeft;
    const scrollThreshold = 10; 

    if (currentScrollLeft <= scrollThreshold) {
      container.scrollLeft = categorySetWidth + currentScrollLeft;
    }
    else if (currentScrollLeft >= categorySetWidth * 2 - container.offsetWidth + scrollThreshold) {
      container.scrollLeft = categorySetWidth + (currentScrollLeft - categorySetWidth * 2);
    }

    setShowScrollButtons(true);
    if (hoverTimeoutRef.current) {
        window.clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = window.setTimeout(() => {
        setShowScrollButtons(false);
    }, 2000); 
  }, [categorySetWidth]);

  useEffect(() => {
    initializeScroll(); 

    const container = categoriesRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', initializeScroll); 
    }

    hoverTimeoutRef.current = window.setTimeout(() => {
      setShowScrollButtons(false);
    }, 3000); 

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', initializeScroll);
      if (hoverTimeoutRef.current) {
        window.clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [initializeScroll, handleScroll]);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (!categoriesRef.current) return;
    const scrollAmount = categoriesRef.current.offsetWidth / 2; 
    if (direction === 'left') {
      categoriesRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      categoriesRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
    setShowScrollButtons(true);
    if (hoverTimeoutRef.current) {
        window.clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = window.setTimeout(() => {
        setShowScrollButtons(false);
    }, 2000);
  };

  const handleContainerMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
    }
    setShowScrollButtons(true);
  };

  const handleContainerMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = window.setTimeout(() => {
      setShowScrollButtons(false);
    }, 1500); 
  };

  // Filter articles logic
  const filteredArticles = recentArticles.filter(article => {
    const matchesCategory = selectedCategory ? article.category.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(article.category.toLowerCase()) : true;
    const matchesSearch = searchTerm ? 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      article.description.toLowerCase().includes(searchTerm.toLowerCase()) 
      : true;
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 z-0"></div>
        <div className="absolute top-20 left-0 w-[300px] h-[300px] bg-blue-50/50 rounded-full blur-3xl -translate-x-1/2 z-0"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white border border-stone-200 text-xs font-semibold tracking-wider uppercase text-emerald-600 mb-6 shadow-sm">
            Bem-vindo ao Lifeday
          </span>
          <h1 className="text-5xl sm:text-7xl font-serif font-medium text-stone-900 leading-[1.1] mb-8 tracking-tight">
            Nutrindo o corpo,<br />
            <span className="italic text-emerald-700">acalmando</span> a mente.
          </h1>
          <p className="text-lg sm:text-xl text-stone-600 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Um espaço dedicado à ciência da longevidade, nutrição consciente e ao equilíbrio necessário para uma vida plena.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="primary" className="rounded-full px-8 py-4 text-base">Começar Jornada</Button>
            <Button variant="ghost" className="rounded-full px-8 py-4 text-base">Nossos Autores</Button>
          </div>
        </div>
      </section>

      {/* Categories Scroller */}
      <section className="py-12 border-y border-stone-200/60 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="relative group"
            onMouseEnter={handleContainerMouseEnter}
            onMouseLeave={handleContainerMouseLeave}
          >
            <button
              onClick={() => scrollCategories('left')}
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur border border-stone-200 rounded-full p-3 shadow-lg z-20 -ml-5 hover:scale-110 transition-all duration-300 ${showScrollButtons ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}
            >
              <svg className="h-5 w-5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={() => scrollCategories('right')}
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur border border-stone-200 rounded-full p-3 shadow-lg z-20 -mr-5 hover:scale-110 transition-all duration-300 ${showScrollButtons ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}
            >
              <svg className="h-5 w-5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>

            <div
              ref={categoriesRef}
              className="flex overflow-x-auto hide-scrollbar gap-x-8 pb-2 items-center"
            >
              {displayCategories.map((category, index) => {
                return (
                  <div 
                    key={`${category.id}-${index}`} 
                    className="flex-shrink-0 flex flex-col items-center gap-3 cursor-pointer group/item"
                    onClick={() => onNavigateToCategory(category.name)}
                  >
                    <div 
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 border border-stone-200 group-hover/item:border-emerald-400 transition-all duration-300"
                    >
                      <div className="w-full h-full rounded-full overflow-hidden relative">
                        <img 
                          src={category.imageUrl} 
                          alt={category.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110" 
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <span 
                      className="text-sm font-medium transition-colors text-stone-600 group-hover/item:text-emerald-700"
                    >
                      {category.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="flex items-baseline justify-between mb-8 border-b border-stone-200 pb-4">
            <h2 className="text-3xl font-serif font-bold text-stone-900">Em Destaque</h2>
            <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-800 transition-colors">Ver todos</a>
          </div>
          {featuredArticle && <FeaturedArticleCard article={featuredArticle} />}
      </section>

      <CategorySection 
        title="Nutrição Consciente" 
        subtitle="Receitas, dicas e ciência para nutrir seu corpo da forma correta."
        articles={nutritionArticles}
        variant="stone" 
      />

       <CategorySection 
        title="Mente & Equilíbrio" 
        subtitle="Estratégias para reduzir o estresse e melhorar a qualidade do sono."
        articles={mindBodyArticles}
        variant="white"
      />

      {/* Feed & Sidebar */}
      <section ref={articlesSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Feed */}
          <div className="lg:col-span-8">
            <div className="sticky top-20 bg-stone-50/95 backdrop-blur-sm z-30 py-4 mb-6">
               <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                  <h2 className="text-2xl font-serif font-bold text-stone-900">
                    Mais Recentes
                  </h2>
                  
                  <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                     <select 
                        className="bg-white border border-stone-200 text-stone-600 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 outline-none cursor-pointer hover:border-emerald-300 transition-colors"
                        value={selectedCategory}
                        onChange={(e) => onNavigateToCategory(e.target.value)}
                     >
                        <option value="">Todas Categorias</option>
                        {categories.map(c => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                     </select>
                     
                     <div className="relative flex-grow md:flex-grow-0">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                           <svg className="w-4 h-4 text-stone-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                           </svg>
                        </div>
                        <input 
                           type="text" 
                           className="block w-full md:w-48 p-2.5 pl-10 text-sm text-stone-900 border border-stone-200 rounded-lg bg-white focus:ring-emerald-500 focus:border-emerald-500 outline-none" 
                           placeholder="Buscar..." 
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                        />
                     </div>
                  </div>
               </div>
            </div>

            <div className="space-y-4">
              {filteredArticles.length > 0 ? (
                filteredArticles.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))
              ) : (
                <div className="text-center py-10 bg-white rounded-2xl border border-stone-100">
                  <p className="text-stone-500">Nenhum artigo encontrado.</p>
                </div>
              )}
            </div>
            
            {filteredArticles.length > 0 && (
              <div className="mt-12 text-center">
                <Button variant="ghost" className="border border-stone-200 hover:border-emerald-300">Carregar Mais Artigos</Button>
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
             <Sidebar popularCategories={popularCategories} onNavigateToCategory={onNavigateToCategory} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
