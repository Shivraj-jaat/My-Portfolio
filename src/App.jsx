import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Guestbook from './components/Guestbook';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AiChatbot from './components/AiChatbot';

export default function App() {
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [chatInitialQuery, setChatInitialQuery] = useState('');

  const handleOpenAiChat = () => {
    setIsAiChatOpen(true);
  };

  const handleCloseAiChat = () => {
    setIsAiChatOpen(false);
  };

  const handleAskAboutProject = (projectTitle) => {
    setChatInitialQuery(`Tell me more about the project: "${projectTitle}". What architecture and tech stack does it use?`);
    setIsAiChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Navigation */}
      <Navbar onOpenAiChat={handleOpenAiChat} />

      {/* Main Content Sections */}
      <main>
        <Hero onOpenAiChat={handleOpenAiChat} />
        <About />
        <Skills />
        <Projects onAskAboutProject={handleAskAboutProject} />
        <Guestbook />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Groq AI Chatbot Assistant Widget */}
      <AiChatbot
        isOpen={isAiChatOpen}
        onOpen={handleOpenAiChat}
        onClose={handleCloseAiChat}
        initialQuery={chatInitialQuery}
      />
    </div>
  );
}
