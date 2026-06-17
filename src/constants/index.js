import img3 from "../assets/projects/donezo.png";
import img2 from "../assets/projects/dr.png";
import img7 from "../assets/projects/ad.png";
import img1 from "../assets/projects/rag-pdf.png";
import img10 from "../assets/projects/kalamitra.png";
import img6 from "../assets/projects/Screenshot 2026-01-14 005949.png";
import imgBlindspot from "../assets/projects/blindspot.png";

export const HOME_CONTENT = {
  name: "Aditi Kala",
  taglines: [
    "I build things that think.",
    "Full-stack products with AI where it actually helps.",
    "From FastAPI and databases to interfaces that feel right.",
    "Engineering calm out of messy, real-world problems.",
  ],
};

export const ABOUT_TEXT = `I'm an Electronics & Communications Engineering student at IIIT Pune (graduating May 2026) who'd rather ship a working prototype than write a perfect plan. I work across the stack — React on the front, FastAPI / Node on the back — and reach for ML when a problem genuinely deserves it.

Most of my work sits at the seam between products and intelligence: LLM pipelines, voice and vision agents, real-time systems, and the boring-but-critical glue that makes them dependable. I care about latency, clear interfaces, and code other people can read six months later.

Outside of features and benchmarks, I'm drawn to the craft — small details, type that breathes, animations that hint instead of shout. The goal is the same as ever: build things that feel inevitable to use.`;

export const EXPERIENCES = [
  {
    company: "AI Assistant",
    role: "Software Engineer Intern",
    period: "June 2025 – Present",
    location: "Pune",
    points: [
      "Built an automated agent QA framework with scripted and LLM-to-LLM test modes and an LLM scoring engine, cutting manual validation time by 60%.",
      "Improved and scaled a production voice AI calling system, refining agent prompts and qualification logic to handle 200+ automated lead calls per day across multiple telephony providers.",
      "Integrated and customized the HeyGen live-avatar SDK for real-time talking avatars, decoupling rendering from voice to support both HeyGen's native voice and third-party providers, increasing user engagement by 30%.",
    ],
    technologies: ["Python", "Node.js", "PostgreSQL", "Docker", "React.js", "React Native"],
  },
  {
    company: "ThirdEye AI",
    role: "Python Developer Intern",
    period: "Dec 2024 – Dec 2024",
    location: "Gurugram",
    points: [
      "Developed a machine learning shoplifting detection system using action recognition, improving detection accuracy by 10%.",
      "Implemented a real-time push notification system in Flask using the Web Push API to deliver zone-based vehicle entry alerts, handling up to 100 simultaneous alerts without delay.",
    ],
    technologies: ["Python", "Flask", "PyTorch", "OpenCV", "MongoDB"],
  },
];

