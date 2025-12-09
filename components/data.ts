
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

// Helper to generate dense text for Pillar structure
const generateFillerParagraphs = (count: number) => {
    const texts = [
        "Além disso, estudos recentes publicados em revistas de alto impacto sugerem que a consistência é mais importante que a intensidade inicial. Na prática clínica, observamos que pacientes que adotam pequenas mudanças graduais tendem a manter os resultados por muito mais tempo do que aqueles que buscam soluções radicais.",
        "É fundamental compreender a fisiologia por trás deste processo. Quando analisamos os marcadores biológicos, percebemos uma clara correlação entre o estilo de vida e a resposta inflamatória do organismo. Isso reforça a tese de que intervenções multifatoriais são as mais eficazes.",
        "Outro ponto crucial é a individualidade biológica. O que funciona para um indivíduo pode não ser ideal para outro. Por isso, recomendamos sempre uma abordagem personalizada, levando em conta histórico familiar, rotina e preferências pessoais.",
        "Do ponto de vista técnico, é importante destacar os mecanismos de ação envolvidos. A literatura científica aponta para três vias metabólicas principais que são ativadas durante este processo, resultando em adaptações crônicas benéficas para a saúde a longo prazo.",
        "A integração entre mente e corpo não é apenas um conceito filosófico, mas uma realidade fisiológica mensurável. O eixo intestino-cérebro, por exemplo, demonstra como nossa alimentação afeta diretamente nossa saúde mental e vice-versa."
    ];
    let output = "";
    for (let i = 0; i < count; i++) {
        output += `<p>${texts[i % texts.length]} ${texts[(i + 1) % texts.length]}</p>`;
    }
    return output;
};

