import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Trash2, 
  Settings, 
  Key, 
  Check, 
  ExternalLink,
  Flame,
  Zap
} from 'lucide-react';
import { sendGroqChatMessage, getGroqApiKey, setGroqApiKey } from '../services/groqService';
import { portfolioData } from '../data/portfolioData';

export default function AiChatbot({ isOpen, onClose, onOpen, initialQuery }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi there! 👋 I am **Aura**, ${portfolioData.personal.name}'s AI assistant powered by **Groq LPU™** ultra-fast inference.\n\nAsk me anything about my projects, tech stack, or internship availability!`,
      isSimulated: false,
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(() => getGroqApiKey());
  const [keySaved, setKeySaved] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    "🚀 What are your top projects?",
    "💻 What is your core tech stack?",
    "🤝 Can I hire you for an internship?",
    "⚡ Tell me about your DSA achievements"
  ];

  const handleSend = useCallback(async (textToSend) => {
    const query = typeof textToSend === 'string' ? textToSend : input;
    if (!query || !query.trim() || loading) return;

    const userMessage = { role: 'user', content: query.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Gather latest chat including the new message
      setMessages((prevMessages) => {
        sendGroqChatMessage(prevMessages)
          .then((assistantResponse) => {
            setMessages((finalPrev) => [...finalPrev, assistantResponse]);
          })
          .catch((err) => {
            console.error(err);
            setMessages((finalPrev) => [
              ...finalPrev,
              {
                role: 'assistant',
                content: `⚠️ **Groq API Error**: ${err.message || 'Something went wrong.'}\n\nPlease check your Groq API key in Settings or ensure it has valid credits.`,
                isError: true
              }
            ]);
          })
          .finally(() => {
            setLoading(false);
          });
        return prevMessages;
      });
    } catch {
      setLoading(false);
    }
  }, [input, loading]);

  // Handle queries passed from project cards ("Ask AI about this project")
  useEffect(() => {
    if (initialQuery) {
      const timer = setTimeout(() => {
        handleSend(initialQuery);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [initialQuery, handleSend]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, loading]);

  const handleSaveKey = (e) => {
    e.preventDefault();
    setGroqApiKey(apiKeyInput);
    setKeySaved(true);
    setTimeout(() => {
      setKeySaved(false);
      setShowSettings(false);
    }, 1500);
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: `Chat history cleared. How can I assist you today?`,
        isSimulated: false,
      }
    ]);
  };

  const activeKey = getGroqApiKey();

  // Helper to format text with bold, inline code, bullet points
  const renderFormattedText = (text) => {
    return text.split('\n').map((line, lineIdx) => {
      // Check for bullet lines
      const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
      const cleanLine = isBullet ? line.trim().substring(2) : line;

      // Parse bold **text** and `code`
      const parts = cleanLine.split(/(\*\*.*?\*\*|`.*?`)/g);

      return (
        <span 
          key={lineIdx} 
          className={`block min-h-[1.2em] ${isBullet ? 'pl-3 relative before:content-["•"] before:absolute before:left-0 before:text-cyan-400' : ''}`}
        >
          {parts.map((part, partIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={partIdx} className="font-semibold text-white">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            if (part.startsWith('`') && part.endsWith('`')) {
              return (
                <code key={partIdx} className="px-1 py-0.5 rounded bg-slate-950 font-mono text-cyan-300 text-[11px] border border-slate-800">
                  {part.slice(1, -1)}
                </code>
              );
            }
            return part;
          })}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating Action Button (Always Visible) */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-xl backdrop-blur-md text-xs text-slate-300 animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Ask my AI assistant</span>
          </div>

          <button
            onClick={onOpen}
            className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-2xl shadow-blue-500/40 hover:scale-110 active:scale-95 transition-all cursor-pointer group"
            aria-label="Open AI Chatbot"
          >
            {/* Halo pulse */}
            <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-30 pointer-events-none"></span>
            
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center group-hover:bg-transparent transition-colors">
              <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300 group-hover:text-white transition-colors" />
            </div>

            {/* Online Indicator */}
            <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-emerald-500 border-2 border-slate-950 rounded-full"></span>
          </button>
        </div>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:right-6 sm:bottom-6 z-50 sm:w-[420px] h-[520px] sm:h-[580px] max-h-[85vh] flex flex-col rounded-2xl sm:rounded-3xl bg-[#0b1120]/95 border border-slate-800 shadow-2xl shadow-black/80 backdrop-blur-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                  <Bot className="w-5 h-5 text-cyan-300" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#0b1120] rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-sm">
                    Aura AI
                  </h3>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60 flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5 fill-cyan-400" /> Groq LPU
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {portfolioData.personal.name}'s Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  showSettings ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title="Groq API Key Settings"
              >
                <Settings className="w-4 h-4" />
              </button>

              <button
                onClick={clearChat}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                title="Clear Chat History"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                title="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Settings Overlay (For entering Groq API key) */}
          {showSettings && (
            <div className="p-4 bg-slate-900/95 border-b border-slate-800 animate-in slide-in-from-top-4 duration-150">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-cyan-400" /> Groq API Configuration
                </span>
                <a
                  href="https://console.groq.com/keys"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
                >
                  Get free key <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                Add your Groq API key to unlock ultra-fast Llama-3.3-70b live inference. It is saved safely in your browser.
              </p>
              <form onSubmit={handleSaveKey} className="flex gap-2">
                <input
                  type="password"
                  placeholder="gsk_..."
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white flex items-center gap-1 cursor-pointer"
                >
                  {keySaved ? <Check className="w-3.5 h-3.5" /> : 'Save'}
                </button>
              </form>
            </div>
          )}

          {/* Simulated Mode Info Strip (if no API key) */}
          {!activeKey && !showSettings && (
            <div className="px-4 py-1.5 bg-amber-950/40 border-b border-amber-900/40 flex items-center justify-between text-[11px] text-amber-300">
              <span className="flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" /> Running in Smart Offline / Demo Mode
              </span>
              <button
                onClick={() => setShowSettings(true)}
                className="underline hover:text-white cursor-pointer"
              >
                Add Key
              </button>
            </div>
          )}

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-blue-950 border border-blue-800/80 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-xs shadow-md shadow-blue-600/20'
                      : msg.isError
                      ? 'bg-rose-950/70 border border-rose-800 text-rose-200 rounded-tl-xs'
                      : 'bg-slate-900/80 border border-slate-800 text-slate-200 rounded-tl-xs'
                  }`}
                >
                  {renderFormattedText(msg.content)}
                  {msg.isSimulated && (
                    <div className="mt-1 text-[9px] font-mono text-cyan-400/80">
                      ⚡ Demo response (add Groq key for live model)
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 justify-start items-center">
                <div className="w-7 h-7 rounded-lg bg-blue-950 border border-blue-800/80 flex items-center justify-center text-cyan-300 shrink-0">
                  <Bot className="w-4 h-4 animate-pulse" />
                </div>
                <div className="p-3 rounded-2xl rounded-tl-xs bg-slate-900/80 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                  <span>Groq LPU generating...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestion Chips */}
          <div className="px-3 py-2 bg-slate-950/60 border-t border-slate-800/60 overflow-x-auto flex gap-1.5 no-scrollbar">
            {suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                disabled={loading}
                className="text-[11px] font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about skills, projects, or hiring..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-40 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