export const PROJECTS = [
  {
    title: "Foundrly",
    image: img6,
    github: "https://github.com/keshav1441/Foundrly",
    liveDemo: "https://foundrly-pearl.vercel.app/",
    description: "A startup matchmaking platform with real-time swipe mechanics, Gemini-powered pitch tools, and live chat.",
    points: [
      "Gemini-powered AI pipelines for idea generation, roasting, and pitch rewriting, with multi-step prompts and structured output validation.",
      "Tinder-style swipe mechanics with Framer Motion via drag constraints and spring physics.",
    ],
    tech: ["Node.js", "Express.js", "MongoDB", "React.js", "Google Gemini", "Socket.IO"],
  },
  {
    title: "Blindspot",
    image: imgBlindspot,
    github: "https://github.com/why-aditi/Blindspot",
    liveDemo: "https://blindspot-zeta.vercel.app/",
    description: "An AI bias detection and fairness platform — audit datasets, score model fairness, explain predictions, and monitor drift before deployment.",
    points: [
      "Built a FairScore API returning 0–100 fairness ratings with SHAP attribution, counterfactuals, and plain-English summaries via Groq.",
      "NLP scanner detects gendered language, age bias, and socioeconomic markers; drift monitor uses Evidently AI to flag distribution shifts.",
      "Full-stack: FastAPI + Supabase backend deployed on Render, React + TypeScript frontend on Vercel.",
    ],
    tech: ["FastAPI", "React", "TypeScript", "SHAP", "Fairlearn", "spaCy", "Evidently AI", "Supabase", "Groq"],
  },
  {
    title: "Kalamitra",
    image: img10,
    github: "https://github.com/why-aditi/kalamitra",
    liveDemo: "https://kalamitra-seven.vercel.app/",
    description: "A voice-first artisan marketplace using Web Speech API and Gemini to auto-generate listings, cutting listing effort by 80% for non-literate sellers.",
    points: [
      "Built voice-driven listing creation with Web Speech API and Google Gemini, reducing listing effort by 80%.",
      "Integrated Stripe payments, multilingual Gemini generation with Google Cloud Translate, and voice search for faster buyer discovery.",
      "Built a Gemini-backed helper chatbot resolving 30+ user queries in testing.",
    ],
    tech: ["Next.js", "MongoDB", "Firebase", "FastAPI", "Tailwind CSS", "Google Gemini", "Stripe", "Docker"],
  },
  {
    title: "Donezo",
    image: img3,
    github: "https://github.com/why-aditi/Donezo",
    liveDemo: null,
    description: "A full-stack collaborative task management platform with role-based access control and real-time updates.",
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
    description: "A file-based chatbot using Retrieval-Augmented Generation — upload PDFs and interact with their content via semantic search.",
    points: [
      "FastAPI backend with React frontend, powered by LangChain and Google Gemini.",
      "Supports multi-document ingestion with semantic chunking and vector search.",
    ],
    tech: ["FastAPI", "React.js", "LangChain", "Google Gemini"],
  },
  {
    title: "Diabetic Retinopathy Detection",
    image: img2,
    github: "https://github.com/why-aditi/Diabetic-Retinopathy",
    liveDemo: null,
    description: "Deep learning pipeline using DenseNet-201 to classify retinal fundus images across 5 severity grades with 82% accuracy.",
    points: [
      "DenseNet-201 architecture fine-tuned on fundus image dataset.",
      "Achieves 82% classification accuracy across 5 severity grades.",
    ],
    tech: ["Python", "TensorFlow", "Pandas", "NumPy"],
  },
  {
    title: "Semantic Segmentation",
    image: img7,
    github: "https://www.kaggle.com/code/aditishere/btp-test",
    liveDemo: null,
    description: "Custom DeepLabV3+ with dual attention for 32-class urban scene segmentation on CamVid, benchmarked against U-Net and FPN.",
    points: [
      "Built a custom DeepLabV3+ (ResNet-50) with dual attention and a custom ASPP head for 32-class urban-scene segmentation on CamVid.",
      "Achieved 77% pixel accuracy with per-class IoU up to 0.88, outperforming U-Net and FPN baselines.",
    ],
    tech: ["Python", "PyTorch", "OpenCV", "NumPy"],
  },
];

export const ACHIEVEMENTS = [
  { title: "LeetCode Top 8.3%", detail: "500+ problems solved, max rating 1792", year: "Ongoing" },
  { title: "Kakushin 9.0 Finalist", detail: "Nomura Hackathon — top team from 500+", year: "2025" },
  { title: "ScriptedByHer Finalist", detail: "Meesho — Top 40 of 50,000+ participants", year: "2025" },
  { title: "NEST Semi-Finalist", detail: "Novartis — top team from 6,000+", year: "2025" },
];

export const SKILLS = {
  Languages: ["C", "C++", "Python", "Java", "SQL"],
  Frameworks: ["React.js", "Node.js", "Express.js", "FastAPI", "Flask", "PyTorch", "TensorFlow", "React Native", "Tailwind CSS", "Material-UI"],
  Tools: ["Git", "GitHub", "VS Code", "PyCharm", "Figma", "Jupyter", "Docker"],
  "Cloud / DB": ["PostgreSQL", "MongoDB", "Firebase"],
  Coursework: ["DBMS", "DSA", "OOPs", "OS", "Machine Learning", "Computer Vision", "Embedded Systems"],
};
