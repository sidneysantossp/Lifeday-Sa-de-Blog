

import { ArticleData } from './types';

export const categories = [
  { id: 1, name: 'Corrida', count: 12, imageUrl: 'https://images.unsplash.com/photo-1596464716127-f9a875971844?auto=format&fit=crop&q=80&w=400&h=400', description: 'Técnicas, treinos e equipamentos para corredores.' },
  { id: 2, name: 'Nutrição', count: 24, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400&h=400', description: 'Alimentação consciente para corpo e mente.' },
  { id: 3, name: 'Bem-Estar', count: 18, imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=400&h=400', description: 'Práticas diárias para uma vida mais leve.' },
  { id: 4, name: 'Suplementos', count: 8, imageUrl: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=400&h=400', description: 'Guia completo sobre suplementação segura.' },
  { id: 5, name: 'Sono', count: 15, imageUrl: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&q=80&w=400&h=400', description: 'A ciência do descanso e recuperação.' },
  { id: 6, name: 'Saúde Articular', count: 6, imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=400&h=400', description: 'Prevenção e cuidado para longevidade.' },
  { id: 7, name: 'Fitness', count: 32, imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=400&h=400', description: 'Treinos de força, mobilidade e funcional.' },
  { id: 8, name: 'Meditação', count: 10, imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400&h=400', description: 'Mindfulness e redução de estresse.' },
];

// Reutilizável para artigos genéricos
const loremContent = `
  <h2>O Ritmo da Vida Moderna</h2>
  <p>Você já se sentiu exausto mesmo após uma noite inteira de sono? A ciência da cronobiologia sugere que não estamos apenas cansados, estamos desalinhados.</p>
  <p>Texto demonstrativo para preenchimento de layout.</p>
`;

// ==========================================
// ARTIGO PILAR: CORRIDA (Otimizado E-E-A-T)
// ==========================================

const runningGuideContent = `
  <div class="article-intro">
    <p>A <strong>corrida de rua</strong> é um dos esportes mais democráticos do mundo, capaz de fortalecer o sistema cardiovascular, melhorar a saúde mental e queimar calorias eficientemente. No entanto, começar sem orientação pode levar a lesões. Neste guia, baseado em minha experiência de 10 anos treinando atletas amadores, você aprenderá o passo a passo seguro para sair do sofá e conquistar seus primeiros 5km.</p>
  </div>

  <h2>1. Benefícios da Corrida: O que muda no corpo?</h2>
  <p>Antes de amarrar o tênis, é fundamental entender a fisiologia básica. Durante a corrida, seu corpo libera endorfina e serotonina, hormônios ligados ao bem-estar. Estudos mostram que corredores regulares têm 30% menos risco de morte por doenças cardiovasculares.</p>

  <blockquote>"A consistência supera a intensidade. No consultório, vejo mais lesões por excesso de entusiasmo no primeiro mês do que por falta de treino."</blockquote>

  <h2>2. Metodologia para Iniciantes: A Regra dos 3 P's</h2>
  <p>Para quem está começando do zero, utilizo uma metodologia própria chamada <strong>Regra dos 3 P's</strong>. Ela serve para criar uma base sólida antes de pensar em velocidade.</p>
  
  <h3>Paciência (Adaptação)</h3>
  <p>Comece caminhando. Se você é sedentário, seu corpo precisa entender o novo estímulo. Intercale 1 minuto de corrida leve com 4 minutos de caminhada rápida na primeira semana.</p>
  
  <h3>Progressão (Volume)</h3>
  <p>Aumente o volume semanal em no máximo 10%. Se correu 10km no total esta semana, não ultrapasse 11km na próxima. O erro comum é dobrar a meta de uma semana para outra.</p>
  
  <h3>Percepção (Sinais do Corpo)</h3>
  <p>Escute seu corpo. Dor na "canela" (periostite) ou desconforto agudo no joelho são sinais vermelhos para parar, não para insistir. Aprenda a diferenciar desconforto muscular (bom) de dor articular (ruim).</p>

  <h2>3. Equipamentos: Onde investir seu dinheiro?</h2>
  <p>Com tantas opções tecnológicas, é fácil se perder. Abaixo, preparei uma tabela comparativa para ajudar você a priorizar o essencial.</p>

  <div class="overflow-x-auto my-8">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr>
          <th class="p-4 bg-stone-100 font-bold border-b border-stone-200 text-stone-900">Item</th>
          <th class="p-4 bg-stone-100 font-bold border-b border-stone-200 text-stone-900">Prioridade</th>
          <th class="p-4 bg-stone-100 font-bold border-b border-stone-200 text-stone-900">O que buscar</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="p-4 border-b border-stone-100 font-medium">Tênis de Corrida</td>
          <td class="p-4 border-b border-stone-100 text-emerald-600 font-bold">Alta</td>
          <td class="p-4 border-b border-stone-100">Amortecimento e um número maior que o casual.</td>
        </tr>
        <tr>
          <td class="p-4 border-b border-stone-100 font-medium">Meias Técnicas</td>
          <td class="p-4 border-b border-stone-100 text-yellow-600 font-bold">Média</td>
          <td class="p-4 border-b border-stone-100">Poliamida (sintética). Evite algodão (causa bolhas).</td>
        </tr>
        <tr>
          <td class="p-4 border-b border-stone-100 font-medium">Relógio GPS</td>
          <td class="p-4 border-b border-stone-100 text-stone-400 font-bold">Baixa</td>
          <td class="p-4 border-b border-stone-100">Opcional no início. Use apps de celular.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>4. Planilha de Treino: Rumo aos 5km</h2>
  <p>Esta progressão de 4 semanas foi desenhada para criar resistência aeróbica sem sobrecarregar as articulações. Respeite os dias de descanso.</p>

  <div class="overflow-x-auto my-8">
    <table class="w-full text-left border-collapse border border-stone-200 rounded-lg">
      <thead class="bg-emerald-50">
        <tr>
           <th class="p-3 font-bold text-emerald-800 border-b border-emerald-100">Semana</th>
           <th class="p-3 font-bold text-emerald-800 border-b border-emerald-100">Frequência</th>
           <th class="p-3 font-bold text-emerald-800 border-b border-emerald-100">Treino (Repetir 3x)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
           <td class="p-3 border-b border-stone-100 font-bold">Semana 1</td>
           <td class="p-3 border-b border-stone-100">3x na semana</td>
           <td class="p-3 border-b border-stone-100">20 min total (2' caminha / 1' trote)</td>
        </tr>
        <tr>
           <td class="p-3 border-b border-stone-100 font-bold">Semana 2</td>
           <td class="p-3 border-b border-stone-100">3x na semana</td>
           <td class="p-3 border-b border-stone-100">24 min total (2' caminha / 2' trote)</td>
        </tr>
        <tr>
           <td class="p-3 border-b border-stone-100 font-bold">Semana 3</td>
           <td class="p-3 border-b border-stone-100">3x na semana</td>
           <td class="p-3 border-b border-stone-100">28 min total (1' caminha / 3' trote)</td>
        </tr>
        <tr>
           <td class="p-3 border-b border-stone-100 font-bold">Semana 4</td>
           <td class="p-3 border-b border-stone-100">3x na semana</td>
           <td class="p-3 border-b border-stone-100">30 min total (1' caminha / 4' trote)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>5. Segurança: Quando parar de correr?</h2>
  <p>A corrida deve ser desafiadora, mas nunca dolorosa ao ponto de impedir movimentos naturais.</p>
  
  <h3>Dores "Normais" (Fadiga)</h3>
  <p>Sensação de queimação muscular durante o esforço ou dor muscular difusa no dia seguinte. Melhora com movimento leve.</p>

  <h3>Sinais de Alerta (Lesão)</h3>
  <ul>
    <li>Dor aguda e pontual (que você consegue apontar com um dedo).</li>
    <li>Dor que não passa após o aquecimento ou piora durante o treino.</li>
    <li>Tontura, falta de ar excessiva ou dor no peito.</li>
  </ul>
`;

const runningFAQ = [
    {
        question: "Quanto tempo demora para conseguir correr 5km?",
        answer: "Para um iniciante sedentário, geralmente leva de 8 a 12 semanas de treino consistente (3 vezes por semana) para completar 5km sem caminhar."
    },
    {
        question: "Qual o melhor tênis para iniciantes?",
        answer: "Não existe um 'melhor' universal, mas iniciantes devem buscar tênis com bom amortecimento (entressola de espuma) e drop médio (8-10mm) para proteger as articulações."
    },
    {
        question: "Posso correr todos os dias?",
        answer: "Não é recomendado para iniciantes. O corpo precisa de 24 a 48 horas para recuperar músculos e tendões. Comece com 3 dias alternados na semana."
    },
    {
        question: "O que comer antes de correr?",
        answer: "Consuma carboidratos de fácil digestão cerca de 30 a 60 minutos antes, como uma banana com aveia ou uma torrada com geleia. Evite fibras e gorduras em excesso."
    }
];

// ==========================================
// ARTIGO PILAR: NUTRIÇÃO ANTI-INFLAMATÓRIA (Novo)
// ==========================================

const antiInflammatoryContent = `
<div class="article-intro">
  <p>A <strong>Dieta Anti-inflamatória</strong> não é uma dieta restritiva temporária, mas um estilo de vida focado em consumir alimentos que reduzem marcadores inflamatórios no corpo, como a proteína C-reativa. Ela é indicada para prevenir doenças crônicas, melhorar a disposição e otimizar a saúde intestinal. Na prática, consiste em priorizar alimentos reais e minimizar processados.</p>
  <p>Nos últimos anos, a ciência confirmou que a inflamação crônica de baixo grau é a raiz de problemas como obesidade, diabetes tipo 2 e até depressão. Mudar o que colocamos no prato é a intervenção mais poderosa que temos.</p>
</div>

<h2>1. O Inimigo Silencioso: Inflamação Crônica</h2>
<p>Diferente da inflamação aguda (como quando você bate o dedo e ele incha), a inflamação crônica é invisível. Ela ocorre quando o sistema imunológico fica constantemente ativado devido ao estresse, toxinas e, principalmente, alimentação inadequada.</p>
<p><strong>Em minha prática clínica</strong>, observo frequentemente pacientes com exames "normais", mas que relatam fadiga extrema, inchaço e névoa mental — sintomas clássicos de um corpo inflamado.</p>

<h3>Sinais comuns de inflamação:</h3>
<ul>
  <li>Cansaço persistente mesmo após dormir.</li>
  <li>Dores articulares migratórias.</li>
  <li>Problemas digestivos (gases, distensão abdominal).</li>
  <li>Dificuldade para perder peso.</li>
</ul>

<h2>2. O Que Comer: A Lista de Ouro</h2>
<p>Não precisamos complicar. A natureza já nos fornece os antídotos mais potentes.</p>

<div class="overflow-x-auto my-8">
  <table class="w-full text-left border-collapse border border-stone-200">
    <thead>
      <tr class="bg-emerald-50">
        <th class="p-3 border border-emerald-100 text-emerald-900 font-bold">Grupo Alimentar</th>
        <th class="p-3 border border-emerald-100 text-emerald-900 font-bold">Melhores Escolhas</th>
        <th class="p-3 border border-emerald-100 text-emerald-900 font-bold">Por que funciona?</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="p-3 border border-stone-100 font-bold">Peixes Gordos</td>
        <td class="p-3 border border-stone-100">Salmão selvagem, Sardinha, Cavala</td>
        <td class="p-3 border border-stone-100">Ricos em Ômega-3 (EPA/DHA) que bloqueiam vias inflamatórias.</td>
      </tr>
      <tr>
        <td class="p-3 border border-stone-100 font-bold">Frutas Vermelhas</td>
        <td class="p-3 border border-stone-100">Mirtilo, Morango, Açaí puro</td>
        <td class="p-3 border border-stone-100">Altíssima concentração de antocianinas e antioxidantes.</td>
      </tr>
      <tr>
        <td class="p-3 border border-stone-100 font-bold">Especiarias</td>
        <td class="p-3 border border-stone-100">Cúrcuma (Açafrão), Gengibre</td>
        <td class="p-3 border border-stone-100">A curcumina é um dos anti-inflamatórios naturais mais estudados.</td>
      </tr>
      <tr>
        <td class="p-3 border border-stone-100 font-bold">Vegetais Crucíferos</td>
        <td class="p-3 border border-stone-100">Brócolis, Couve-flor, Couve</td>
        <td class="p-3 border border-stone-100">Contêm sulforafano, que auxilia na detoxificação hepática.</td>
      </tr>
    </tbody>
  </table>
</div>

<blockquote>
  "Dica Prática: Sempre adicione uma pitada de pimenta preta ao consumir cúrcuma. A piperina aumenta a absorção da curcumina em até 2000%."
  <cite>- Dra. Juliana Torres</cite>
</blockquote>

<h2>3. Alimentos para Evitar (Gatilhos)</h2>
<p>Tão importante quanto o que comer, é o que retirar. Estes são os maiores vilões pró-inflamatórios:</p>
<ul>
  <li><strong>Açúcar Refinado:</strong> Dispara picos de insulina e citocinas inflamatórias.</li>
  <li><strong>Óleos Vegetais Refinados:</strong> (Soja, milho, canola) ricos em Ômega-6 oxidado.</li>
  <li><strong>Embutidos:</strong> (Presunto, salsicha) contêm nitratos e excesso de sódio.</li>
  <li><strong>Farinhas Brancas:</strong> Alto índice glicêmico e glúten (para sensíveis).</li>
</ul>

<h2>4. Protocolo de 7 Dias: Por Onde Começar?</h2>
<p>Se você busca resultados consistentes, siga este roteiro de introdução:</p>

<h3>Passo 1: Hidratação (Dias 1-2)</h3>
<p>Aumente a ingestão de água para 35ml por kg de peso corporal. A água é o solvente onde todas as reações bioquímicas ocorrem.</p>

<h3>Passo 2: Substituição Inteligente (Dias 3-5)</h3>
<p>Troque o pão branco do café da manhã por ovos com espinafre ou um smoothie de frutas vermelhas. Elimine bebidas açucaradas.</p>

<h3>Passo 3: Jantar Leve (Dias 6-7)</h3>
<p>Faça sua última refeição pelo menos 3 horas antes de dormir para permitir que o sistema digestivo descanse e o corpo foque em reparo noturno.</p>

<h2>Perguntas Frequentes (FAQ)</h2>
<div class="faq-section">
  <h3>Em quanto tempo sinto a diferença?</h3>
  <p class="article-faq-answer">Geralmente, a redução do inchaço e a melhora na disposição ocorrem entre 7 a 14 dias de adesão consistente ao protocolo.</p>
  
  <h3>Preciso tomar suplementos?</h3>
  <p class="article-faq-answer">A alimentação é a base (Food First). Suplementos como Ômega-3 ou Cúrcuma podem ser úteis, mas devem ser prescritos individualmente após avaliação.</p>

  <h3>Café é inflamatório?</h3>
  <p class="article-faq-answer">Depende. O café é rico em polifenóis (benéfico), mas em excesso ou com açúcar, pode elevar o cortisol. Limite a 2-3 xícaras sem açúcar por dia.</p>
</div>

<hr />
<p><em>Este conteúdo foi revisado clinicamente em Janeiro de 2026. As informações têm caráter educativo e não substituem consulta com nutricionista ou médico.</em></p>
`;

const antiInflammatoryFAQ = [
  { question: "Em quanto tempo sinto a diferença?", answer: "Geralmente, a redução do inchaço e a melhora na disposição ocorrem entre 7 a 14 dias de adesão consistente ao protocolo." },
  { question: "Preciso tomar suplementos?", answer: "A alimentação é a base (Food First). Suplementos como Ômega-3 ou Cúrcuma podem ser úteis, mas devem ser prescritos individualmente após avaliação." },
  { question: "Café é inflamatório?", answer: "Depende. O café é rico em polifenóis (benéfico), mas em excesso ou com açúcar, pode elevar o cortisol. Limite a 2-3 xícaras sem açúcar por dia." }
];


export const featuredArticle: ArticleData = {
  id: 'feat-1',
  category: 'Energia',
  readTime: '8 min',
  title: 'Energia Vital: O Guia Completo para Restaurar seu Ritmo Natural',
  description: 'Em um mundo que nunca para, sentir-se exausto tornou-se o novo normal. Descubra como a cronobiologia e a nutrição estratégica podem devolver sua vitalidade sem depender de estimulantes artificiais.',
  imageUrl: 'https://images.unsplash.com/photo-1544367563-12123d83a7f3?q=80&w=2940&auto=format&fit=crop',
  author: 'Ana Silva',
  authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100',
  authorBio: 'Pesquisadora em bem-estar integrativo e cronobiologia. Apaixonada por traduzir ciência complexa em hábitos simples para a vida moderna.',
  authorRole: 'Especialista em Saúde Integrativa',
  date: '15 Jan 2024',
  lastModified: '20 Jan 2024',
  views: 2341,
  tags: ['energia', 'disposição', 'nutrição', 'hábitos'],
  content: loremContent,
  reviewedBy: 'Comitê Editorial Lifeday',
  references: [
    'Panda, S. (2016). Circadian physiology of metabolism. Science, 354(6315), 1008-1015.',
    'Walker, M. (2017). Why We Sleep: Unlocking the Power of Sleep and Dreams. Scribner.',
    'National Sleep Foundation. (2023). Light Exposure and Sleep.'
  ],
  seoTitle: 'Energia Vital: Guia para Restaurar seu Ritmo Natural',
  seoDescription: 'Sente exaustão constante? Aprenda como a cronobiologia e a nutrição podem devolver sua vitalidade sem estimulantes. Guia completo por Ana Silva.'
};

export const runningArticles: ArticleData[] = [
    {
        id: 'run-101',
        category: 'Corrida',
        readTime: '12 min',
        title: 'Guia Completo de Corrida de Rua: Do Zero aos 5km com Segurança',
        description: 'Um manual prático e seguro para iniciantes. Aprenda a escolher o tênis, evitar lesões e montar sua primeira planilha de treinos.',
        imageUrl: 'https://images.unsplash.com/photo-1596464716127-f9a875971844?auto=format&fit=crop&q=80&w=2000',
        author: 'Lucas Viana',
        authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100',
        authorRole: 'Educador Físico e Treinador',
        authorBio: 'Treinador certificado com mais de 10 anos de experiência preparando atletas amadores para maratonas e provas de rua. Especialista em biomecânica da corrida.',
        date: '24 Jan 2026',
        lastModified: '25 Jan 2026',
        views: 450,
        tags: ['corrida', 'iniciantes', 'treino', 'fitness', '5km'],
        content: runningGuideContent,
        faq: runningFAQ,
        reviewedBy: 'Dr. Roberto Mendes (Ortopedista)',
        references: [
            'American College of Sports Medicine (ACSM). Guidelines for Exercise Testing and Prescription.',
            'Lee, D. C., et al. (2014). Leisure-time running reduces all-cause and cardiovascular mortality risk. JACC.',
            'World Health Organization (WHO). Physical Activity Guidelines.'
        ],
        seoTitle: 'Corrida de Rua para Iniciantes: Guia Completo 0 aos 5km',
        seoDescription: 'Quer começar a correr? Confira nosso guia definitivo com planilhas de treino, escolha de tênis e dicas de segurança para iniciantes.'
    }
];

export const nutritionArticles: ArticleData[] = [
  {
    id: 'nutri-guide-101', // ID Único
    category: 'Nutrição',
    readTime: '15 min',
    title: 'Nutrição Anti-inflamatória: O Guia Definitivo para Desinflamar',
    description: 'A inflamação crônica é a raiz de diversas doenças. Descubra quais alimentos funcionam como remédios naturais e aprenda um protocolo prático de 7 dias.',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=2000', // Foto de comida saudável/salada
    author: 'Dra. Juliana Torres',
    authorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100&h=100', // Foto de médica/nutri
    authorRole: 'Nutricionista Funcional (PhD)',
    authorBio: 'Nutricionista com Doutorado em Bioquímica Nutricional. Especialista em modulação intestinal e doenças autoimunes. Autora do livro "Comida que Cura".',
    date: '28 Jan 2026',
    lastModified: '29 Jan 2026',
    views: 5240,
    tags: ['anti-inflamatorio', 'dieta', 'saúde intestinal', 'imunidade'],
    content: antiInflammatoryContent,
    faq: antiInflammatoryFAQ,
    reviewedBy: 'Dr. Carlos Mendez (Imunologista)',
    references: [
        'Harvard Health Publishing. Foods that fight inflammation. (2022).',
        'Calder, P. C. (2017). Omega-3 fatty acids and inflammatory processes. Nutrients.',
        'Minihane, A. M., et al. (2015). Low-grade inflammation, diet composition and health. British Journal of Nutrition.'
    ],
    seoTitle: 'Dieta Anti-inflamatória: Guia Completo e Alimentos Permitidos',
    seoDescription: 'Aprenda como desinflamar o corpo naturalmente. Lista de alimentos anti-inflamatórios, o que evitar e cardápio prático por Dra. Juliana Torres.'
  },
  {
    id: 'nutri-1',
    category: 'Nutrição',
    readTime: '5 min',
    title: 'O Poder dos Prebióticos no Café da Manhã',
    description: 'Como começar o dia alimentando sua microbiota para uma saúde mental blindada.',
    imageUrl: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&q=80&w=800',
    author: 'João Silva',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100',
    authorRole: 'Nutricionista Clínico',
    authorBio: 'Nutricionista com foco em saúde intestinal e microbioma. Dedica-se a ensinar como a comida afeta o cérebro e o humor.',
    date: '20 Jan',
    views: 1200,
    tags: ['prebioticos', 'café', 'intestino'],
    content: loremContent,
    seoTitle: 'Prebióticos no Café da Manhã: Benefícios para Microbiota',
    seoDescription: 'Descubra como incluir prebióticos na sua primeira refeição do dia para melhorar a saúde intestinal e mental. Dicas de nutricionista.'
  },
  {
    id: 'nutri-2',
    category: 'Nutrição',
    readTime: '7 min',
    title: 'Mitos sobre o Jejum Intermitente',
    description: 'Separando a ciência do hype: o que realmente acontece com seu corpo após 16 horas.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
    author: 'Ana Silva',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100',
    authorRole: 'Especialista em Saúde Integrativa',
    authorBio: 'Pesquisadora em bem-estar integrativo e cronobiologia. Apaixonada por traduzir ciência complexa em hábitos simples.',
    date: '18 Jan',
    views: 3100,
    tags: ['jejum', 'metabolismo', 'dieta'],
    content: loremContent,
    seoTitle: 'Jejum Intermitente: Verdades e Mitos Explicados',
    seoDescription: 'O jejum intermitente funciona mesmo? Analisamos os estudos científicos sobre o que acontece com seu metabolismo após 16h sem comer.'
  },
  {
    id: 'nutri-3',
    category: 'Receitas',
    readTime: '10 min',
    title: 'Smoothies Funcionais para o Pós-Treino',
    description: '3 receitas deliciosas focadas em recuperação muscular e redução de inflamação.',
    imageUrl: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80&w=800',
    author: 'Chef Marcos',
    authorAvatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=100&h=100',
    authorRole: 'Gastrólogo Funcional',
    authorBio: 'Chef especializado em gastronomia funcional e esportiva. Cria pratos que unem alta gastronomia com propriedades anti-inflamatórias.',
    date: '16 Jan',
    views: 950,
    tags: ['receitas', 'fitness', 'recuperação'],
    content: loremContent,
    seoTitle: '3 Smoothies Pós-Treino para Recuperação Muscular',
    seoDescription: 'Aprenda receitas de smoothies anti-inflamatórios para acelerar sua recuperação pós-treino. Deliciosos e funcionais.'
  },
];

export const mindBodyArticles: ArticleData[] = [
  {
    id: 'mind-1',
    category: 'Meditação',
    readTime: '6 min',
    title: 'Micro-meditações para Dias Caóticos',
    description: 'Técnicas de 2 minutos para resetar o sistema nervoso no meio do expediente.',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    author: 'Sarah Zen',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100',
    authorRole: 'Instrutora de Mindfulness',
    authorBio: 'Psicóloga e instrutora de meditação certificada. Trabalha com gestão de estresse no ambiente corporativo há 12 anos.',
    date: '21 Jan',
    views: 1540,
    tags: ['meditação', 'estresse', 'mindfulness'],
    content: loremContent,
    seoTitle: 'Micro-meditações: Como Relaxar em 2 Minutos',
    seoDescription: 'Dias estressantes? Conheça técnicas de micro-meditação que você pode fazer no escritório para acalmar a mente rapidamente.'
  },
  {
    id: 'mind-2',
    category: 'Yoga',
    readTime: '8 min',
    title: 'Yoga Restaurativo antes de Dormir',
    description: 'Uma sequência simples de 5 posturas para garantir um sono profundo e reparador.',
    imageUrl: 'https://images.unsplash.com/photo-1544367563-12123d83a7f3?auto=format&fit=crop&q=80&w=800',
    author: 'Prof. Carla Lima',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100',
    authorRole: 'Professora de Yoga e Biomecânica',
    authorBio: 'Mestre em Fisiologia do Exercício e praticante de Yoga há 20 anos. Combina ciência ocidental e sabedoria oriental para recuperação física.',
    date: '19 Jan',
    views: 2100,
    tags: ['yoga', 'sono', 'relaxamento'],
    content: loremContent,
    seoTitle: 'Sequência de Yoga para Dormir Melhor',
    seoDescription: '5 posturas de yoga restaurativo para fazer na cama e garantir um sono profundo. Ideal para iniciantes.'
  },
  {
    id: 'mind-3',
    category: 'Bem-Estar',
    readTime: '5 min',
    title: 'A Ciência da Gratidão',
    description: 'Como o hábito de agradecer altera fisicamente a estrutura do seu cérebro.',
    imageUrl: 'https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?auto=format&fit=crop&q=80&w=800',
    author: 'Paulo Freire',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100',
    authorRole: 'Neurocientista Comportamental',
    authorBio: 'Doutor em Neurociências. Pesquisa a neuroplasticidade e como pequenos hábitos mentais podem reconfigurar o cérebro para a felicidade.',
    date: '15 Jan',
    views: 3200,
    tags: ['gratidão', 'neurociencia', 'psicologia'],
    content: loremContent,
    seoTitle: 'Neurociência da Gratidão: Efeitos no Cérebro',
    seoDescription: 'O que acontece no seu cérebro quando você agradece? Entenda a ciência por trás da gratidão e seus benefícios para a saúde mental.'
  },
];

export const recentArticles: ArticleData[] = [
  ...runningArticles, // Adicionado aqui para aparecer na home
  {
    id: 'rec-1',
    category: 'Imunidade',
    readTime: '6 min',
    title: 'Superfoods: Escudo Natural para sua Imunidade',
    description: 'Além da Vitamina C: conheça os fitoquímicos e compostos bioativos que realmente fazem a diferença na sua defesa imunológica.',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2000',
    author: 'Carlos Mendes',
    authorRole: 'Pesquisador em Imunologia',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100',
    authorBio: 'Imunologista clínico com foco em nutrição preventiva e estilo de vida. Autor de artigos sobre inflamação crônica.',
    date: '14 Jan',
    views: 1856,
    tags: ['imunidade', 'alimentos', 'saúde', 'vitaminas'],
    content: loremContent,
    seoTitle: 'Superfoods para Imunidade: Guia de Nutrição',
    seoDescription: 'Quais alimentos realmente aumentam a imunidade? Conheça os fitoquímicos essenciais além da vitamina C.'
  },
  {
    id: 'rec-2',
    category: 'Longevidade',
    readTime: '10 min',
    title: 'Zonas Azuis: Segredos Centenários Revelados',
    description: 'Uma análise profunda sobre o que Okinawa, Sardenha e Icária têm em comum. Não é apenas o que eles comem, é como eles vivem.',
    imageUrl: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=2000',
    author: 'Maria Costa',
    authorRole: 'Gerontologista',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100',
    authorBio: 'Pesquisadora em Gerontologia Social. Estuda comunidades centenárias e os fatores sociais que contribuem para uma vida longa.',
    date: '13 Jan',
    views: 1423,
    tags: ['longevidade', 'hábitos', 'qualidade de vida'],
    content: loremContent,
    seoTitle: 'Segredos das Zonas Azuis: Lições de Longevidade',
    seoDescription: 'O que podemos aprender com as pessoas que vivem mais de 100 anos? Exploramos os hábitos das Blue Zones.'
  },
  {
    id: 'rec-3',
    category: 'Nutrição',
    readTime: '7 min',
    title: 'Keto ou Low Carb? Entenda a Ciência',
    description: 'Desmistificando os mecanismos metabólicos. Qual estratégia nutricional realmente se adapta ao seu estilo de vida moderno.',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2000',
    author: 'João Silva',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100',
    authorRole: 'Nutricionista Esportivo',
    authorBio: 'Nutricionista focado em performance e flexibilidade metabólica. Ajuda atletas a otimizarem sua energia através da dieta.',
    date: '12 Jan',
    views: 987,
    tags: ['nutrição', 'dieta', 'cetogênica', 'emagrecimento'],
    content: loremContent,
    seoTitle: 'Keto vs Low Carb: Qual a Diferença e Qual Escolher?',
    seoDescription: 'Entenda as diferenças metabólicas entre dieta cetogênica e low carb e descubra qual funciona melhor para você.'
  },
  {
    id: 'rec-4',
    category: 'Fitness',
    readTime: '9 min',
    title: 'Mobilidade: O Pilar Esquecido do Fitness',
    description: 'Por que alongar não é o suficiente. Aprenda rotinas de mobilidade que previnem lesões e melhoram sua performance.',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2000',
    author: 'Carla Lima',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100',
    authorRole: 'Educadora Física',
    authorBio: 'Especialista em biomecânica e reabilitação funcional. Defende que o movimento de qualidade é a chave para evitar dores crônicas.',
    date: '11 Jan',
    views: 750,
    tags: ['fitness', 'treino', 'em-casa', 'exercício'],
    content: loremContent,
    seoTitle: 'Treino de Mobilidade: Por que é Essencial?',
    seoDescription: 'Mobilidade não é flexibilidade. Aprenda como incorporar treinos de mobilidade para prevenir lesões e melhorar performance.'
  },
];

export const popularCategories = [
  { name: 'Energia', count: 12, icon: '⚡' },
  { name: 'Imunidade', count: 15, icon: '🛡️' },
  { name: 'Longevidade', count: 8, icon: '🌱' },
  { name: 'Menopausa', count: 10, icon: '🌸' },
  { name: 'Sono', count: 14, icon: '🌙' },
  { name: 'Ossos', count: 9, icon: '🦴' },
];

export const allArticles = [
    featuredArticle,
    ...runningArticles,
    ...recentArticles,
    ...nutritionArticles,
    ...mindBodyArticles
];
