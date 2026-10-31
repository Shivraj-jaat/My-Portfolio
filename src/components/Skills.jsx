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
  BookOpen,
  Award,
  CheckCircle2
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
    { id: 'all', label: 'All Core Skills' },
    { id: 'languages', label: 'Languages' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend & DB' },
    { id: 'aiAndTools', label: 'AI & Cloud' },
  ];

  const getSkillsList = () => {
    if (activeTab === 'all') {
      return [
        ...(skills.languages || []).map(s => ({ ...s, category: 'Language' })),
        ...(skills.frontend || []).map(s => ({ ...s, category: 'Frontend' })),
        ...(skills.backend || []).map(s => ({ ...s, category: 'Backend & DB' })),
        ...(skills.aiAndTools || []).map(s => ({ ...s, category: 'AI & Cloud' }))
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
        return 'text-emerald-400 bg-emerald-950/70 border-emerald-500/40 shadow-sm shadow-emerald-500/20';
      case 'Advanced':
        return 'text-cyan-400 bg-cyan-950/70 border-cyan-500/40 shadow-sm shadow-cyan-500/20';
      default:
        return 'text-indigo-400 bg-indigo-950/70 border-indigo-500/40 shadow-sm shadow-indigo-500/20';
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-24 relative bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-950/50 border border-blue-800/60 mb-3">
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            <span>Tech Arsenal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Core Technical Skills
          </h2>
          <p className="mt-2.5 sm:mt-3 text-slate-400 text-xs sm:text-sm md:text-base">
            High-impact production technologies, frameworks, and AI workflows Shivraj specializes in.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex justify-start sm:justify-center mb-8 sm:mb-10 overflow-x-auto no-scrollbar px-1 pb-2">
          <div className="inline-flex p-1 rounded-2xl bg-slate-900/90 border border-slate-800/80 backdrop-blur-md shrink-0 shadow-lg shadow-black/20">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap btn-shimmer ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30 font-semibold scale-100'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50 hover:scale-[1.02]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Streamlined Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 mb-10 sm:mb-12">
          {getSkillsList().map((skill, idx) => {
            const IconComponent = iconMap[skill.icon] || Code2;
            return (
              <div
                key={idx}
                className="group relative p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/90 hover:border-cyan-500/50 hover:bg-slate-900/95 transition-all duration-300 card-glow-hover overflow-hidden"
              >
                {/* Subtle top border glow on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/0 group-hover:via-cyan-500/80 to-transparent transition-all duration-500"></div>

                <div className="flex items-start justify-between mb-3.5">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300 shrink-0">
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getBadgeColor(skill.level)}`}>
                    {skill.level}
                  </span>
                </div>

                <h3 className="font-bold text-white text-xs sm:text-sm md:text-base group-hover:text-cyan-300 transition-colors leading-tight">
                  {skill.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 font-mono">
                  {skill.category}
                </p>
              </div>
            );
          })}
        </div>

        {/* CS Fundamentals & Problem Solving Highlight Card */}
        <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl hover:border-slate-700/80 transition-all">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <span>Core Computer Science Foundations</span>
                  <Award className="w-4 h-4 text-amber-400" />
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Strong algorithm foundations with 200+ LeetCode problems & 5-Star HackerRank Problem Solving.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.csFundamentals.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-cyan-300 hover:border-cyan-500/40 hover:text-white transition-colors"
                >
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
