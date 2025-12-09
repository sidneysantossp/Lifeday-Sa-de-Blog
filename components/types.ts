
export interface ArticleData {
  id: string;
  category: string;
  readTime: string;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  authorAvatar?: string;
  authorBio?: string;
  authorRole?: string; // Novo: Cargo do autor para Expertise
  date: string;
  lastModified?: string; // Novo: Para SEO (freshness)
  views: number;
  tags: string[];
  content?: string; // Novo: Corpo do artigo (HTML)
  references?: string[]; // Novo: Citações para Autoridade
  reviewedBy?: string; // Novo: Revisão por pares para Confiança
  faq?: { question: string; answer: string }[]; // Novo: Para Schema FAQPage
  seoTitle?: string;
  seoDescription?: string;
  seoKeyword?: string; // Novo: Palavra-chave principal
}