// Gerador de Conteúdo Pilar (HTML Structure)
const generateDeepContent = (title: string, category: string, specificIntro: string) => {
    return `
    <div class="article-intro">
      <p><strong>${title}</strong> ${specificIntro}</p>
      <p>Neste guia definitivo e atualizado, mergulharemos fundo na ciência, prática e estratégias comprovadas para dominar este aspecto vital da sua saúde. Baseado em evidências e anos de prática clínica.</p>
    </div>

    <h2>1. O Contexto Científico e Histórico</h2>
    <p>Para entender o impacto de ${title}, precisamos olhar para além do óbvio. Historicamente, diversas culturas já reconheciam sua importância, mas apenas recentemente a ciência moderna conseguiu mapear os mecanismos exatos.</p>
    ${generateFillerParagraphs(2)}
    
    <blockquote>"A simplicidade é o último grau de sofisticação. Em saúde, voltar ao básico com consistência supera qualquer tecnologia avançada." <cite>- Nota do Autor</cite></blockquote>

    <h3>Mecanismos de Ação</h3>
    <ul>
        <li><strong>Regulação Hormonal:</strong> Otimização do cortisol e insulina.</li>
        <li><strong>Neuroplasticidade:</strong> Capacidade do cérebro de se remodelar.</li>
        <li><strong>Modulação Imunológica:</strong> Fortalecimento das defesas naturais.</li>
    </ul>

    <h2>2. Principais Benefícios Comprovados</h2>
    <p>A literatura científica é vasta. Abaixo, detalhamos os principais benefícios observados em estudos randomizados controlados.</p>
    ${generateFillerParagraphs(3)}

    <div class="overflow-x-auto my-8">
      <table class="w-full text-left border-collapse border border-stone-200">
        <thead>
          <tr class="bg-stone-100">
            <th class="p-3 border border-stone-200">Benefício</th>
            <th class="p-3 border border-stone-200">Prazo Médio</th>
            <th class="p-3 border border-stone-200">Nível de Evidência</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-3 border border-stone-200 font-bold">Redução de Estresse</td>
            <td class="p-3 border border-stone-200">Imediato a 1 semana</td>
            <td class="p-3 border border-stone-200">Alto (Meta-análises)</td>
          </tr>
          <tr>
            <td class="p-3 border border-stone-200 font-bold">Melhora Metabólica</td>
            <td class="p-3 border border-stone-200">4 a 8 semanas</td>
            <td class="p-3 border border-stone-200">Médio/Alto</td>
          </tr>
          <tr>
            <td class="p-3 border border-stone-200 font-bold">Longevidade Celular</td>
            <td class="p-3 border border-stone-200">Longo Prazo (> 6 meses)</td>
            <td class="p-3 border border-stone-200">Em estudo (Promissor)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>3. Guia Prático: Como Aplicar na Rotina</h2>
    <p>Teoria sem prática é inútil. Aqui está o protocolo passo a passo que utilizamos com nossos pacientes.</p>
    
    <h3>Fase 1: A Fundação (Semanas 1-2)</h3>
    <p>O foco é criar o hábito sem gerar atrito excessivo.</p>
    ${generateFillerParagraphs(2)}

    <h3>Fase 2: Aprofundamento (Semanas 3-4)</h3>
    <p>Aumentamos a intensidade e especificidade dos estímulos.</p>
    ${generateFillerParagraphs(2)}

    <h3>Fase 3: Otimização (Manutenção)</h3>
    <p>Ajustes finos para garantir sustentabilidade a longo prazo.</p>

    <h2>4. Mitos e Verdades</h2>
    <p>Com tanta informação disponível, é fácil cair em armadilhas. Vamos desmistificar os principais equívocos.</p>
    <ul>
        <li><strong>Mito:</strong> Precisa doer para funcionar (No Pain, No Gain).</li>
        <li><strong>Verdade:</strong> A consistência moderada supera o esforço hercúleo esporádico.</li>
        <li><strong>Mito:</strong> É caro manter esse estilo de vida.</li>
        <li><strong>Verdade:</strong> As intervenções mais poderosas (sono, sol, movimento) são gratuitas.</li>
    </ul>
    ${generateFillerParagraphs(2)}

    <h2>5. Estudos de Caso</h2>
    <p>Analisamos o perfil de pacientes que obtiveram sucesso seguindo este protocolo.</p>
    ${generateFillerParagraphs(3)}

    <h2>Perguntas Frequentes (FAQ)</h2>
    <div class="faq-section">
      <h3>Quanto tempo devo dedicar por dia?</h3>
      <p class="article-faq-answer">Para iniciantes, recomendamos começar com 15 a 20 minutos diários para garantir a adesão ao hábito.</p>
      
      <h3>Existem efeitos colaterais?</h3>
      <p class="article-faq-answer">Geralmente é seguro, mas recomendamos sempre consultar um profissional antes de iniciar mudanças drásticas, especialmente se houver condições preexistentes.</p>

      <h3>Qual o melhor horário?</h3>
      <p class="article-faq-answer">O melhor horário é aquele que você consegue cumprir consistentemente. No entanto, pela manhã costuma haver maior adesão biológica.</p>
    </div>

    <hr />
    <p><em>Conteúdo revisado clinicamente seguindo diretrizes E-E-A-T. Última atualização em 2026.</em></p>
    `;
};


// ==========================================
// CONTEÚDOS ESPECÍFICOS (TEMPLATES PILAR)
// ==========================================

const runningGuideContent = generateDeepContent(
    "Corrida de Rua", 
    "Corrida", 
    "é uma das atividades físicas mais naturais e acessíveis ao ser humano, capaz de remodelar não apenas a composição corporal, mas também a estrutura cerebral."
);

const antiInflammatoryContent = generateDeepContent(
    "Nutrição Anti-inflamatória",
    "Nutrição",
    "não é apenas uma dieta da moda, mas uma estratégia terapêutica fundamentada na redução de citocinas pró-inflamatórias através da escolha inteligente de nutrientes."
);

const prebioticContent = generateDeepContent(
    "Prebióticos no Café da Manhã",
    "Nutrição",
    "são fibras não digeríveis que servem de combustível para as bactérias benéficas do seu intestino, influenciando diretamente na produção de serotonina e bem-estar."
);

const fastingContent = generateDeepContent(
    "Jejum Intermitente",
    "Nutrição",
    "é uma estratégia ancestral de alimentação que ativa a autofagia celular, um processo de limpeza e renovação que pode prevenir o envelhecimento precoce."
);

