import img3 from "../assets/projects/donezo.png";
import img2 from "../assets/projects/dr.png";
import img7 from "../assets/projects/ad.png";
import img1 from "../assets/projects/rag-pdf.png";
import img10 from "../assets/projects/kalamitra.png";
import img6 from "../assets/projects/Screenshot 2026-01-14 005949.png";

export const HOME_CONTENT = {
  name: "Aditi Kala",
  taglines: [
    "I build things that think.",
    "Full-stack products with AI where it actually helps.",
    "From FastAPI and databases to interfaces that feel right.",
    "Engineering calm out of messy, real-world problems.",
  ],
};

export const ABOUT_TEXT = `I'm a Electronics & Communications Engineering graduate from IIIT Pune who'd rather ship a working prototype than write a perfect plan. I work across the stack — React on the front, FastAPI / Node on the back — and reach for ML when a problem genuinely deserves it.

Most of my work sits at the seam between products and intelligence: LLM pipelines, voice and vision agents, real-time systems, and the boring-but-critical glue that makes them dependable. I care about latency, clear interfaces, and code other people can read six months later.

Outside of features and benchmarks, I'm drawn to the craft — small details, type that breathes, animations that hint instead of shout. The goal is the same as ever: build things that feel inevitable to use.`;

export const EXPERIENCES = [
  {
    company: "AI Assistant",
    role: "Software Engineer Intern",
    period: "June 2025 – Present",
    location: "Pune",
    points: [
      "Created automated test suites and call-review workflows to validate agent accuracy, cutting manual validation time by 60%.",
      "Deployed automated voice AI agents for a client, qualifying leads and scheduling 200+ sales calls per day.",
      "Integrated a live video avatar agent into the core platform using external APIs, increasing user engagement by 30%.",
    ],
    technologies: ["Python", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    company: "ThirdEye AI",
    role: "Python Developer Intern",
    period: "Dec 2024 – Jan 2025",
    location: "Gurugram",
    points: [
      "Designed and developed a RESTful API using Flask, reducing latency by 15% and improving scalability for time-series analysis.",
      "Created a scalable ML-based shoplifting detection system, improving accuracy by 10% using action recognition techniques.",
      "Incorporated a real-time push notification system managing up to 100 simultaneous alerts without delay.",
    ],
    technologies: ["Python", "Flask", "PyTorch", "OpenCV", "MongoDB"],
  },
];

export const PROJECTS = [
  {
    title: "Foundrly",
    image: img6,
    github: "https://github.com/keshav1441/Foundrly",
    liveDemo: null,
    description: "A startup matchmaking platform with Tinder-style swipe mechanics, AI-powered pitch tools, and real-time chat.",
    points: [
      "Built backend supporting 100 concurrent connections with real-time swipe, match, and chat via Socket.io.",
      "Implemented Gemini-powered AI pipelines for idea generation, roasting, and pitch rewriting.",
      "Tinder-style swipe mechanics using Framer Motion with drag constraints and spring physics.",
    ],
    tech: ["Node.js", "Express.js", "MongoDB", "React.js", "Google Gemini", "Socket.IO"],
  },
  {
    title: "Kalamitra",
    image: img10,
    github: "https://github.com/why-aditi/kalamitra",
    liveDemo: null,
    description: "A voice-first marketplace enabling artisans to list products via speech and image upload.",
    points: [
      "Enabled artisans to create product listings via speech and image upload, reducing listing effort by 80%.",
      "Integrated Stripe payments and a buyer dashboard, enabling seamless order placement and tracking.",
      "Added multilingual support and a helper chatbot handling 30+ user queries in testing.",
    ],
    tech: ["Next.js", "MongoDB", "Firebase", "FastAPI", "Tailwind CSS", "Google Gemini", "Stripe", "Docker"],
  },
  {
    title: "Donezo",
    image: img3,
    github: "https://github.com/why-aditi/Donezo",
    liveDemo: null,
    description: "A full-stack collaborative task management platform with role-based access control.",
    points: [
      "Built role-based access control with admin, member, and guest permission levels.",
      "Real-time task updates and notifications via Socket.io.",
    ],
    tech: ["React.js", "Node.js", "MongoDB", "Express.js"],
  },
  {
    title: "RAG PDF Chat Assistant",
    image: img1,
    github: "https://github.com/why-aditi/Chatbot",
    liveDemo: null,
    description: "A file-based chatbot using Retrieval-Augmented Generation — upload PDFs and interact with their content.",
    points: [
      "Combines a FastAPI backend with React frontend, powered by LangChain and Google Gemini.",
      "Supports multi-document ingestion with semantic chunking and vector search.",
    ],
    tech: ["FastAPI", "React.js", "LangChain", "Google Gemini"],
  },
  {
    title: "Diabetic Retinopathy Detection",
    image: img2,
    github: "https://github.com/why-aditi/Diabetic-Retinopathy",
    liveDemo: null,
    description: "Deep learning approach using DenseNet-201 to classify retinal images with 82% accuracy.",
    points: [
      "DenseNet-201 architecture fine-tuned on fundus image dataset.",
      "Achieves 82% classification accuracy across 5 severity grades.",
    ],
    tech: ["Python", "TensorFlow", "Pandas", "NumPy"],
  },
  {
    title: "Semantic Object Segmentation",
    image: img7,
    github: "https://www.kaggle.com/code/aditishere/btp-test",
    liveDemo: null,
    description: "U-Net architecture achieving 76% accuracy identifying objects in complex urban traffic scenes.",
    points: [
      "U-Net trained on Cityscapes dataset for autonomous vehicle perception.",
      "76% mean IoU across 19 semantic classes.",
    ],
    tech: ["Python", "PyTorch", "Pandas", "NumPy"],
  },
];

export const ACHIEVEMENTS = [
  { title: "LeetCode Top 7.8%", detail: "500+ problems solved, max rating 1791", year: "Ongoing", emoji: "🧠" },
  { title: "Kakushin 9.0 Finalist", detail: "Nomura Hackathon — top team from 500+", year: "2025", emoji: "🏆" },
  { title: "ScriptedByHer Finalist", detail: "Meesho — Top 40 of 50,000+ participants", year: "2025", emoji: "⚡" },
  { title: "NEST Semi-Finalist", detail: "Novartis — top team from 6,000+", year: "2025", emoji: "🔬" },
];

export const SKILLS = {
  Languages: ["C", "C++", "Python", "Java", "SQL"],
  Frameworks: ["React.js", "React Native", "Node.js", "Express.js", "TensorFlow", "PyTorch", "FastAPI", "Flask", "Tailwind CSS"],
  Tools: ["Git", "GitHub", "VS Code", "PyCharm", "Figma", "Jupyter", "Docker"],
  "Cloud / DB": ["PostgreSQL", "MongoDB", "Firebase", "SQL"],
};
