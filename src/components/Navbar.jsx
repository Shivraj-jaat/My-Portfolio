import React, { useState, useEffect } from 'react';
import { Bot, Menu, X } from 'lucide-react';
import { GithubIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

export default function Navbar({ onOpenAiChat }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Guestbook', href: '#guestbook' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#090d16]/80 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3.5' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              {portfolioData.personal.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-100 tracking-tight text-lg group-hover:text-blue-400 transition-colors">
                {portfolioData.personal.name}
              </span>
              <span className="text-[10px] tracking-wider text-slate-400 font-mono -mt-1 uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Dev & AI
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-full transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenAiChat}
              className="relative inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all group overflow-hidden cursor-pointer"
            >
              <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              <Bot className="w-4 h-4 text-cyan-300 animate-pulse" />
              <span>Ask AI Agent</span>
              <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded-full font-mono uppercase tracking-wider">
                Groq
              </span>
            </button>

            <a
              href={portfolioData.personal.socials.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800 rounded-full hover:border-slate-700 transition-colors"
              title="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenAiChat}
              className="px-2.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center gap-1.5 shadow-md shadow-blue-500/20 active:scale-95 transition-all"
              aria-label="Open AI Assistant"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-300" />
              <span>AI</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl active:scale-95 transition-all"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-slate-200" /> : <Menu className="w-5 h-5 text-slate-200" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 top-[65px] bg-black/60 backdrop-blur-sm -z-10 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="md:hidden bg-[#0c1222]/98 border-b border-slate-800 backdrop-blur-2xl px-5 pt-3 pb-6 space-y-2.5 mt-2 shadow-2xl animate-in slide-in-from-top-4 duration-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3.5 py-2.5 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2.5 border-t border-slate-800/80">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 text-center text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.98] rounded-xl shadow-lg shadow-blue-600/30 transition-all"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
