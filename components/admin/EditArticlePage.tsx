
import React, { useState, useEffect, useRef } from 'react';
import Button from '../Button';
import { categories } from '../data';
import { ArticleData } from '../types';

interface EditArticlePageProps {
  articleId: string | null;
  onNavigate: (page: string) => void;
  articles: ArticleData[]; // Recebe a lista atualizada
  onSave: (article: ArticleData) => void; // Recebe a função de salvar do App.tsx
}

const EditArticlePage: React.FC<EditArticlePageProps> = ({ articleId, onNavigate, articles, onSave }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingSEO, setIsGeneratingSEO] = useState(false);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
  const [newReference, setNewReference] = useState('');

  const [formData, setFormData] = useState<Partial<ArticleData>>({
    title: '',
    description: '',
    content: '',
    category: '',
    imageUrl: '',
    author: '',
    authorRole: '',
    authorBio: '',
    reviewedBy: '',
    date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
    readTime: '5 min',
    seoTitle: '',
    seoDescription: '',
    faq: [],
    references: [],
    tags: []
  });

  // Load article data if ID is present
  useEffect(() => {
    if (articleId) {
      const foundArticle = articles.find(a => a.id === articleId);
      if (foundArticle) {
        setFormData({
            ...foundArticle,
            faq: foundArticle.faq || [],
            references: foundArticle.references || []
        });
      }
    }
  }, [articleId, articles]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsLoading(true);
    
    // Simulate delay
    setTimeout(() => {
      // Validate Basic Fields
      if (!formData.title) {
          alert("O título é obrigatório");
          setIsLoading(false);
          return;
      }

      // Construct Final Object
      const finalArticle: ArticleData = {
          id: articleId || `new-${Date.now()}`, // Generate ID if new
          category: formData.category || 'Geral',
          readTime: formData.readTime || '5 min',
          title: formData.title || 'Sem título',
          description: formData.description || '',
          imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1000',
          author: formData.author || 'Admin',
          authorRole: formData.authorRole || 'Redator',
          authorBio: formData.authorBio || '',
          date: formData.date || new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
          lastModified: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
          views: (formData as any).views || 0,
          tags: formData.tags || [],
          content: formData.content || '',
          references: formData.references || [],
          reviewedBy: formData.reviewedBy || '',
          faq: formData.faq || [],
          seoTitle: formData.seoTitle || formData.title,
          seoDescription: formData.seoDescription || formData.description,
          authorAvatar: (formData as any).authorAvatar || `https://ui-avatars.com/api/?name=${formData.author || 'Admin'}&background=random`
      };

      onSave(finalArticle); // Call parent save function
      setIsLoading(false);
    }, 800);
  };

  // ... [Rest of the handlers: FAQ, Refs, Image, AI Generation remain the same] ...
  const handleAddFaq = () => {
    if (!newFaq.question.trim() || !newFaq.answer.trim()) return;
    setFormData(prev => ({ ...prev, faq: [...(prev.faq || []), newFaq] }));
    setNewFaq({ question: '', answer: '' });
  };
  const handleRemoveFaq = (index: number) => {
      setFormData(prev => ({ ...prev, faq: prev.faq?.filter((_, i) => i !== index) }));
  };
  const handleAddReference = () => {
      if (!newReference.trim()) return;
      setFormData(prev => ({ ...prev, references: [...(prev.references || []), newReference] }));
      setNewReference('');
  };
  const handleRemoveReference = (index: number) => {
      setFormData(prev => ({ ...prev, references: prev.references?.filter((_, i) => i !== index) }));
  };
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileProcess(file);
  };
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) handleFileProcess(e.target.files[0]);
  };
  const handleFileProcess = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => { if (e.target?.result) setFormData(prev => ({ ...prev, imageUrl: e.target!.result as string })); };
      reader.readAsDataURL(file);
    } else { alert('Selecione uma imagem válida.'); }
  };
  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, imageUrl: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  const handleGenerateAIImage = () => {
    setIsGeneratingImage(true);
    setTimeout(() => {
        const randomId = Math.floor(Math.random() * 1000);
        const generatedUrl = `https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1000&random=${randomId}`;
        setFormData(prev => ({ ...prev, imageUrl: generatedUrl }));
        setIsGeneratingImage(false);
    }, 2000);
  };
  const handleGenerateSEO = () => {
    setIsGeneratingSEO(true);
    setTimeout(() => {
      const generatedTitle = formData.title ? `${formData.title} | Guia 2026` : 'Título SEO';
      const generatedDesc = formData.description ? `${formData.description.substring(0, 100)}... Leia mais.` : 'Meta Description';
      setFormData(prev => ({ ...prev, seoTitle: generatedTitle, seoDescription: generatedDesc }));
      setIsGeneratingSEO(false);
    }, 1500);
  };
  
  // Simplified for brevity, assume generateFillerParagraphs exists or copy from previous
  const generateFillerParagraphs = (count: number) => {
      return Array(count).fill("<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>").join("");
  };

  const handleGenerateContent = () => {
    setIsGeneratingContent(true);
    setTimeout(() => {
        const title = formData.title || "Artigo Gerado";
        const content = `
          <div class="article-intro"><p><strong>${title}</strong> é um tema essencial...</p></div>
          <h2>1. Introdução ao Tema</h2>
          <p>Exploração profunda sobre o assunto.</p>
          ${generateFillerParagraphs(5)}
          <h2>2. Benefícios e Ciência</h2>
          <p>O que os estudos dizem sobre isso.</p>
          ${generateFillerParagraphs(5)}
          <hr/>
          <p><em>Gerado via IA Lifeday</em></p>
        `;
        setFormData(prev => ({ ...prev, content: content }));
        setIsGeneratingContent(false);
    }, 2000);
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <button onClick={() => onNavigate('admin-articles')} className="text-stone-500 hover:text-stone-800 text-sm flex items-center gap-1 mb-2 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            Voltar para Artigos
          </button>
          <h1 className="text-2xl font-serif font-bold text-stone-900">{articleId ? 'Editar Artigo' : 'Novo Artigo'}</h1>
        </div>
        <div className="flex gap-3">
           <Button variant="ghost" onClick={() => onNavigate('admin-articles')}>Cancelar</Button>
           <Button variant="primary" onClick={handleSave} disabled={isLoading}>
             {isLoading ? 'Salvando...' : 'Salvar Alterações'}
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 space-y-4">
             <div>
               <label className="block text-sm font-bold text-stone-800 mb-1">Título</label>
               <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 outline-none text-stone-900 font-serif text-lg bg-white" placeholder="Título..." />
             </div>
             <div>
               <label className="block text-sm font-bold text-stone-800 mb-1">Resumo</label>
               <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-emerald-500 outline-none text-stone-700 bg-white" placeholder="Resumo..." />
             </div>
           </div>

           {/* Editor & Preview */}
           <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden flex flex-col min-h-[600px]">
             <div className="border-b border-stone-200 bg-stone-50 px-4 py-2 flex items-center justify-between sticky top-0 z-20">
                <div className="flex gap-2">
                    <button onClick={() => setActiveTab('write')} className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${activeTab === 'write' ? 'bg-white text-emerald-700 shadow-sm border border-stone-200' : 'text-stone-500'}`}>Escrever</button>
                    <button onClick={() => setActiveTab('preview')} className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${activeTab === 'preview' ? 'bg-white text-emerald-700 shadow-sm border border-stone-200' : 'text-stone-500'}`}>Visualizar</button>
                </div>
                {activeTab === 'write' && (
                    <button onClick={handleGenerateContent} disabled={isGeneratingContent} className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-white px-3 py-1.5 rounded-md border border-stone-200 shadow-sm">
                         {isGeneratingContent ? 'Gerando...' : 'IA Writer (Long Form)'}
                    </button>
                )}
             </div>
             <div className="flex-1 p-0 bg-white relative">
               {activeTab === 'write' ? (
                 <textarea name="content" value={formData.content} onChange={handleChange} className="w-full h-full p-6 outline-none text-stone-800 font-mono text-sm resize-none bg-white" placeholder="Escreva seu artigo em HTML..." />
               ) : (
                 <div className="h-full overflow-y-auto bg-white p-8">
                    <div className="prose prose-stone prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: formData.content || '<p>Vazio</p>' }} />
                 </div>
               )}
             </div>
           </div>
           
           {/* FAQ Section */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
               <h3 className="font-bold text-stone-900 mb-4">FAQ Schema</h3>
               {formData.faq && formData.faq.map((item, idx) => (
                   <div key={idx} className="mb-2 p-2 bg-stone-50 rounded border border-stone-100 flex justify-between">
                       <div><p className="font-bold text-xs">{item.question}</p><p className="text-xs truncate">{item.answer}</p></div>
                       <button onClick={() => handleRemoveFaq(idx)} className="text-red-500 text-xs">x</button>
                   </div>
               ))}
               <div className="mt-4 space-y-2">
                   <input className="w-full border p-2 rounded bg-white text-sm" placeholder="Pergunta" value={newFaq.question} onChange={e => setNewFaq({...newFaq, question: e.target.value})} />
                   <input className="w-full border p-2 rounded bg-white text-sm" placeholder="Resposta" value={newFaq.answer} onChange={e => setNewFaq({...newFaq, answer: e.target.value})} />
                   <Button variant="outline" onClick={handleAddFaq} className="!py-1 !px-3 text-xs">Adicionar FAQ</Button>
               </div>
           </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 space-y-4">
              <h3 className="font-bold text-stone-900 border-b pb-2">Publicação</h3>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full border p-2 rounded bg-white text-sm"><option value="">Selecione...</option>{categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}</select>
              <input type="text" name="author" value={formData.author} onChange={handleChange} className="w-full border p-2 rounded bg-white text-sm" placeholder="Autor" />
              <input type="text" name="readTime" value={formData.readTime} onChange={handleChange} className="w-full border p-2 rounded bg-white text-sm" placeholder="Tempo de Leitura" />
           </div>
           
           {/* Image Upload */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 space-y-4">
              <h3 className="font-bold text-stone-900 border-b pb-2">Imagem de Capa</h3>
              <div className="flex gap-2">
                <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="flex-1 border p-2 rounded bg-white text-xs" placeholder="URL..." />
                <button onClick={handleGenerateAIImage} disabled={isGeneratingImage} className="bg-emerald-50 text-emerald-600 p-2 rounded border border-emerald-200">{isGeneratingImage ? '...' : 'IA'}</button>
              </div>
              <div 
                className={`aspect-video rounded border-2 relative overflow-hidden flex items-center justify-center ${isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-stone-300 border-dashed'}`}
                onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
              >
                  {formData.imageUrl ? (
                      <>
                        <img src={formData.imageUrl} className="w-full h-full object-cover" />
                        <button onClick={handleRemoveImage} className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1">X</button>
                      </>
                  ) : (
                      <div className="text-center p-4">
                          <p className="text-xs text-stone-500">Arraste ou clique</p>
                          <input type="file" ref={fileInputRef} onChange={handleFileInput} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                      </div>
                  )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EditArticlePage;
