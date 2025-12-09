
import React, { useState } from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  user: { name: string; email: string } | null;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, currentPage, onNavigate, onLogout, user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', id: 'admin-dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { name: 'Artigos', id: 'admin-articles', activeIds: ['admin-articles', 'admin-article-edit'], icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { name: 'Configurações', id: 'admin-settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  ];

  const isItemActive = (item: any) => {
      if (item.activeIds) {
          return item.activeIds.includes(currentPage);
      }
      return item.id === currentPage;
  };

  return (
    <div className="flex h-screen bg-stone-100 font-sans">
      {/* Sidebar Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-stone-900/50 z-20 md:hidden transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside 
        className={`fixed md:relative z-30 inset-y-0 left-0 w-64 bg-emerald-900 text-white transform transition-transform duration-300 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 flex items-center justify-between border-b border-emerald-800">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-white text-emerald-900 rounded-lg flex items-center justify-center">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
             </div>
             <span className="font-bold text-xl font-serif">Lifeday Admin</span>
           </div>
           <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-emerald-200">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
           </button>
        </div>

        <nav className="p-4 space-y-1 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setIsSidebarOpen(false); }}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isItemActive(item) ? 'bg-emerald-800 text-white' : 'text-emerald-100 hover:bg-emerald-800/50'}`}
            >
              <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
              </svg>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-emerald-800 bg-emerald-900">
            <button 
                onClick={() => onNavigate('home')}
                className="w-full flex items-center px-4 py-2 text-sm text-emerald-200 hover:text-white transition-colors mb-2"
            >
                <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Voltar ao Site
            </button>
            <button 
                onClick={onLogout}
                className="w-full flex items-center px-4 py-2 text-sm text-red-300 hover:text-red-100 transition-colors"
            >
                <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                Sair
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex justify-between items-center px-6 py-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-stone-500 hover:text-stone-700"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div className="text-stone-800 font-semibold text-lg md:hidden">
                {menuItems.find(i => i.id === currentPage)?.name || 'Admin'}
            </div>
            
            <div className="flex items-center gap-4 ml-auto">
               <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-stone-900">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-stone-500">{user?.email || 'admin@lifeday.com'}</p>
               </div>
               <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  {user?.name?.charAt(0).toUpperCase() || 'A'}
               </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
