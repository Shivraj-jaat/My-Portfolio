import { portfolioData } from '../data/portfolioData';

// System prompt tailored with Shivraj's resume details
const generateSystemPrompt = () => {
  return `You are "Aura", an intelligent, friendly, and tech-savvy AI assistant representing ${portfolioData.personal.name}.
Your job is to answer questions from recruiters, hiring managers, and visitors about ${portfolioData.personal.name}'s portfolio, technical skills, projects, education, problem-solving abilities, and internship availability.

PORTFOLIO DETAILS:
- Name: ${portfolioData.personal.name}
- Title: ${portfolioData.personal.title}
- Seeking: ${portfolioData.personal.targetRole}
- Location: ${portfolioData.personal.location}
- Email: ${portfolioData.personal.email}
- Phone: ${portfolioData.personal.phone}
- Availability: ${portfolioData.personal.availableForHire ? "Currently seeking frontend / full-stack internship opportunities." : "Not actively seeking roles."}
- Bio: ${portfolioData.personal.bio}

EDUCATION:
${portfolioData.education.map(e => `- ${e.degree} at ${e.institution} (${e.period}) [${e.score}]`).join('\n')}

PROBLEM SOLVING & CODING PROFILES:
- HackerRank: 5-Star rating in Problem Solving
- Solved 200+ DSA problems across LeetCode & HackerRank
- Strong foundation in Data Structures, Algorithms, and Object-Oriented Programming (OOP)

SKILLS:
- Languages: ${portfolioData.skills.languages.map(s => s.name).join(', ')}
- Frontend: ${portfolioData.skills.frontend.map(s => s.name).join(', ')}
- Backend & DB: ${portfolioData.skills.backend.map(s => s.name).join(', ')}
- AI & Tools: ${portfolioData.skills.aiAndTools.map(s => s.name).join(', ')}

INTERNSHIP & EXPERIENCE:
${portfolioData.experiences.map(e => `- ${e.role} at ${e.company} (${e.period}): ${e.description}`).join('\n')}

FEATURED PROJECTS:
${portfolioData.projects.map(p => `- ${p.title} (${p.category}): ${p.description} [Tech: ${p.tags.join(', ')}]`).join('\n')}

EXTRACURRICULAR:
- National Service Scheme (NSS): Participated in 7-day special camps and Pre-Republic Day Camp; organized Blood Donation Camps and blood donor.

GUIDELINES:
1. Always be polite, professional, and enthusiastic.
2. If the user asks in Hindi or Hinglish, answer in natural, friendly Hinglish/Hindi. If they ask in English, answer in English.
3. Keep answers concise, informative, and engaging (2 to 4 sentences usually, unless detailed breakdown is requested).
4. Emphasize Shivraj's passion for learning, strong DSA fundamentals (200+ solved, 5-Star HackerRank), and practical MERN + AI projects.
5. Encourage recruiters to reach out through the Contact form or direct email (${portfolioData.personal.email}) or phone (${portfolioData.personal.phone}) for internship discussions.`;
};

