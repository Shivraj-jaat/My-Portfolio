import React, { useState } from 'react';
import { ExternalLink, Bot, FolderGit2, Star } from 'lucide-react';
import { GithubIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

export default function Projects({ onAskAboutProject }) {
  const [filter, setFilter] = useState('All');
  const { projects } = portfolioData;

  const categories = ['All', 'AI & GenAI', 'Full Stack', 'Frontend'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-950/50 border border-purple-800/60 mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Works</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Projects & AI Innovations
          </h2>
          <p className="mt-2.5 sm:mt-3 text-slate-400 text-xs sm:text-sm md:text-base">
            High-performance full-stack web applications, real-time LLM streaming apps, and developer tools.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex justify-start sm:justify-center mb-8 sm:mb-12 overflow-x-auto no-scrollbar px-1 pb-2">
          <div className="inline-flex p-1 rounded-2xl bg-slate-900/90 border border-slate-800/80 backdrop-blur-md shrink-0 shadow-lg shadow-black/20">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap btn-shimmer ${
                  filter === cat
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50 hover:scale-[1.02]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-2xl sm:rounded-3xl bg-slate-900/60 border border-slate-800/90 hover:border-blue-500/50 overflow-hidden flex flex-col transition-all duration-300 card-glow-hover"
            >
              {/* Top ambient highlight on card hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/0 group-hover:via-cyan-400/80 to-transparent transition-all duration-500 z-10"></div>

              {/* Project Image & Overlay */}
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                
                {/* Badges on Top */}
                <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between pointer-events-none">
                  <span className="text-[10px] sm:text-[11px] font-mono px-2.5 sm:px-3 py-1 rounded-full bg-slate-950/85 text-cyan-300 border border-cyan-800/60 backdrop-blur-md shadow-sm">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold px-2 sm:px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md shadow-sm">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                    <span>{project.title}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights Bullet List */}
                  {project.highlights && (
                    <div className="mb-4 sm:mb-5 space-y-2">
                      {project.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5 shadow-sm shadow-blue-400/50"></span>
                          <span className="leading-relaxed">{h}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5 sm:mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] sm:text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-950/70 text-slate-300 border border-slate-800/80 hover:border-slate-700 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions Row */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2.5">
                  <button
                    onClick={() => onAskAboutProject(project.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-800/60 hover:border-cyan-500/60 px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-sm hover:shadow-cyan-500/20 active:scale-95 btn-shimmer"
                    title="Ask AI assistant about this project"
                  >
                    <Bot className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <span>Ask AI About This</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-xl border border-slate-700/60 transition-all hover:scale-105 active:scale-95"
                      title="View GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                    {project.live && project.live !== '#' && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold px-3.5 py-2 rounded-xl text-white bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all shadow-md shadow-blue-600/30 btn-shimmer"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
