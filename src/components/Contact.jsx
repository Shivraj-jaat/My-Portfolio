import React, { useState } from 'react';
import { Mail, Send, Check, Copy, Sparkles, MessageSquare, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './Icons';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';
import { saveContactMessage } from '../services/firebase';

export default function Contact() {
  const { personal } = portfolioData;
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personal.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setErrorMsg('');

    try {
      await saveContactMessage(formData);
      
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch {
        // Decorative only
      }

      setSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to send message to Firebase. Please try again or email directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/50 border border-emerald-800/60 mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Let's Connect & Collaborate
          </h2>
          <p className="mt-2.5 sm:mt-3 text-slate-400 text-xs sm:text-sm md:text-base">
            Seeking a Frontend or Full-Stack developer internship? Have a project in mind? Reach out anytime!
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Info Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                Direct Contact
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
                Feel free to email, call, or connect on LinkedIn and GitHub.
              </p>

              {/* Email Copy Card */}
              <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-2.5 sm:gap-3 mb-3">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-mono text-slate-200 truncate min-w-0">
                    {personal.email}
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-700/60 transition-colors shrink-0 cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Phone Copy Card */}
              <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-2.5 sm:gap-3 mb-5 sm:mb-6">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-xl bg-cyan-600/10 text-cyan-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-mono text-slate-200 truncate min-w-0">
                    {personal.phone}
                  </span>
                </div>
                <button
                  onClick={handleCopyPhone}
                  className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-700/60 transition-colors shrink-0 cursor-pointer"
                  title="Copy phone to clipboard"
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Social Channels */}
              <div className="space-y-2.5 sm:space-y-3">
                <div className="text-[11px] sm:text-xs font-mono uppercase text-slate-500 tracking-wider">
                  Coding & Social Profiles
                </div>
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <a
                    href={personal.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 sm:p-3 rounded-xl bg-slate-800/60 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-700/60 transition-all hover:scale-105"
                    title="GitHub"
                  >
                    <GithubIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a
                    href={personal.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 sm:p-3 rounded-xl bg-slate-800/60 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-700/60 transition-all hover:scale-105"
                    title="LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a
                    href={personal.socials.leetcode}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 sm:p-3 rounded-xl bg-slate-800/60 hover:bg-amber-500 text-slate-300 hover:text-white border border-slate-700/60 transition-all hover:scale-105"
                    title="LeetCode (200+ Solved)"
                  >
                    <LeetCodeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick response badge */}
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-blue-950/30 border border-blue-900/40 text-xs text-blue-300 flex items-center gap-3">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0" />
              <span>Available for Summer & Immediate Frontend / Full-Stack Internships!</span>
            </div>
          </div>

          {/* Right Form Column (7 cols) */}
          <div className="lg:col-span-7 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-5 sm:mb-6 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              <span>Send Shivraj a Message</span>
            </h3>

            {sent && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-sm flex items-center gap-3 animate-in fade-in duration-200">
                <Check className="w-5 h-5 shrink-0 text-emerald-400" />
                <div>
                  <div className="font-semibold text-emerald-200">Message Sent Successfully!</div>
                  <div className="text-xs text-emerald-400/90 mt-0.5">
                    Thank you for reaching out! I will get back to you as soon as possible.
                  </div>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-950/80 border border-rose-800 text-rose-300 text-sm">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Recruiter / Client"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. Internship Interview / Project Discussion"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Drop a note about the role, project, or schedule a quick chat..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                {sending ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
