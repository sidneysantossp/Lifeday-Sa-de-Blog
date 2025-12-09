
import React, { useEffect, useState } from 'react';
import Button from './Button';
import ArticleCard from './ArticleCard';
import { ArticleData } from './types';

interface ArticlePageProps {
  articleId: string;
  onNavigate: (page: string) => void;
  onNavigateToCategory: (category: string) => void;
  articles: ArticleData[]; // Recebe a lista atualizada
}

interface Comment {
  id: number;
  name: string;
  date: string;
  text: string;
  rating?: number;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ articleId, onNavigate, onNavigateToCategory, articles }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Comment System State
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, name: "Fernanda Oliveira", date: "2 horas atrás", text: "Excelente artigo! Muito esclarecedor, especialmente a parte sobre os equipamentos.", rating: 5 },
    { id: 2, name: "Ricardo Santos", date: "5 horas atrás", text: "Estava precisando ler isso. Vou começar a aplicar a regra dos 3 P's hoje mesmo.", rating: 5 }
  ]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [formError, setFormError] = useState('');

  // Find article from props instead of static file
  const article = articles.find(a => a.id === articleId);

  // Handle Scroll Progress for better UX
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
      setScrollProgress(Number(scroll));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 pb-20">
         <div className="text-center">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Artigo não encontrado</h2>
            <Button onClick={() => onNavigate('home')}>Voltar para Início</Button>
         </div>
      </div>
    );
  }

  // Related Articles Logic
  const relatedArticles = articles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  // STRUCTURED DATA (JSON-LD) CONSTRUCTION
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "image": [article.imageUrl],
    "datePublished": "2024-01-15T08:00:00+08:00", 
    "dateModified": article.lastModified ? "2024-01-20T08:00:00+08:00" : undefined,
    "author": [{
      "@type": "Person",
      "name": article.author,
      "jobTitle": article.authorRole || "Redator",
      "url": "https://lifedaysaude.com/equipe/" + article.author.toLowerCase().replace(' ', '-')
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Lifeday Saúde",
      "logo": {
        "@type": "ImageObject",
        "url": "https://lifedaysaude.com/logo.png" 
      }
    },
    "description": article.description,
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://lifedaysaude.com/article/${article.id}`
    },
    // Speakable specification for Voice Search
    "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".article-intro", ".article-faq-answer"]
    }
  };

  // Inject FAQPage Schema if FAQs exist
  // Using explicit type to avoid TS errors
  const jsonLd: any[] = [baseSchema];
  
  if (article.faq && article.faq.length > 0) {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": article.faq.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
      };
      jsonLd.push(faqSchema);
  }

  const handleShare = (platform: string) => {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(article.title);
      let shareUrl = '';
      if(platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      if(platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
      if(platform === 'linkedin') shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) {
      setFormError('Por favor, preencha todos os campos.');
      return;
    }

    const newCommentObj: Comment = {
      id: Date.now(),
      name: newCommentName,
      date: 'Agora mesmo',
      text: newCommentText,
      rating: 5
    };

    setComments([newCommentObj, ...comments]);
    setNewCommentName('');
    setNewCommentText('');
    setFormError('');
  };

  return (
    <article className="pt-24 pb-32 lg:pb-20 animate-in fade-in duration-500 bg-white min-h-screen">
      
      {/* Dynamic JSON-LD Injection */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-emerald-600 z-50 transition-all duration-100"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* HEADER SECTION (Semantic <header>) */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12 text-center">
        {/* Breadcrumb Navigation (Good for SEO) */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap justify-center items-center gap-2 text-xs md:text-sm text-stone-500 mb-4 md:mb-6">
           <a 
             href="/" 
             onClick={(e) => { e.preventDefault(); onNavigate('home'); }} 
             className="hover:text-emerald-600 transition-colors"
           >
             Início
           </a>
           <span className="text-stone-300">/</span>
           <a 
             href={`/category/${article.category.toLowerCase()}`} 
             onClick={(e) => { e.preventDefault(); onNavigateToCategory(article.category); }} 
             className="hover:text-emerald-600 transition-colors"
           >
             {article.category}
           </a>
           <span className="text-stone-300">/</span>
           <span className="text-stone-400 truncate max-w-[200px]">{article.title}</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight">
          {article.title}
        </h1>
        
        <div className="article-intro">
            <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto mb-8 font-light hidden sm:block">
            {article.description}
            </p>
        </div>

        {/* Author & Metadata */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 border-y border-stone-100 py-6">
           <div className="flex items-center gap-3">
             <img 
               src={article.authorAvatar || `https://ui-avatars.com/api/?name=${article.author}`} 
               alt={`Foto de ${article.author}`}
               className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-stone-200"
               loading="eager" // Above fold, keep eager
             />
             <div className="text-left">
                <div className="font-bold text-stone-900 leading-none text-sm md:text-base">{article.author}</div>
                {article.authorRole && (
                  <div className="text-[10px] md:text-xs text-emerald-600 font-medium uppercase tracking-wide mt-1">{article.authorRole}</div>
                )}
             </div>
           </div>

           <div className="hidden sm:block w-px h-8 bg-stone-200"></div>

           <div className="flex gap-6 text-xs md:text-sm text-stone-500">
              <div className="flex flex-col text-center sm:text-left">
                 <span className="text-[10px] uppercase tracking-wider text-stone-400 mb-0.5">Publicado em</span>
                 <time dateTime={article.date}>{article.date}</time>
              </div>
              {article.lastModified && (
                  <div className="flex flex-col text-center sm:text-left">
                    <span className="text-[10px] uppercase tracking-wider text-emerald-600 font-bold mb-0.5">Atualizado em</span>
                    <time dateTime={article.lastModified}>{article.lastModified}</time>
                  </div>
              )}
              <div className="flex flex-col text-center sm:text-left">
                 <span className="text-[10px] uppercase tracking-wider text-stone-400 mb-0.5">Leitura</span>
                 <span>{article.readTime}</span>
              </div>
           </div>
        </div>
      </header>

      {/* FEATURED IMAGE */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-16">
         <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-xl md:shadow-2xl shadow-stone-200/50">
           <img 
             src={article.imageUrl} 
             alt={`Imagem ilustrativa para: ${article.title}`}
             className="w-full h-full object-cover"
             loading="eager" 
             fetchPriority="high" // High priority for LCP
           />
         </div>
         <p className="text-center text-[10px] md:text-xs text-stone-400 mt-2 italic">
            Imagem meramente ilustrativa. Fonte: Unsplash.
         </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
         
         {/* SIDEBAR: Share & UX (Off-page SEO helper) - Desktop Only */}
         <aside className="hidden lg:block lg:col-span-2 relative">
            <div className="sticky top-32 flex flex-col gap-4 items-center">
               <span className="text-xs font-bold text-stone-400 uppercase rotate-180 mb-2" style={{ writingMode: 'vertical-rl' }}>Compartilhar</span>
               <button onClick={() => handleShare('facebook')} className="p-3 rounded-full bg-white border border-stone-200 text-stone-400 hover:text-blue-600 hover:border-blue-200 hover:shadow-md transition-all" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
               </button>
               <button onClick={() => handleShare('twitter')} className="p-3 rounded-full bg-white border border-stone-200 text-stone-400 hover:text-black hover:border-stone-400 hover:shadow-md transition-all" aria-label="Twitter">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
               </button>
               <button onClick={() => handleShare('linkedin')} className="p-3 rounded-full bg-white border border-stone-200 text-stone-400 hover:text-blue-700 hover:border-blue-300 hover:shadow-md transition-all" aria-label="LinkedIn">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg>
               </button>
            </div>
         </aside>

         {/* MAIN CONTENT */}
         <div className="lg:col-span-8">
            
            {/* E-E-A-T Signal: Reviewed By Box (if available) */}
            {article.reviewedBy && (
                 <div className="flex items-center gap-2 text-xs text-stone-500 mb-6 bg-stone-50 p-3 rounded-lg border border-stone-100 inline-block">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Revisado clinicamente por <strong>{article.reviewedBy}</strong></span>
                 </div>
            )}

            {/* Semantic Content Area */}
            <div 
              className="prose prose-stone prose-base md:prose-lg lg:prose-xl max-w-none 
              prose-headings:font-serif prose-headings:font-bold
              prose-h1:text-4xl prose-h1:text-stone-900
              prose-h2:text-3xl prose-h2:text-emerald-900 prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-stone-100
              prose-h3:text-2xl prose-h3:text-stone-800 prose-h3:mt-10 prose-h3:mb-4
              prose-p:text-stone-600 prose-p:leading-relaxed md:prose-p:leading-loose
              prose-a:text-emerald-700 prose-a:font-medium hover:prose-a:text-emerald-800
              prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-stone-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:italic prose-blockquote:rounded-r-lg
              prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8
              prose-th:bg-emerald-50 prose-th:text-emerald-900 prose-th:p-4 prose-td:p-4 prose-table:border prose-table:border-stone-200 prose-table:rounded-lg prose-table:overflow-hidden"
              dangerouslySetInnerHTML={{ __html: article.content || '<p>Conteúdo em atualização.</p>' }} 
            />

            {/* FAQ Section for Voice Search Optimization (Schema mapped) */}
            {article.faq && article.faq.length > 0 && (
                <div className="mt-16 pt-10 border-t border-stone-200">
                    <h2 className="text-3xl font-serif font-bold text-emerald-900 mb-8 flex items-center gap-3">
                      <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Perguntas Frequentes (FAQ)
                    </h2>
                    <div className="space-y-6">
                        {article.faq.map((item, index) => (
                            <div key={index} className="bg-stone-50 rounded-xl p-6 border border-stone-100 hover:border-emerald-100 transition-colors">
                                <h3 className="text-xl font-bold text-stone-900 mb-3">{item.question}</h3>
                                <p className="text-stone-600 text-base leading-relaxed article-faq-answer">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* E-E-A-T: References Section (Authority) */}
            {article.references && article.references.length > 0 && (
               <div className="mt-12 pt-8 border-t border-stone-200">
                  <h4 className="font-bold text-stone-900 mb-4 text-xs md:text-sm uppercase tracking-wider flex items-center gap-2">
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                     Fontes & Referências
                  </h4>
                  <ul className="space-y-2 text-xs text-stone-500 break-words">
                     {article.references.map((ref, idx) => (
                        <li key={idx} className="pl-4 border-l-2 border-stone-200">{ref}</li>
                     ))}
                  </ul>
               </div>
            )}

            {/* Medical Disclaimer (Trustworthiness) */}
            <div className="mt-8 bg-stone-50 p-4 rounded-lg text-xs text-stone-500 leading-relaxed border border-stone-200">
               <strong>Isenção de Responsabilidade Médica:</strong> O conteúdo deste site é apenas para fins informativos e educacionais. Não substitui o conselho, diagnóstico ou tratamento médico profissional. Sempre procure o conselho do seu médico ou outro profissional de saúde qualificado com qualquer dúvida que possa ter sobre uma condição médica.
            </div>

            {/* Tag Cloud */}
            <div className="mt-8 flex flex-wrap gap-2">
               {article.tags.map(tag => (
                  <button 
                     key={tag} 
                     onClick={() => onNavigateToCategory(article.category)}
                     className="px-3 py-1 bg-white border border-stone-200 rounded-full text-xs font-medium text-stone-600 hover:border-emerald-500 hover:text-emerald-700 transition-colors"
                  >
                     #{tag}
                  </button>
               ))}
            </div>

            {/* Author Bio Box (Experience) */}
            <div className="mt-12 p-6 md:p-8 bg-white border border-stone-200 rounded-2xl flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left shadow-sm">
               <img 
                  src={article.authorAvatar} 
                  alt={article.author} 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-emerald-100"
                  loading="lazy"
               />
               <div>
                  <h4 className="text-lg font-serif font-bold text-stone-900">Sobre {article.author}</h4>
                  <p className="text-emerald-600 text-xs font-bold uppercase mb-2">{article.authorRole}</p>
                  <p className="text-stone-600 text-sm leading-relaxed mb-4">
                     {article.authorBio || "Redator especializado em saúde e bem-estar, dedicado a trazer informações claras e baseadas em evidências."}
                  </p>
                  <Button variant="outline" className="!py-2 !px-4 !text-xs">Ver todos os artigos</Button>
               </div>
            </div>

            {/* COMMENTS SECTION */}
            <div className="mt-16 pt-10 border-t border-stone-200">
              <h3 className="text-2xl font-serif font-bold text-stone-900 mb-8">Comentários ({comments.length})</h3>

              {/* Comment Form */}
              <div className="bg-stone-50 rounded-2xl p-6 md:p-8 mb-10 border border-stone-100">
                <h4 className="text-lg font-bold text-stone-900 mb-4">Deixe seu comentário</h4>
                <form onSubmit={handlePostComment} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Seu nome"
                      value={newCommentName}
                      onChange={(e) => setNewCommentName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm bg-white"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Sua mensagem..."
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm bg-white resize-none"
                    />
                  </div>
                  {formError && <p className="text-red-500 text-xs font-medium">{formError}</p>}
                  <div className="flex justify-end">
                    <Button type="submit" variant="primary" className="!px-6 !py-2.5">Publicar Comentário</Button>
                  </div>
                </form>
              </div>

              {/* Comments List */}
              <div className="space-y-8">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 font-bold text-lg border-2 border-white shadow-sm">
                      {comment.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between mb-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                           <h5 className="font-bold text-stone-900 text-sm md:text-base">{comment.name}</h5>
                           {/* Star Ratings */}
                           <div className="flex text-yellow-400 gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-3 h-3" fill={i < (comment.rating || 5) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={i < (comment.rating || 5) ? 0 : 2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                              ))}
                           </div>
                        </div>
                        <span className="text-xs text-stone-400">{comment.date}</span>
                      </div>
                      <p className="text-stone-600 text-sm leading-relaxed">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

         </div>

         {/* RIGHT SIDEBAR (Desktop) */}
         <div className="lg:col-span-2">
            {/* Space for future widgets */}
         </div>

      </div>

      {/* MOBILE SHARE STICKY BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-6 py-3 flex justify-between items-center lg:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">Compartilhar</span>
        <div className="flex gap-5">
           <button onClick={() => handleShare('facebook')} className="text-stone-400 hover:text-blue-600 transition-colors" aria-label="Share on Facebook">
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
           </button>
           <button onClick={() => handleShare('twitter')} className="text-stone-400 hover:text-black transition-colors" aria-label="Share on Twitter">
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
           </button>
           <button onClick={() => handleShare('linkedin')} className="text-stone-400 hover:text-blue-700 transition-colors" aria-label="Share on LinkedIn">
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg>
           </button>
        </div>
      </div>

      {/* RELATED ARTICLES (Internal Linking) */}
      <section className="bg-stone-50 py-12 md:py-16 mt-12 md:mt-20 border-t border-stone-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-serif font-bold text-stone-900 mb-8 text-center">Continue Lendo</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
               {relatedArticles.length > 0 ? (
                  relatedArticles.map(rel => (
                     <ArticleCard key={rel.id} article={rel} />
                  ))
               ) : (
                  <p className="text-center col-span-3 text-stone-500">Explore nossas categorias para mais conteúdo.</p>
               )}
            </div>
         </div>
      </section>

    </article>
  );
};

export default ArticlePage;
