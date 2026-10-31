import React, { useState, useEffect } from 'react';
import { MessageSquarePlus, Check, Sparkles, Send, Database } from 'lucide-react';
import confetti from 'canvas-confetti';
import { saveGuestbookMessage, subscribeGuestbook, isFirebaseConfigured } from '../services/firebase';

export default function Guestbook() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🔥');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const emojis = ['🔥', '🚀', '⚡', '💡', '🌟', '👏', '🤝'];

  useEffect(() => {
    const unsubscribe = subscribeGuestbook((data) => {
      setEntries(data);
    });
    return () => unsubscribe && unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);
    try {
      await saveGuestbookMessage({
        name: name.trim(),
        message: message.trim(),
        emoji: selectedEmoji
      });

      // Confetti celebration
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.8 }
        });
      } catch {
        // Confetti is decorative, safe to ignore
      }

      setName('');
      setMessage('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to save guestbook note:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="guestbook" className="py-16 sm:py-24 relative bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/50 border border-amber-800/60 mb-3">
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span>Interactive Wall</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Live Visitor Guestbook
          </h2>
          <p className="mt-2.5 sm:mt-3 text-slate-400 text-xs sm:text-sm md:text-base">
            Leave a quick note, shoutout, or feedback. Powered by real-time Firebase Firestore!
          </p>

          {/* Firebase Status Badge */}
          <div className="mt-4 inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
            <Database className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="text-slate-400">Backend:</span>
            {isFirebaseConfigured ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Firebase Firestore Live
              </span>
            ) : (
              <span className="text-amber-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Local Active (Add Firebase keys in .env to sync multi-client)
              </span>
            )}
          </div>
        </div>

        {/* Guestbook Grid: Form on Left, Live Wall on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Submission Form (5 cols) */}
          <div className="lg:col-span-5 p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Leave a Shoutout</span>
            </h3>
            <p className="text-xs text-slate-400 mb-5 sm:mb-6">
              Share what brought you here or drop some words of encouragement.
            </p>

            {success && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>Thank you! Your note has been added to the guestbook wall.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Your Name / Handle
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe or @handle"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Pick an Emoji
                </label>
                <div className="flex flex-wrap gap-2">
                  {emojis.map((emoji) => (
                    <button
                      type="button"
                      key={emoji}
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`text-lg p-2 rounded-xl transition-all cursor-pointer ${
                        selectedEmoji === emoji
                          ? 'bg-amber-500/20 border-2 border-amber-500 scale-110'
                          : 'bg-slate-800/40 border border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Your Note
                </label>
                <textarea
                  required
                  rows={3}
                  maxLength={160}
                  placeholder="Awesome projects! Loved the Groq AI speed..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                />
                <div className="text-right text-[10px] text-slate-500 mt-1">
                  {message.length}/160
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl font-semibold text-sm text-slate-900 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <span>Syncing to Firestore...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Post to Wall</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Wall / Messages Feed (7 cols) */}
          <div className="lg:col-span-7 space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {entries.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">
                No entries yet. Be the first to leave a shoutout!
              </div>
            ) : (
              entries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-colors flex items-start gap-3.5"
                >
                  <span className="text-2xl p-2 rounded-xl bg-slate-800/60 shrink-0 select-none">
                    {entry.emoji || '🔥'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-sm text-white truncate">
                        {entry.name}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono shrink-0">
                        {new Date(entry.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed break-words">
                      {entry.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
