import React from 'react';
import { 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code2, 
  HeartHandshake 
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function About() {
  const { personal, experiences, education, codingProfiles, extracurricular } = portfolioData;

  return (
    <section id="about" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/50 border border-cyan-800/60 mb-3">
            <User className="w-3.5 h-3.5" />
            <span>Behind The Code</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            About Shivraj & Journey
          </h2>
          <p className="mt-2.5 sm:mt-3 text-slate-400 text-xs sm:text-sm md:text-base">
            Second-year B.Tech IT student & Full-Stack MERN developer passionate about building dependable web apps.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Bio & Coding Highlights (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Bio Card */}
            <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <span>Professional Summary</span>
                  <span className="text-blue-500">_</span>
                </h3>
                <span className="text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Seeking Internship
                </span>
              </div>

              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm md:text-base mb-6">
                {personal.bio}
              </p>

              {/* Contact Details Quick Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-2.5 text-slate-300 text-xs min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400 shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] text-slate-500 font-mono">Location</div>
                    <div className="font-semibold text-slate-200 truncate">{personal.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-slate-300 text-xs min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-purple-950/80 border border-purple-800/60 flex items-center justify-center text-purple-400 shrink-0">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] text-slate-500 font-mono">Email</div>
                    <div className="font-semibold text-slate-200 truncate">{personal.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-slate-300 text-xs min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] text-slate-500 font-mono">Phone</div>
                    <div className="font-semibold text-slate-200 truncate">{personal.phone}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Problem Solving & DSA Badges */}
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
              <h3 className="text-sm sm:text-base font-bold text-white mb-4 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>Problem Solving & Coding Profile</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {codingProfiles.map((cp, idx) => (
                  <div key={idx} className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono font-bold text-cyan-400">{cp.platform}</span>
                      <Award className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white mb-1">
                      {cp.achievement}
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-400">
                      {cp.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Extracurricular (NSS) */}
            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-900/40 border border-slate-800/80 flex items-start sm:items-center gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-950/60 border border-rose-800/50 flex items-center justify-center text-rose-400 shrink-0">
                <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">
                  {extracurricular[0].title}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                  {extracurricular[0].description}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Experience & Education Timeline (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Experience Card */}
            <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
              <h3 className="text-sm sm:text-base font-bold text-white mb-5 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span>Internship Experience</span>
              </h3>

              <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="relative pl-7 sm:pl-8 group">
                    <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-slate-900 group-hover:scale-125 transition-transform"></div>
                    
                    <div>
                      <span className="text-[10px] font-mono font-medium text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                        {exp.period}
                      </span>
                      <h4 className="font-bold text-white text-xs sm:text-sm mt-1.5">
                        {exp.role}
                      </h4>
                      <p className="text-xs font-semibold text-blue-400 mt-0.5">
                        {exp.company}
                      </p>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Card */}
            <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
              <h3 className="text-sm sm:text-base font-bold text-white mb-5 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-purple-400" />
                <span>Education Background</span>
              </h3>

              <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                {education.map((edu, idx) => (
                  <div key={idx} className="relative pl-7 sm:pl-8 group">
                    <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-purple-500 ring-4 ring-slate-900 group-hover:scale-125 transition-transform"></div>
                    
                    <div>
                      <span className="text-[10px] font-mono font-medium text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
                        {edu.period}
                      </span>
                      <h4 className="font-bold text-white text-xs sm:text-sm mt-1.5">
                        {edu.degree}
                      </h4>
                      <p className="text-xs text-slate-300 mt-0.5">
                        {edu.institution}
                      </p>
                      <div className="mt-2 inline-block text-[10px] sm:text-[11px] font-mono font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                        {edu.score}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