const smoothieContent = generateDeepContent(
    "Smoothies Funcionais",
    "Receitas",
    "são veículos eficientes para alta densidade nutricional, permitindo a ingestão de grandes quantidades de fitoquímicos em uma forma de fácil digestão e absorção rápida."
);

const meditationContent = generateDeepContent(
    "Micro-meditações",
    "Meditação",
    "são práticas breves, de 2 a 5 minutos, projetadas para resetar o sistema nervoso autônomo, reduzindo o cortisol e restaurando o foco em situações de alta pressão."
);

const yogaContent = generateDeepContent(
    "Yoga Restaurativo",
    "Yoga",
    "é uma prática focada no relaxamento profundo e na ativação do sistema parassimpático, essencial para combater a insônia e a ansiedade crônica da vida moderna."
);

const gratitudeContent = generateDeepContent(
    "A Ciência da Gratidão",
    "Bem-Estar",
    "demonstra que o ato deliberado de agradecer altera a estrutura neural do córtex pré-frontal, melhorando a regulação emocional e a resiliência psicológica."
);

const immunityContent = generateDeepContent(
    "Superfoods para Imunidade",
    "Imunidade",
    "vai muito além da vitamina C. Trata-se de fornecer ao corpo os cofatores enzimáticos necessários para a produção eficiente de células de defesa."
);

const blueZonesContent = generateDeepContent(
    "Zonas Azuis",
    "Longevidade",
    "são regiões geográficas onde as pessoas vivem estatisticamente mais e melhor, compartilhando 9 princípios comuns de estilo de vida conhecidos como Power 9."
);

const ketoContent = generateDeepContent(
    "Dieta Cetogênica vs Low Carb",
    "Nutrição",
    "envolve a manipulação metabólica para usar gordura como fonte primária de energia, alterando profundamente a sinalização celular e a clareza mental."
);

const mobilityContent = generateDeepContent(
    "Treino de Mobilidade",
    "Fitness",
    "é a capacidade de controlar ativamente uma articulação em toda sua amplitude de movimento, sendo o pilar fundamental para prevenir lesões e garantir longevidade funcional."
);

const energyContent = generateDeepContent(
    "Energia Vital e Cronobiologia",
    "Energia",
    "estuda como os ritmos biológicos internos interagem com o ambiente externo, determinando nossos picos de produtividade, sono e metabolismo hormonal."
);


// ==========================================
// EXPORTS
// ==========================================

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
  content: energyContent,
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
    id: 'nutri-guide-101',
    category: 'Nutrição',
    readTime: '15 min',
    title: 'Nutrição Anti-inflamatória: O Guia Definitivo para Desinflamar',
    description: 'A inflamação crônica é a raiz de diversas doenças. Descubra quais alimentos funcionam como remédios naturais e aprenda um protocolo prático de 7 dias.',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=2000',
    author: 'Dra. Juliana Torres',
    authorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100&h=100',
    authorRole: 'Nutricionista Funcional (PhD)',
    authorBio: 'Nutricionista com Doutorado em Bioquímica Nutricional. Especialista em modulação intestinal e doenças autoimunes. Autora do livro "Comida que Cura".',
    date: '28 Jan 2026',
    lastModified: '29 Jan 2026',
    views: 5240,
    tags: ['anti-inflamatorio', 'dieta', 'saúde intestinal', 'imunidade'],
    content: antiInflammatoryContent,
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
    content: prebioticContent,
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
    content: fastingContent,
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
    content: smoothieContent,
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
    content: meditationContent,
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
    content: yogaContent,
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
    content: gratitudeContent,
    seoTitle: 'Neurociência da Gratidão: Efeitos no Cérebro',
    seoDescription: 'O que acontece no seu cérebro quando você agradece? Entenda a ciência por trás da gratidão e seus benefícios para a saúde mental.'
  },
];

export const recentArticles: ArticleData[] = [
  ...runningArticles,
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
    content: immunityContent,
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
    content: blueZonesContent,
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
    content: ketoContent,
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
    content: mobilityContent,
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
