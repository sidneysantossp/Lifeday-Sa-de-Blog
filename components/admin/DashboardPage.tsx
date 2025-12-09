import React from 'react';

const StatCard = ({ title, value, change, icon, color }: any) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-stone-100">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-stone-500 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-stone-900">{value}</h3>
            </div>
            <div className={`p-2 rounded-lg ${color}`}>
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
                </svg>
            </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
            <span className={`font-bold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change > 0 ? '+' : ''}{change}%
            </span>
            <span className="text-stone-400 ml-2">vs. mês passado</span>
        </div>
    </div>
);

const DashboardPage: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold text-stone-900">Visão Geral</h1>
                <p className="text-stone-500">Bem-vindo de volta! Aqui está o que está acontecendo hoje.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total de Visualizações" 
                    value="124.5k" 
                    change={12.5} 
                    color="bg-blue-500" 
                    icon="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
                <StatCard 
                    title="Novos Assinantes" 
                    value="843" 
                    change={5.2} 
                    color="bg-emerald-500" 
                    icon="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
                <StatCard 
                    title="Artigos Publicados" 
                    value="42" 
                    change={2.1} 
                    color="bg-purple-500" 
                    icon="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
                 <StatCard 
                    title="Taxa de Engajamento" 
                    value="4.8%" 
                    change={-0.5} 
                    color="bg-orange-500" 
                    icon="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-stone-100 p-6">
                    <h3 className="font-bold text-lg text-stone-900 mb-6">Atividade Recente</h3>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className="h-10 w-10 rounded-full bg-stone-100 flex-shrink-0 flex items-center justify-center">
                                    <span className="font-bold text-stone-500">U</span>
                                </div>
                                <div>
                                    <p className="text-sm text-stone-900 font-medium">Um novo comentário foi postado em <span className="text-emerald-600">"Benefícios da Corrida"</span></p>
                                    <p className="text-xs text-stone-500 mt-1">2 horas atrás</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Popular Categories */}
                <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-6">
                     <h3 className="font-bold text-lg text-stone-900 mb-6">Categorias em Alta</h3>
                     <div className="space-y-4">
                        {['Nutrição', 'Fitness', 'Bem-Estar', 'Sono'].map((cat, i) => (
                            <div key={cat} className="flex items-center justify-between">
                                <span className="text-stone-600 text-sm font-medium">{cat}</span>
                                <div className="w-32 bg-stone-100 rounded-full h-2">
                                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${80 - (i * 15)}%` }}></div>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;