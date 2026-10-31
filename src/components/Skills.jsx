import React, { useState } from 'react';
import { 
  Code2, 
  Layers, 
  Sparkles, 
  Server, 
  Database, 
  Cpu, 
  Palette, 
  Layout, 
  Globe, 
  FileCode, 
  Network, 
  HardDrive, 
  DatabaseZap, 
  Bot, 
  GitBranch, 
  Zap, 
  Send, 
  Cloud,
  Terminal,
  BookOpen
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// Map icon strings to Lucide components
const iconMap = {
  Code2,
  FileCode,
  Palette,
  Layout,
  Globe,
  Cpu,
  Server,
  Layers,
  Network,
  Database,
  HardDrive,
  DatabaseZap,
  Sparkles,
  Bot,
  GitBranch,
  Zap,
  Send,
  Cloud,
  Terminal,
  BookOpen
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');
  const { skills } = portfolioData;

  const tabs = [
    { id: 'all', label: 'All Tech Stack' },
    { id: 'languages', label: 'Languages' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend & DB' },
    { id: 'aiAndTools', label: 'AI & Tools' },
  ];

  const getSkillsList = () => {
    if (activeTab === 'all') {
      return [
        ...(skills.languages || []).map(s => ({ ...s, category: 'Language' })),
        ...(skills.frontend || []).map(s => ({ ...s, category: 'Frontend' })),
        ...(skills.backend || []).map(s => ({ ...s, category: 'Backend & DB' })),
        ...(skills.aiAndTools || []).map(s => ({ ...s, category: 'AI & Tools' }))
      ];
    }
    return (skills[activeTab] || []).map(s => ({ 
      ...s, 
      category: tabs.find(t => t.id === activeTab)?.label 
    }));
  };

  const getBadgeColor = (level) => {
    switch (level) {
      case 'Expert':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60';
      case 'Advanced':
        return 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60';
      default:
        return 'text-indigo-400 bg-indigo-950/60 border-indigo-800/60';
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-24 relative bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-950/50 border border-blue-800/60 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Tech Arsenal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Technical Skills & Tools
          </h2>
          <p className="mt-2.5 sm:mt-3 text-slate-400 text-xs sm:text-sm md:text-base">
            Technologies, frameworks, and developer tools Shivraj uses to build full-stack solutions.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex justify-start sm:justify-center mb-8 sm:mb-10 overflow-x-auto no-scrollbar px-1 pb-2">
          <div className="inline-flex p-1 rounded-2xl bg-slate-900 border border-slate-800/80 shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mb-10 sm:mb-12">
          {getSkillsList().map((skill, idx) => {
            const IconComponent = iconMap[skill.icon] || Code2;
            return (
              <div
                key={idx}
                className="group p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/90 hover:-translate-y-1 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className={`text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded-full border ${getBadgeColor(skill.level)}`}>
                    {skill.level}
                  </span>
                </div>

                <h3 className="font-bold text-white text-xs sm:text-sm md:text-base group-hover:text-blue-400 transition-colors leading-tight">
                  {skill.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-1">
                  {skill.category}
                </p>
              </div>
            );
          })}
        </div>

        {/* CS Fundamentals & GenAI Callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3 sm:gap-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-blue-600/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-800/40">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white mb-1.5">
                Core Computer Science Fundamentals
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {skills.csFundamentals.map((item, idx) => (
                  <span key={idx} className="text-[11px] sm:text-xs font-mono px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-800/40">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">
                AI/ML APIs & Generative AI Hands-On
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Experience with <strong>@google/genai</strong>, Gemini API prompt handling, AI Q&A, and high-velocity <strong>Groq LPU</strong> inference integration.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
