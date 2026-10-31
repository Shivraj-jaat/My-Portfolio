import React from 'react';
import { ArrowRight, Bot, Download, Flame } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Hero({ onOpenAiChat }) {
  const { personal, stats } = portfolioData;

  return (
    <section className="relative min-h-[90vh] pt-28 sm:pt-36 pb-16 sm:pb-24 flex flex-col justify-center items-center overflow-hidden">
      {/* Background Ambient Glow Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[550px] h-[300px] sm:h-[550px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-purple-600/20 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none -z-10 animate-glow"></div>
      <div className="absolute top-2/3 right-4 sm:right-10 w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] bg-cyan-500/10 rounded-full blur-[70px] sm:blur-[100px] pointer-events-none -z-10"></div>
      
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        
        {/* Availability Badge */}
        <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 shadow-inner mb-6 sm:mb-8 backdrop-blur-md">
          <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] sm:text-xs font-medium text-slate-300">
            Available for Internships & Projects
          </span>
          <span className="hidden sm:inline-block text-slate-600">|</span>
          <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-cyan-400 font-mono">
            <Flame className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" /> Groq AI
          </span>
        </div>

        {/* Hero Heading */}
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.15] mb-5 sm:mb-6">
          Building <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">lightning-fast</span> web apps & modern{' '}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">AI experiences</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-400 mb-8 sm:mb-12 leading-relaxed font-normal px-2">
          Hi! I am <span className="text-slate-200 font-semibold">{personal.name}</span>, a {personal.title.toLowerCase()}. {personal.tagline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 max-w-lg sm:max-w-none mx-auto">
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.98] shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all cursor-pointer"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenAiChat}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-200 bg-slate-900/90 hover:bg-slate-800/90 active:scale-[0.98] border border-slate-700/80 hover:border-cyan-500/50 shadow-md hover:shadow-cyan-500/10 transition-all cursor-pointer group"
          >
            <Bot className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>Chat with My AI</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800/60">
              ⚡ Groq
            </span>
          </button>

          <div className="grid grid-cols-2 sm:flex items-center gap-3">
            <a
              href={personal.resumeUrl && personal.resumeUrl !== '#' ? personal.resumeUrl : '#about'}
              target={personal.resumeUrl && personal.resumeUrl !== '#' ? '_blank' : '_self'}
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-medium text-sm text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 active:scale-[0.98] border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span>Resume</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-medium text-sm text-slate-400 hover:text-white bg-slate-900/40 hover:bg-slate-800/60 active:scale-[0.98] border border-slate-800/60 transition-all cursor-pointer"
            >
              <span>Contact</span>
            </a>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800/80">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm hover:border-slate-700 transition-colors"
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent mb-0.5 sm:mb-1">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs md:text-sm text-slate-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
