
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CategoriesPage from './components/CategoriesPage';
import CategoryDetailPage from './components/CategoryDetailPage';
import ArticlePage from './components/ArticlePage';
import AboutPage from './components/AboutPage';
import TeamPage from './components/TeamPage';
import CareersPage from './components/CareersPage';
import { PrivacyPage, TermsPage } from './components/LegalPages';

// Admin Imports
import LoginPage from './components/admin/LoginPage';
import RegisterPage from './components/admin/RegisterPage';
import AdminLayout from './components/admin/AdminLayout';
import DashboardPage from './components/admin/DashboardPage';
import ArticlesManager from './components/admin/ArticlesManager';
import EditArticlePage from './components/admin/EditArticlePage';

// Data
import { allArticles as initialArticles } from './components/data';
import { ArticleData } from './components/types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentArticleId, setCurrentArticleId] = useState('');
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);
  
  // Centralized Data State
  // Inicializa com os dados estáticos, mas permite alterações durante a sessão
  const [articles, setArticles] = useState<ArticleData[]>(initialArticles);

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{name: string, email: string} | null>(null);

  // Auth Persistence Logic
  useEffect(() => {
    const storedAuth = localStorage.getItem('lifeday_auth');
    const sessionAuth = sessionStorage.getItem('lifeday_auth');
    
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      setIsAuthenticated(true);
      setUser(parsed);
    } else if (sessionAuth) {
      const parsed = JSON.parse(sessionAuth);
      setIsAuthenticated(true);
      setUser(parsed);
    }
  }, []);

  const safePushState = (path: string) => {
    try {
      window.history.pushState({}, '', path);
    } catch (e) {
      console.warn('Navigation URL update suppressed in sandbox environment');
    }
  };

  useEffect(() => {
    const handleScrollToTopVisibility = () => {
      if (window.scrollY > 200) { 
        setShowScrollToTopButton(true);
      } else {
        setShowScrollToTopButton(false);
      }
    };
    window.addEventListener('scroll', handleScrollToTopVisibility);
    
    try {
        const path = window.location.pathname;
        if (path.includes('/admin')) {
             setCurrentPage('admin-login');
        } else if (path.startsWith('/article/')) {
           const id = path.split('/')[2];
           if (id) {
             setCurrentArticleId(id);
             setCurrentPage('article-detail');
           }
        }
    } catch (e) {
        console.warn("Could not read location pathname in this environment");
    }

    return () => window.removeEventListener('scroll', handleScrollToTopVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    safePushState(`/${page === 'home' ? '' : page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (categoryName: string) => {
    setCurrentCategory(categoryName);
    setCurrentPage('category-detail');
    safePushState(`/category/${categoryName.toLowerCase()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (email: string, rememberMe: boolean) => {
    setIsAuthenticated(true);
    const userData = { name: 'Admin User', email: email };
    setUser(userData);
    
    if (rememberMe) {
      localStorage.setItem('lifeday_auth', JSON.stringify(userData));
      localStorage.setItem('lifeday_email', email); // Save email for autofill
    } else {
      sessionStorage.setItem('lifeday_auth', JSON.stringify(userData));
    }

    navigateTo('admin-dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('lifeday_auth');
    sessionStorage.removeItem('lifeday_auth');
    navigateTo('home');
  };

  const handleEditArticle = (id: string | null) => {
    setEditingArticleId(id);
    navigateTo('admin-article-edit');
  };

  // Logic to Save/Update Articles
  const handleSaveArticle = (articleData: ArticleData) => {
    setArticles(prevArticles => {
      const existingIndex = prevArticles.findIndex(a => a.id === articleData.id);
      
      if (existingIndex >= 0) {
        // Update existing
        const updated = [...prevArticles];
        updated[existingIndex] = articleData;
        return updated;
      } else {
        // Add new (put at top)
        return [articleData, ...prevArticles];
      }
    });
    setEditingArticleId(null);
    navigateTo('admin-articles');
  };

  // Intercept anchor clicks
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target && target.href.includes('/article/')) {
        e.preventDefault();
        try {
            const url = new URL(target.href);
            const id = url.pathname.split('/').pop();
            if (id) {
              setCurrentArticleId(id);
              setCurrentPage('article-detail');
              safePushState(`/article/${id}`);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } catch (err) {
           // Fallback
        }
      }
    };
    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);

  // --- ROUTING LOGIC ---

  if (currentPage === 'admin-login') {
    return <LoginPage onLogin={handleLogin} onNavigate={navigateTo} />;
  }
  if (currentPage === 'admin-register') {
    return <RegisterPage onNavigate={navigateTo} />;
  }

  if (currentPage.startsWith('admin-')) {
    if (!isAuthenticated) {
        return <LoginPage onLogin={handleLogin} onNavigate={navigateTo} />;
    }

    return (
      <AdminLayout 
        currentPage={currentPage} 
        onNavigate={navigateTo} 
        onLogout={handleLogout}
        user={user}
      >
        {currentPage === 'admin-dashboard' && <DashboardPage />}
        {currentPage === 'admin-articles' && (
          <ArticlesManager 
            articles={articles} 
            onEdit={handleEditArticle} 
          />
        )}
        {currentPage === 'admin-article-edit' && (
          <EditArticlePage 
            articleId={editingArticleId} 
            articles={articles}
            onSave={handleSaveArticle}
            onNavigate={navigateTo} 
          />
        )}
      </AdminLayout>
    );
  }

  // Footer Social Links
  const socialLinks = [
    { name: 'Facebook', d: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' },
    { name: 'Instagram', d: 'M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.315 2m0-2c-2.67 0-3.004.01-4.125.06-1.12.05-1.889.23-2.563.492-1.29.502-2.39 1.402-3.097 2.533C2.268 4.796 2.088 5.565 2.038 6.686 1.988 7.807 1.977 8.14 1.977 10.81c0 2.66.01 3.003.061 4.124.05 1.12.229 1.889.492 2.563a6.869 6.869 0 002.533 3.097c.675.262 1.443.442 2.563.492 1.12.05 1.455.061 4.125.061 2.67 0 3.004-.01 4.125-.06 1.12-.05 1.889-.23 2.563-.492a6.869 6.869 0 003.097-2.533c.262-.675.442-1.443.492-2.563.05-1.12.061-1.455.061-4.125 0-2.67-.01-3.004-.06-4.125-.05-1.121-.23-1.889-.492-2.563a6.869 6.869 0 00-2.533-3.097c-.675-.262-1.443-.442-2.563-.492-1.12-.05-1.455-.061-4.125-.061zM12.316 7.042a5.274 5.274 0 100 10.548 5.274 5.274 0 000-10.548zm0 8.768a3.494 3.494 0 110-6.988 3.494 3.494 0 010 6.988zM17.436 5.432a1.187 1.187 0 100 2.374 1.187 1.187 0 000-2.374z' },
    { name: 'Twitter', d: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      
      <Navbar onNavigate={navigateTo} currentPage={currentPage} />

      {/* Dynamic Page Rendering with LIVE DATA */}
      {currentPage === 'home' && (
        <HomePage 
          onNavigateToCategory={navigateToCategory} 
          articles={articles} // Pass dynamic articles
        />
      )}
      {currentPage === 'categories' && (
        <CategoriesPage articles={articles} />
      )}
      {currentPage === 'category-detail' && (
        <CategoryDetailPage 
          categoryName={currentCategory} 
          onNavigate={navigateTo} 
          articles={articles}
        />
      )}
      {currentPage === 'article-detail' && (
         <ArticlePage 
            articleId={currentArticleId} 
            onNavigate={navigateTo} 
            onNavigateToCategory={navigateToCategory} 
            articles={articles}
         />
      )}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'team' && <TeamPage />}
      {currentPage === 'careers' && <CareersPage />}
      {currentPage === 'privacy' && <PrivacyPage />}
      {currentPage === 'terms' && <TermsPage />}

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 mt-0 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              
              {/* Col 1 */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <span className="text-xl font-bold font-serif text-stone-900">Lifeday Saúde.</span>
                </div>
                <p className="text-stone-500 leading-relaxed text-sm">
                   Seu guia diário para uma vida equilibrada.
                </p>
                <div className="flex space-x-4">
                   {socialLinks.slice(0,3).map((social) => (
                      <a key={social.name} href="#" className="text-stone-400 hover:text-emerald-600 transition-colors">
                         <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d={social.d} /></svg>
                      </a>
                   ))}
                </div>
              </div>

              {/* Col 2 */}
              <div>
                 <h4 className="text-stone-900 font-bold font-serif text-lg mb-6">Institucional</h4>
                 <ul className="space-y-3 text-sm text-stone-600">
                    <li><button onClick={() => navigateTo('about')} className="hover:text-emerald-600 transition-colors">Sobre Nós</button></li>
                    <li><button onClick={() => navigateTo('team')} className="hover:text-emerald-600 transition-colors">Nossa Equipe</button></li>
                    <li><button onClick={() => navigateTo('careers')} className="hover:text-emerald-600 transition-colors">Carreiras</button></li>
                 </ul>
              </div>

              {/* Col 3 */}
              <div>
                 <h4 className="text-stone-900 font-bold font-serif text-lg mb-6">Categorias</h4>
                 <ul className="space-y-3 text-sm text-stone-600">
                    <li><button onClick={() => navigateToCategory('Nutrição')} className="hover:text-emerald-600 transition-colors">Nutrição</button></li>
                    <li><button onClick={() => navigateToCategory('Fitness')} className="hover:text-emerald-600 transition-colors">Fitness</button></li>
                    <li><button onClick={() => navigateToCategory('Bem-Estar')} className="hover:text-emerald-600 transition-colors">Bem-Estar</button></li>
                 </ul>
              </div>

              {/* Col 4 */}
              <div>
                 <h4 className="text-stone-900 font-bold font-serif text-lg mb-6">Redação</h4>
                 <p className="text-sm text-stone-600 mb-4">Acesso exclusivo para autores e editores.</p>
                 <button onClick={() => navigateTo('admin-login')} className="text-sm font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-2">
                    Área do Colaborador
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                 </button>
              </div>

           </div>

           <div className="border-t border-stone-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-400">
              <p>© 2026 Lifeday Saúde. Todos os direitos reservados.</p>
           </div>
        </div>
      </footer>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-stone-900 text-white p-3 rounded-full shadow-xl hover:bg-emerald-600 z-50 transition-all duration-300 ease-in-out transform hover:-translate-y-1
          ${showScrollToTopButton ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}
        `}
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default App;