// Simulated response generator for when Groq API key is not yet set
const getSmartSimulatedResponse = (query) => {
  const q = query.toLowerCase();
  
  if (q.includes("project") || q.includes("kaam") || q.includes("work")) {
    return `Maine 2 key standout projects build kiye hain:
1. **AI Interview Prep Platform**: Full-Stack MERN platform jo Google Gemini API ke sath dynamic mock interviews generate aur evaluate karta hai (JWT auth ke sath).
2. **Movie Explorer Website**: React + Tailwind app with TMDB/OMDb API integration aur dynamic movie routing.
3. **Groq AI Portfolio**: Yeh portfolio jisme fast Groq LPU inference aur Firebase Firestore guestbook integrated hai! 🚀`;
  }
  
  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language")) {
    return `Mera core tech stack **React.js, Node.js, Express.js, MongoDB (MERN)**, aur **Tailwind CSS** hai. Programming languages mein main **JavaScript** aur **Java** use karta hoon. Iske alawa maine **Gemini API (@google/genai)** aur **Groq API** ke sath GenAI integrations banaye hain! 💻`;
  }

  if (q.includes("dsa") || q.includes("leetcode") || q.includes("hackerrank") || q.includes("problem solving")) {
    return `Main problem-solving par continuously focus karta hoon! **HackerRank par mera 5-Star Problem Solving rating** hai aur maine **LeetCode aur HackerRank par 200+ DSA problems** solve kiye hain. OOP aur Core CS concepts par solid grip hai! ⚡`;
  }

  if (q.includes("education") || q.includes("college") || q.includes("degree") || q.includes("study") || q.includes("padhai")) {
    return `Main currently **Institute of Technology and Management (ITM), Gwalior** se B.Tech in Information Technology kar raha hoon (2024 - 2028 batch) with a **7.95/10 CGPA**. Class 10th aur 12th dono mein mere **90% marks** the! 🎓`;
  }
  
  if (q.includes("hire") || q.includes("intern") || q.includes("contact") || q.includes("reach") || q.includes("email") || q.includes("phone")) {
    return `Main actively **Frontend / Full-Stack Developer Internship** dhoondh raha hoon! Aap mujhse direct email (**${portfolioData.personal.email}**) ya phone (**${portfolioData.personal.phone}**) par connect kar sakte hain, ya neeche Contact form fill kar sakte hain! 📬`;
  }

  if (q.includes("who are you") || q.includes("about") || q.includes("kaun ho") || q.includes("intro")) {
    return `Main ${portfolioData.personal.name} ka personal AI assistant hoon, powered by Groq LPU speed! Shivraj ITM Gwalior ke B.Tech IT student hain jo MERN stack, REST APIs aur GenAI tools par hands-on apps banate hain. Aap mujhse unke projects, skills, ya education ke baare mein kuch bhi poochh sakte hain! ✨`;
  }

  return `Hey there! Main ${portfolioData.personal.name} ka portfolio assistant hoon. Aap mujhse Shivraj ke projects (AI Interview Prep, Movie Explorer), skills, DSA achievements, ya internship opportunity ke baare mein kuch bhi poochh sakte hain! ⚡`;
};

export const getGroqApiKey = () => {
  return localStorage.getItem('custom_groq_api_key') || import.meta.env.VITE_GROQ_API_KEY || '';
};

export const setGroqApiKey = (key) => {
  if (key) {
    localStorage.setItem('custom_groq_api_key', key.trim());
  } else {
    localStorage.removeItem('custom_groq_api_key');
  }
};

const CANDIDATE_MODELS = [
  import.meta.env.VITE_GROQ_MODEL,
  'qwen/qwen3.8-27b',
  'llama-3.3-70b-versatile',
  'llama-3.1-8b-instant',
  'llama3-70b-8192'
].filter(Boolean);

export const sendGroqChatMessage = async (chatHistory) => {
  const apiKey = getGroqApiKey();
  const latestUserMessage = chatHistory[chatHistory.length - 1]?.content || '';

  // If no API key is provided, use smart simulated fallback
  if (!apiKey) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      role: 'assistant',
      content: getSmartSimulatedResponse(latestUserMessage),
      isSimulated: true
    };
  }

  const formattedMessages = [
    { role: 'system', content: generateSystemPrompt() },
    ...chatHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }))
  ];

  let lastError = null;

  // Try candidate models in order (e.g., qwen/qwen3.8-27b, llama-3.3-70b-versatile, etc.)
  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: formattedMessages,
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices[0]?.message?.content?.trim();
        if (content) {
          return {
            role: 'assistant',
            content,
            isSimulated: false,
            modelUsed: model
          };
        }
      }

      const errData = await response.json().catch(() => ({}));
      lastError = new Error(errData.error?.message || `Groq API ${response.status}: ${response.statusText}`);
      
      // If error is not a 404 (model not found), don't keep trying models for auth failure
      if (response.status === 401 || response.status === 403) {
        break;
      }
    } catch (err) {
      lastError = err;
    }
  }

  console.warn('Groq live inference failed, using smart fallback response:', lastError);

  // Return smart simulated fallback with subtle notice instead of breaking the chat
  return {
    role: 'assistant',
    content: getSmartSimulatedResponse(latestUserMessage),
    isSimulated: true
  };
};
