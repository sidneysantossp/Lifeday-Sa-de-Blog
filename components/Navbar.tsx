import React, { useState, useEffect } from 'react';
import Button from './Button';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll to adjust navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', page: 'home' },
    { name: 'Categorias', page: 'categories' },
    { name: 'Nossa Equipe', page: 'team' },
    { name: 'Sobre', page: 'about' },
  ];

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-stone-200/50
        ${isScrolled || isMenuOpen ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent border-transparent py-4'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div 
              className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <span className={`text-xl font-bold tracking-tight transition-colors duration-300 font-serif ${isScrolled ? 'text-stone-900' : 'text-stone-900'}`}>
                Lifeday.
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navLinks.map((link) => (
                <button 
                  key={link.name} 
                  onClick={() => handleNavClick(link.page)}
                  className={`font-medium text-sm transition-colors duration-200 ${
                    currentPage === link.page ? 'text-emerald-700' : 'text-stone-600 hover:text-emerald-600'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden md:flex md:items-center gap-3">
              <button 
                onClick={() => onNavigate('admin-login')}
                className="text-stone-500 hover:text-emerald-600 transition-colors text-sm font-medium"
              >
                Login
              </button>
              <div className="h-4 w-px bg-stone-300 mx-1"></div>
              <Button variant="primary" className="!py-2 !px-5 !text-xs">Assinar</Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-full text-stone-600 hover:bg-stone-100 transition-colors focus:outline-none"
              >
                {!isMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold font-serif text-stone-900">Menu</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-stone-400 hover:text-stone-900">
               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div className="space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.page)}
                className="block w-full text-left text-2xl font-serif text-stone-800 hover:text-emerald-600 transition-colors"
              >
                {link.name}
              </button>
            ))}
            <button
                onClick={() => handleNavClick('admin-login')}
                className="block w-full text-left text-2xl font-serif text-stone-800 hover:text-emerald-600 transition-colors border-t border-stone-100 pt-4 mt-4"
              >
                Área do Redator
            </button>
          </div>

          <div className="mt-auto pt-8 border-t border-stone-100">
             <Button variant="primary" className="w-full mb-4">Assinar Newsletter</Button>
             <p className="text-center text-xs text-stone-400">© 2026 Lifeday Saúde</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;