
import React from 'react';
import Button from '../Button';
import { ArticleData } from '../types';

interface ArticlesManagerProps {
  onEdit: (id: string | null) => void;
  articles: ArticleData[]; // Recebe a lista dinâmica
}

const ArticlesManager: React.FC<ArticlesManagerProps> = ({ onEdit, articles }) => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
           <h1 className="text-2xl font-bold text-stone-900">Gerenciar Artigos</h1>
           <p className="text-stone-500">Visualize, edite ou crie novos conteúdos.</p>
        </div>
        <Button 
          variant="primary" 
          className="gap-2"
          onClick={() => onEdit(null)} // Novo artigo
        >
           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
           Novo Artigo
        </Button>
      </div>

      <div className="bg-white shadow-sm border border-stone-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-stone-200">
            <thead className="bg-stone-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Título</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Autor</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Categoria</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Data</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-stone-200">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded-lg object-cover" src={article.imageUrl} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-stone-900 max-w-xs truncate">{article.title}</div>
                        <div className="text-xs text-stone-500">{article.readTime} leitura</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-stone-900">{article.author}</div>
                    <div className="text-xs text-stone-500">{article.authorRole || 'Redator'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                    {article.date}
                  </td>
                   <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Publicado
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      className="text-emerald-600 hover:text-emerald-900 mr-4"
                      onClick={() => onEdit(article.id)}
                    >
                      Editar
                    </button>
                    <button className="text-red-600 hover:text-red-900">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ArticlesManager;
