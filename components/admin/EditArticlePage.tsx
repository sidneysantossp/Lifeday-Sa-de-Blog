
import React, { useState, useEffect, useRef } from 'react';
import Button from '../Button';
import { categories } from '../data';
import { ArticleData } from '../types';
import { GoogleGenAI } from "@google/genai";

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

  // FAQ Handlers
  const handleAddFaq = () => {
    if (!newFaq.question.trim() || !newFaq.answer.trim()) return;
    setFormData(prev => ({
        ...prev,
        faq: [...(prev.faq || []), newFaq]
    }));
    setNewFaq({ question: '', answer: '' });
  };

  const handleRemoveFaq = (index: number) => {
      setFormData(prev => ({
          ...prev,
          faq: prev.faq?.filter((_, i) => i !== index)
      }));
  };

  // Reference Handlers
  const handleAddReference = () => {
      if (!newReference.trim()) return;
      setFormData(prev => ({
          ...prev,
          references: [...(prev.references || []), newReference]
      }));
      setNewReference('');
  };

  const handleRemoveReference = (index: number) => {
      setFormData(prev => ({
          ...prev,
          references: prev.references?.filter((_, i) => i !== index)
      }));
  };

  // Image Drag & Drop Logic
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileProcess(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleFileProcess = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setFormData(prev => ({ ...prev, imageUrl: e.target!.result as string }));
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Por favor, selecione um arquivo de imagem válido.');
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, imageUrl: '' }));
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  // Google Gemini Image Generation
  const handleGenerateAIImage = async () => {
    if (!process.env.API_KEY) {
        alert("Erro: API_KEY não encontrada. Verifique suas variáveis de ambiente.");
        return;
    }

    if (!formData.title) {
        alert("Por favor, adicione um Título ao artigo antes de gerar a imagem para que ela seja relevante.");
        return;
    }

    setIsGeneratingImage(true);
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // Construct a highly specific prompt based on the title
        const prompt = `A professional, high-quality, editorial photograph for a health blog article titled "${formData.title}".
        Context/Description: ${formData.description || 'Health, wellness, nutrition, and lifestyle'}.
        Visual Style: Bright, natural lighting, minimalist, photorealistic, 4k resolution.
        IMPORTANT: Do not include any text, words, or logos in the image.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: prompt }]
            },
            config: {
                imageConfig: {
                    numberOfImages: 1,
                    aspectRatio: "16:9" 
                }
            }
        });

        if (response.candidates && response.candidates[0].content.parts) {
            for (const part of response.candidates[0].content.parts) {
                // Iterate parts to find the image blob
                if (part.inlineData) {
                    const base64String = part.inlineData.data;
                    const mimeType = part.inlineData.mimeType || 'image/png';
                    const imageUrl = `data:${mimeType};base64,${base64String}`;
                    
                    setFormData(prev => ({ ...prev, imageUrl: imageUrl }));
                    break; // Stop after finding the first image
                }
            }
        }
    } catch (error) {
        console.error("Erro ao gerar imagem com IA:", error);
        alert("Não foi possível gerar a imagem. Verifique o console ou tente novamente.");
    } finally {
        setIsGeneratingImage(false);
    }
  };

  // Simulate AI Generation for SEO
  const handleGenerateSEO = () => {
    setIsGeneratingSEO(true);
    setTimeout(() => {
      const generatedTitle = formData.title 
        ? `${formData.title} | Guia Completo e Atualizado ${new Date().getFullYear()}`
        : 'Título Otimizado para SEO (45-65 chars)';
      
      const generatedDesc = formData.description
        ? `Descubra tudo sobre ${formData.title}. ${formData.description.substring(0, 80)}... Leia agora nossa análise completa baseada em evidências científicas.`
        : 'Meta description otimizada para clique (CTR) e snippets (150-160 chars).';

      setFormData(prev => ({
        ...prev,
        seoTitle: generatedTitle.substring(0, 65),
        seoDescription: generatedDesc.substring(0, 160)
      }));
      setIsGeneratingSEO(false);
    }, 1500);
  };

  // Helper function to generate bulk filler text for length simulation
  const generateFillerParagraphs = (count: number) => {
      const texts = [
          "Além disso, estudos recentes publicados em revistas de alto impacto sugerem que a consistência é mais importante que a intensidade inicial. Na prática clínica, observamos que pacientes que adotam pequenas mudanças graduais tendem a manter os resultados por muito mais tempo do que aqueles que buscam soluções radicais.",
          "É fundamental compreender a fisiologia por trás deste processo. Quando analisamos os marcadores biológicos, percebemos uma clara correlação entre o estilo de vida e a resposta inflamatória do organismo. Isso reforça a tese de que intervenções multifatoriais são as mais eficazes.",
          "Outro ponto crucial é a individualidade biológica. O que funciona para um indivíduo pode não ser ideal para outro. Por isso, recomendamos sempre uma abordagem personalizada, levando em conta histórico familiar, rotina e preferências pessoais.",
          "Do ponto de vista técnico, é importante destacar os mecanismos de ação envolvidos. A literatura científica aponta para três vias metabólicas principais que são ativadas durante este processo, resultando em adaptações crônicas benéficas para a saúde a longo prazo."
      ];
      let output = "";
      for (let i = 0; i < count; i++) {
          output += `<p>${texts[i % texts.length]} ${texts[(i + 1) % texts.length]}</p>`;
      }
      return output;
  };

  // Simulate AI Generation for Content following E-E-A-T guidelines (LONG FORM 2500+ words structure)
  const handleGenerateContent = () => {
    setIsGeneratingContent(true);
    setTimeout(() => {
        const title = formData.title || "O Tópico Principal";
        
        // Structure for a Pillar Page (2500-3000 words logic)
        const templateContent = `
<div class="article-intro">
  <p><strong>${title}</strong> é [Definição direta para Featured Snippet: ex: uma condição caracterizada por... ou uma prática que consiste em...]. Embora pareça complexo à primeira vista, entender seus fundamentos é essencial para [Benefício Principal].</p>
  <p>Nos últimos anos, temos visto um aumento significativo no interesse por este tema, impulsionado por novas descobertas científicas que validam o que muitos especialistas já suspeitavam: [Afirmação de Contexto].</p>
  <p>Neste guia completo e atualizado, abordaremos desde os conceitos básicos até as estratégias avançadas, baseando-nos em evidências recentes e em nossa experiência clínica de mais de [X] anos na área.</p>
</div>

<h2>1. O que é e Como Funciona: A Ciência por Trás</h2>
<p>Para compreender verdadeiramente o impacto de ${title}, precisamos olhar para o nível celular. Diferente de abordagens superficiais, aqui tratamos da causa raiz.</p>
${generateFillerParagraphs(3)}

<h3>Mecanismos Biológicos Principais</h3>
<p>A atuação ocorre através de vias específicas:</p>
<ul>
  <li><strong>Via Metabólica A:</strong> Responsável pela regulação de [X], impactando diretamente nos níveis de energia.</li>
  <li><strong>Modulação Hormonal:</strong> Estudos mostram que há uma otimização na secreção de cortisol e insulina.</li>
  <li><strong>Resposta Anti-inflamatória:</strong> Redução sistemática de citocinas pró-inflamatórias (IL-6, TNF-alpha).</li>
</ul>
${generateFillerParagraphs(2)}

<blockquote>
  "Em nossa prática, observamos que entender o 'porquê' antes do 'como' aumenta a adesão ao tratamento em 60%."
  <cite>- Nota do Especialista</cite>
</blockquote>

<h2>2. Benefícios Comprovados pela Ciência</h2>
<p>Não se trata apenas de 'sentir-se bem'. Os dados são claros quanto aos benefícios tangíveis.</p>
${generateFillerParagraphs(4)}

<h3>Tabela Comparativa: Curto vs. Longo Prazo</h3>
<div class="overflow-x-auto my-8">
  <table class="w-full text-left border-collapse border border-stone-200">
    <thead>
      <tr class="bg-stone-100">
        <th class="p-3 border border-stone-200">Período</th>
        <th class="p-3 border border-stone-200">Mudanças Fisiológicas</th>
        <th class="p-3 border border-stone-200">Impacto na Rotina</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="p-3 border border-stone-200 font-bold">1-4 Semanas</td>
        <td class="p-3 border border-stone-200">Adaptação neural, redução de retenção hídrica.</td>
        <td class="p-3 border border-stone-200">Melhora no sono e disposição matinal.</td>
      </tr>
      <tr>
        <td class="p-3 border border-stone-200 font-bold">1-3 Meses</td>
        <td class="p-3 border border-stone-200">Aumento da sensibilidade à insulina, biogênese mitocondrial.</td>
        <td class="p-3 border border-stone-200">Redução de medidas, estabilidade emocional.</td>
      </tr>
      <tr>
        <td class="p-3 border border-stone-200 font-bold">6+ Meses</td>
        <td class="p-3 border border-stone-200">Remodelamento tecidual, otimização imunológica.</td>
        <td class="p-3 border border-stone-200">Novo padrão basal de saúde (homeostase).</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>3. Diagnóstico e Avaliação Inicial</h2>
<p>Antes de iniciar qualquer protocolo relacionado a ${title}, uma avaliação criteriosa é indispensável.</p>
${generateFillerParagraphs(3)}

<h3>Sinais de Alerta (Red Flags)</h3>
<p>Fique atento a estes sintomas que podem indicar a necessidade de intervenção imediata:</p>
<ul>
  <li>Fadiga crônica que não melhora com repouso.</li>
  <li>Alterações bruscas de peso sem mudança na dieta.</li>
  <li>Dores articulares persistentes e migratórias.</li>
</ul>
${generateFillerParagraphs(2)}

<h2>4. Guia Prático: Passo a Passo para Implementação</h2>
<p>Chegamos à parte prática. Como aplicar todo esse conhecimento no seu dia a dia de forma sustentável?</p>
<p><em>Experiência Clínica: Vimos muitos pacientes falharem por tentarem fazer tudo de uma vez. A chave é a progressão.</em></p>

<h3>Fase 1: Preparação (Semanas 1-2)</h3>
<p>O foco aqui é preparar o terreno. Não tente mudar sua vida inteira na segunda-feira.</p>
${generateFillerParagraphs(2)}

<h3>Fase 2: Execução Ativa (Semanas 3-6)</h3>
<p>Agora que a base está sólida, introduzimos os estímulos específicos.</p>
${generateFillerParagraphs(3)}

<h3>Fase 3: Consolidação (Semana 7 em diante)</h3>
<p>Transformando a prática em hábito inconsciente.</p>
${generateFillerParagraphs(2)}

<h2>5. Erros Comuns e Como Evitá-los</h2>
<p>Mesmo com boa intenção, é fácil cometer erros que sabotam os resultados. Baseado em centenas de casos, listamos os principais tropeços.</p>

<h3>Erro #1: Imediatismo</h3>
<p>Esperar resultados lineares é a receita para a frustração. A biologia trabalha em ciclos, não em linhas retas.</p>
${generateFillerParagraphs(1)}

<h3>Erro #2: Negligenciar o Sono</h3>
<p>Nenhuma estratégia compensa uma noite mal dormida. O sono é onde a mágica da regeneração acontece.</p>
${generateFillerParagraphs(1)}

<h3>Erro #3: Suplementação antes da Base</h3>
<p>Muitos buscam a "pílula mágica" sem antes corrigir a alimentação e o manejo de estresse.</p>
${generateFillerParagraphs(2)}

<h2>6. Estudos de Caso e Evidências Reais</h2>
<p>Para ilustrar a eficácia desta abordagem, analisamos o estudo de coorte publicado em [Ano] que acompanhou [N] participantes.</p>
${generateFillerParagraphs(3)}

<h2>Perguntas Frequentes (FAQ)</h2>
<div class="faq-section">
  <h3>Existe contraindicação para idosos?</h3>
  <p class="article-faq-answer">De modo geral, não. Porém, a intensidade e o volume devem ser ajustados conforme a capacidade funcional individual (Princípio da Individualidade).</p>
  
  <h3>Quanto tempo até ver resultados definitivos?</h3>
  <p class="article-faq-answer">Embora benefícios subjetivos surjam em dias, mudanças estruturais e metabólicas profundas levam de 8 a 12 semanas para se consolidarem.</p>

  <h3>Posso combinar com outras terapias?</h3>
  <p class="article-faq-answer">Sim, esta abordagem é altamente sinérgica com práticas como meditação, yoga e treinamento de força.</p>
</div>

<hr />
<p><em>Este conteúdo foi elaborado com rigor técnico e revisado clinicamente em [Data Atual], seguindo as diretrizes de qualidade E-E-A-T (Experiência, Especialização, Autoridade e Confiança). As informações aqui contidas não substituem consulta médica.</em></p>
`;
        setFormData(prev => ({
            ...prev,
            content: templateContent
        }));
        setIsGeneratingContent(false);
    }, 2500); // Slightly longer delay to simulate "thinking" for long content
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto pb-20">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <button 
            onClick={() => onNavigate('admin-articles')}
            className="text-stone-500 hover:text-stone-800 text-sm flex items-center gap-1 mb-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            Voltar para Artigos
          </button>
          <h1 className="text-2xl font-serif font-bold text-stone-900">
            {articleId ? 'Editar Artigo' : 'Novo Artigo'}
          </h1>
        </div>
        <div className="flex gap-3">
           <Button variant="ghost" onClick={() => onNavigate('admin-articles')}>Cancelar</Button>
           <Button variant="primary" onClick={handleSave} disabled={isLoading}>
             {isLoading ? 'Salvando...' : 'Salvar Alterações'}
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Title & Description Panel */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 space-y-4">
             <div>
               <label className="block text-sm font-bold text-stone-800 mb-1">Título do Artigo</label>
               <input 
                 type="text" 
                 name="title"
                 value={formData.title}
                 onChange={handleChange}
                 className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-stone-900 font-serif text-lg bg-white placeholder-stone-400"
                 placeholder="Digite um título cativante..."
               />
             </div>
             
             <div>
               <label className="block text-sm font-bold text-stone-800 mb-1">Resumo (Descrição)</label>
               <textarea 
                 name="description"
                 value={formData.description}
                 onChange={handleChange}
                 rows={3}
                 className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-stone-700 resize-none bg-white placeholder-stone-400"
                 placeholder="Um breve resumo que aparecerá nos cards..."
               />
             </div>
          </div>

          {/* SEO Metadata Panel */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                <svg className="w-24 h-24 text-emerald-900" fill="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             </div>

             <div className="flex justify-between items-center mb-4 border-b border-stone-100 pb-2">
                 <h3 className="font-bold text-stone-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    Otimização SEO (Google)
                 </h3>
                 <button 
                    onClick={handleGenerateSEO}
                    disabled={isGeneratingSEO}
                    className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-full transition-colors border border-emerald-200"
                 >
                    {isGeneratingSEO ? (
                        <>
                           <svg className="animate-spin h-3 w-3 text-emerald-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                           Otimizando...
                        </>
                    ) : (
                        <>
                           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                           Gerar com IA
                        </>
                    )}
                 </button>
             </div>

             <div className="space-y-4 relative z-10">
                <div>
                   <div className="flex justify-between mb-1">
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider">Meta Title (45-65 chars)</label>
                      <span className={`text-xs ${(formData.seoTitle?.length || 0) > 65 ? 'text-red-500' : 'text-stone-400'}`}>
                         {formData.seoTitle?.length || 0}/65
                      </span>
                   </div>
                   <input 
                     type="text" 
                     name="seoTitle"
                     value={formData.seoTitle || ''}
                     onChange={handleChange}
                     className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-emerald-500 outline-none text-sm bg-white text-stone-900 placeholder-stone-400"
                     placeholder="Título otimizado para a SERP..."
                   />
                </div>
                
                <div>
                   <div className="flex justify-between mb-1">
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider">Meta Description (150-160 chars)</label>
                      <span className={`text-xs ${(formData.seoDescription?.length || 0) > 160 ? 'text-red-500' : 'text-stone-400'}`}>
                         {formData.seoDescription?.length || 0}/160
                      </span>
                   </div>
                   <textarea 
                     name="seoDescription"
                     value={formData.seoDescription || ''}
                     onChange={handleChange}
                     rows={2}
                     className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-emerald-500 outline-none text-sm resize-none bg-white text-stone-900 placeholder-stone-400"
                     placeholder="Descrição atrativa para aumentar o CTR..."
                   />
                </div>
             </div>
          </div>

          {/* Editor Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden flex flex-col min-h-[800px]">
             <div className="border-b border-stone-200 bg-stone-50 px-4 py-2 flex items-center justify-between sticky top-0 z-20">
                <div className="flex gap-2">
                    <button 
                    onClick={() => setActiveTab('write')}
                    className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${activeTab === 'write' ? 'bg-white text-emerald-700 shadow-sm border border-stone-200' : 'text-stone-500 hover:text-stone-800'}`}
                    >
                    Escrever
                    </button>
                    <button 
                    onClick={() => setActiveTab('preview')}
                    className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${activeTab === 'preview' ? 'bg-white text-emerald-700 shadow-sm border border-stone-200' : 'text-stone-500 hover:text-stone-800'}`}
                    >
                    Visualizar
                    </button>
                </div>

                {activeTab === 'write' && (
                    <button 
                        onClick={handleGenerateContent}
                        disabled={isGeneratingContent}
                        className="flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors bg-white px-3 py-1.5 rounded-md border border-stone-200 shadow-sm hover:shadow-md"
                        title="Gerar estrutura 'Pillar Page' (2500+ palavras)"
                    >
                         {isGeneratingContent ? (
                             <svg className="animate-spin h-3 w-3 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                         ) : (
                             <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                         )}
                        IA Writer (Long Form)
                    </button>
                )}
             </div>

             <div className="flex-1 p-0 bg-white relative">
               {activeTab === 'write' ? (
                 <textarea 
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className="w-full h-full p-6 outline-none text-stone-800 font-mono text-sm resize-none bg-white placeholder-stone-300 leading-relaxed"
                    placeholder="Comece a escrever ou use o botão 'IA Writer' para gerar um artigo completo de 3000 palavras..."
                 />
               ) : (
                 <div className="h-full overflow-y-auto bg-white p-8">
                    {/* Rendered exactly like the ArticlePage frontend */}
                    <div 
                      className="prose prose-stone prose-base md:prose-lg max-w-none 
                      prose-headings:font-serif prose-headings:text-stone-900 
                      prose-p:text-stone-600 prose-p:leading-relaxed 
                      prose-a:text-emerald-700 prose-a:font-medium hover:prose-a:text-emerald-800
                      prose-blockquote:border-l-emerald-500 prose-blockquote:bg-white prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:italic
                      prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8
                      prose-th:bg-stone-100 prose-th:p-4 prose-td:p-4 prose-table:border prose-table:border-stone-200 prose-table:rounded-lg prose-table:overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: formData.content || '<p class="text-stone-400 italic">Nada para visualizar ainda.</p>' }} 
                    />
                 </div>
               )}
             </div>
          </div>

          {/* FAQ Manager (Schema) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
             <div className="flex justify-between items-center mb-6 border-b border-stone-100 pb-2">
                 <h3 className="font-bold text-stone-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Perguntas Frequentes (Schema FAQPage)
                 </h3>
             </div>

             <div className="space-y-4">
                 {/* List of existing FAQs */}
                 {formData.faq && formData.faq.length > 0 && (
                     <div className="space-y-3 mb-6">
                        {formData.faq.map((item, index) => (
                             <div key={index} className="group relative bg-stone-50 p-4 rounded-lg border border-stone-200">
                                 <h4 className="text-sm font-bold text-stone-800 mb-1 pr-8">{item.question}</h4>
                                 <p className="text-xs text-stone-600 line-clamp-2">{item.answer}</p>
                                 <button 
                                    onClick={() => handleRemoveFaq(index)}
                                    className="absolute top-2 right-2 text-stone-400 hover:text-red-500 transition-colors p-1"
                                    title="Remover pergunta"
                                 >
                                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                 </button>
                             </div>
                        ))}
                     </div>
                 )}

                 {/* Add New FAQ Form */}
                 <div className="bg-stone-50/50 p-4 rounded-lg border border-stone-200 border-dashed">
                    <p className="text-xs font-bold text-stone-500 uppercase mb-3">Adicionar Nova Pergunta</p>
                    <div className="space-y-3">
                        <input 
                            type="text" 
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-emerald-500 outline-none text-sm bg-white text-stone-900 placeholder-stone-400"
                            placeholder="Pergunta (ex: Quanto tempo dura?)"
                            value={newFaq.question}
                            onChange={(e) => setNewFaq({...newFaq, question: e.target.value})}
                        />
                        <textarea 
                            rows={2}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-emerald-500 outline-none text-sm resize-none bg-white text-stone-900 placeholder-stone-400"
                            placeholder="Resposta objetiva..."
                            value={newFaq.answer}
                            onChange={(e) => setNewFaq({...newFaq, answer: e.target.value})}
                        />
                        <div className="flex justify-end">
                            <Button variant="outline" onClick={handleAddFaq} className="!py-1.5 !px-3 !text-xs !bg-white">
                                + Adicionar à Lista
                            </Button>
                        </div>
                    </div>
                 </div>
             </div>
          </div>

        </div>

        {/* Sidebar Settings Column */}
        <div className="space-y-6">
           
           {/* Publication Card */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 space-y-4">
              <h3 className="font-bold text-stone-900 border-b border-stone-100 pb-2">Publicação</h3>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Categoria</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-emerald-500 outline-none bg-white text-stone-900"
                >
                  <option value="">Selecione...</option>
                  {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Autor</label>
                <input 
                  type="text" 
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-emerald-500 outline-none bg-white text-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Data</label>
                    <input 
                      type="text" 
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-emerald-500 outline-none text-sm bg-white text-stone-900"
                      placeholder="DD MMM"
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Leitura</label>
                    <input 
                      type="text" 
                      name="readTime"
                      value={formData.readTime}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-emerald-500 outline-none text-sm bg-white text-stone-900"
                      placeholder="Ex: 5 min"
                    />
                 </div>
              </div>
           </div>

            {/* E-E-A-T & Credibility Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 space-y-4">
                <h3 className="font-bold text-stone-900 border-b border-stone-100 pb-2 flex items-center gap-2" title="Experience, Expertise, Authoritativeness, Trust">
                   <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   E-E-A-T & Credibilidade
                </h3>

                <div>
                   <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Cargo / Especialidade</label>
                   <input 
                     type="text" 
                     name="authorRole"
                     value={formData.authorRole || ''}
                     onChange={handleChange}
                     className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-emerald-500 outline-none text-sm bg-white text-stone-900"
                     placeholder="Ex: Nutricionista PhD"
                   />
                </div>

                <div>
                   <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Revisão Clínica (Trust)</label>
                   <input 
                     type="text" 
                     name="reviewedBy"
                     value={formData.reviewedBy || ''}
                     onChange={handleChange}
                     className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-emerald-500 outline-none text-sm bg-white text-stone-900"
                     placeholder="Ex: Dr. Nome (CRM 1234)"
                   />
                </div>

                <div>
                   <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Fontes & Referências (Authority)</label>
                   
                   {/* References List */}
                   {formData.references && formData.references.length > 0 && (
                       <ul className="mb-3 space-y-2">
                           {formData.references.map((ref, idx) => (
                               <li key={idx} className="flex items-start justify-between text-xs bg-stone-50 p-2 rounded border border-stone-100">
                                   <span className="text-stone-600 break-all pr-2">{ref}</span>
                                   <button onClick={() => handleRemoveReference(idx)} className="text-red-400 hover:text-red-600">
                                       x
                                   </button>
                               </li>
                           ))}
                       </ul>
                   )}

                   <div className="flex gap-2">
                       <input 
                         type="text" 
                         value={newReference}
                         onChange={(e) => setNewReference(e.target.value)}
                         className="flex-1 px-2 py-1.5 rounded border border-stone-300 focus:ring-emerald-500 outline-none text-xs bg-white text-stone-900"
                         placeholder="URL ou Citação..."
                       />
                       <button 
                         onClick={handleAddReference}
                         className="bg-stone-100 hover:bg-stone-200 text-stone-600 px-3 py-1 rounded text-xs font-bold border border-stone-200"
                       >
                         +
                       </button>
                   </div>
                </div>
            </div>

           {/* Media Card */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 space-y-4">
              <h3 className="font-bold text-stone-900 border-b border-stone-100 pb-2">Imagem de Capa</h3>
              
              <div className="flex gap-2">
                <input 
                  type="text" 
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 rounded-lg border border-stone-300 focus:ring-emerald-500 outline-none text-xs text-stone-900 bg-white"
                  placeholder="URL..."
                />
                <button 
                    onClick={handleGenerateAIImage} 
                    disabled={isGeneratingImage} 
                    className={`bg-emerald-50 text-emerald-600 px-3 py-2 rounded-lg border border-emerald-200 transition-colors flex items-center gap-1.5 shadow-sm hover:shadow ${isGeneratingImage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-100'}`}
                    title="Gerar imagem via Gemini baseada no Título"
                >
                    {isGeneratingImage ? (
                        <svg className="animate-spin h-4 w-4 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            <span className="text-xs font-bold">IA</span>
                        </>
                    )}
                </button>
              </div>

              {/* Drag and Drop Zone */}
              <div 
                className={`aspect-video rounded-lg border-2 relative overflow-hidden flex items-center justify-center transition-all ${isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-stone-300 border-dashed bg-stone-50/50'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                  {formData.imageUrl ? (
                      <>
                        <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button onClick={handleRemoveImage} className="bg-white text-red-500 rounded-full p-2 shadow-lg hover:bg-red-50 transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                      </>
                  ) : (
                      <div className="text-center p-4">
                          <svg className="mx-auto h-8 w-8 text-stone-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          <p className="text-xs text-stone-500 font-medium">Arraste ou clique para selecionar</p>
                          <input 
                            type="file" 
                            ref={fileInputRef}
                            onChange={handleFileInput}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept="image/*"
                          />
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
