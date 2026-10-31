export const portfolioData = {
  personal: {
    name: "Shivraj Jat",
    title: "Full-Stack Developer & B.Tech IT Student",
    tagline: "Building scalable MERN web applications, robust REST APIs & integrating modern GenAI into production-grade user experiences.",
    location: "Gwalior, India",
    phone: "+91-8817584489",
    email: "jatshivraj130@gmail.com",
    availableForHire: true,
    targetRole: "Frontend / Full-Stack Developer Intern",
    resumeUrl: "#",
    socials: {
      github: "https://github.com/Shivraj-jaat",
      linkedin: "https://linkedin.com",
      leetcode: "https://leetcode.com",
      email: "mailto:jatshivraj130@gmail.com"
    },
    bio: "Second-year B.Tech IT student at ITM Gwalior and enthusiastic full-stack developer skilled in React.js, Node.js, Express.js, MongoDB, REST APIs, JWT authentication, and responsive UI development. Built and deployed multiple web applications using React, Tailwind CSS, Vercel, and Render. Seeking a frontend/full-stack internship to contribute to real-world products and strengthen production-level development skills."
  },
  
  stats: [
    { label: "DSA Problems Solved", value: "200+" },
    { label: "HackerRank Problem Solving", value: "5-Star" },
    { label: "B.Tech IT CGPA", value: "7.95/10" },
    { label: "Class X & XII Score", value: "90%" }
  ],

  codingProfiles: [
    {
      platform: "HackerRank",
      achievement: "5-Star Rating in Problem Solving",
      detail: "Strong foundation in Data Structures, Algorithms & Logic",
      url: "https://hackerrank.com"
    },
    {
      platform: "LeetCode & HackerRank",
      achievement: "200+ DSA Problems Solved",
      detail: "Arrays, Strings, Recursion, LinkedLists, Trees & OOP",
      url: "https://leetcode.com"
    }
  ],

  skills: {
    languages: [
      { name: "JavaScript (ES6+)", level: "Advanced", icon: "FileCode" },
      { name: "TypeScript", level: "Advanced", icon: "Code2" },
      { name: "Java", level: "Intermediate", icon: "Code2" }
    ],
    frontend: [
      { name: "React.js", level: "Expert", icon: "Code2" },
      { name: "Next.js (App Router)", level: "Advanced", icon: "Globe" },
      { name: "Tailwind CSS", level: "Expert", icon: "Palette" }
    ],
    backend: [
      { name: "Node.js & Express", level: "Advanced", icon: "Server" },
      { name: "REST APIs & JWT", level: "Expert", icon: "Network" },
      { name: "MongoDB & Mongoose", level: "Advanced", icon: "Database" }
    ],
    aiAndTools: [
      { name: "Groq Cloud (LPU 800+ tps)", level: "Expert", icon: "Zap" },
      { name: "Google Gemini API", level: "Advanced", icon: "Sparkles" },
      { name: "Firebase Firestore", level: "Advanced", icon: "DatabaseZap" },
      { name: "Git, GitHub & Vercel", level: "Advanced", icon: "GitBranch" }
    ],
    csFundamentals: [
      "Data Structures & Algorithms (200+ Problems)",
      "Object-Oriented Programming (OOP)",
      "RESTful API & Client-Server Architecture"
    ]
  },

  projects: [
    {
      id: "chatgpt-clone-groq",
      title: "ChatGPT Clone (Groq Edition) ⚡",
      description: "High-fidelity, pixel-perfect copy of ChatGPT powered by Groq LPUs for 300 to 800+ tokens/sec streaming, featuring DeepSeek-R1 reasoning, Whisper voice input, Flux.1 image generation & Firebase sync.",
      category: "AI & GenAI",
      tags: ["Next.js (App Router)", "TypeScript", "Groq LPU", "DeepSeek-R1", "Tailwind CSS", "Firebase Firestore", "KaTeX"],
      github: "https://github.com/Shivraj-jaat",
      live: "#",
      image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
      featured: true,
      highlights: [
        "Real-time token streaming (300-800+ tps) across LLaMA 3.3, DeepSeek-R1 (collapsible reasoning thoughts), and Vision models",
        "Voice Chat transcription with Groq Whisper & built-in free Flux.1 high-resolution AI image generation",
        "KaTeX LaTeX mathematical rendering, code syntax highlighting with one-click copy, and multi-session Firebase sync"
      ]
    },
    {
      id: "ai-interview-prep",
      title: "AI Interview Prep Platform",
      description: "Full-stack MERN platform that runs AI-powered mock interviews, dynamically generating questions and evaluating candidate answers via the Gemini API.",
      category: "Full Stack",
      tags: ["MERN Stack", "Gemini API (@google/genai)", "JWT", "Tailwind CSS", "Vercel", "Render"],
      github: "https://github.com/Shivraj-jaat",
      live: "#",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      featured: true,
      highlights: [
        "AI-powered mock interviews with dynamic question generation and answer evaluation using Gemini API",
        "JWT-based authentication with role-based access for user & admin dashboards, interview history & analytics",
        "RESTful APIs with search, filtering, and pagination deployed live on Vercel and Render"
      ]
    },
    {
      id: "groq-ai-portfolio",
      title: "Groq Fast-Inference AI Portfolio & Hub",
      description: "Production-grade portfolio featuring Aura AI chatbot powered by Groq LPU inference and real-time visitor guestbook using Firebase Firestore.",
      category: "AI & GenAI",
      tags: ["React 19", "Groq API", "Tailwind CSS", "Firebase Firestore", "Vite"],
      github: "https://github.com/Shivraj-jaat/My-Portfolio",
      live: "#",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      featured: true,
      highlights: [
        "Inference speeds up to 300+ tokens/sec using Groq LPU with Qwen & LLaMA",
        "AI Assistant grounded in Shivraj's technical resume, skills, and education",
        "Real-time Firebase Firestore visitor messages and guestbook wall"
      ]
    },
    {
      id: "movie-explorer",
      title: "Movie Explorer Website",
      description: "Responsive multi-page movie discovery application with trending/popular movies, instant search, dynamic movie-ID routing, and rich detail views.",
      category: "Frontend",
      tags: ["React.js", "Tailwind CSS", "React Router DOM", "TMDB/OMDb API", "JavaScript"],
      github: "https://github.com/Shivraj-jaat",
      live: "#",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
      featured: false,
      highlights: [
        "Dynamic movie-ID routing across Home, Listings, Search, Details, and Error pages with React Router DOM",
        "Integrated TMDB/OMDb APIs with robust loading/error handling and modular reusable components",
        "Responsive movie discovery UI built with modern Tailwind CSS utility styling"
      ]
    }
  ],

  experiences: [
    {
      role: "Frontend Development Intern",
      company: "Gitecgo.",
      period: "Sep 2025 - Dec 2025",
      description: "Completed project-based training on responsive web development, mastering HTML5, CSS3, Tailwind CSS, and React.js fundamentals. Built modular UI components and interactive web pages, adhering to modern frontend coding standards and cross-browser responsiveness."
    }
  ],

  education: [
    {
      degree: "B.Tech in Information Technology",
      institution: "Institute of Technology and Management (ITM)",
      period: "Aug 2024 - Jul 2028",
      score: "CGPA: 7.95 / 10",
      location: "Gwalior, India"
    },
    {
      degree: "Higher Secondary (Class X & XII)",
      institution: "Govt. Hr. Sec. School No. 1, Morar",
      period: "Jun 2021 - Jul 2023",
      score: "Class X: 90% | Class XII: 90%",
      location: "Gwalior, India"
    }
  ],

  extracurricular: [
    {
      title: "National Service Scheme (NSS)",
      description: "Participated in Seven-Day Special Camps and a Pre-Republic Day Camp; organized Blood Donation Camps and personally donated blood."
    }
  ]
};
