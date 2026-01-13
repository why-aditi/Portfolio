import img3 from "../assets/projects/donezo.png";
import img2 from "../assets/projects/dr.png";
import img7 from "../assets/projects/ad.png";
import img1 from "../assets/projects/rag-pdf.png";
import img10 from "../assets/projects/kalamitra.png";
import img6 from "../assets/projects/Screenshot 2026-01-14 005949.png";

export const HOME_CONTENT = `I'm a Full Stack Developer with expertise in Python, React.js, Node.js, FastAPI, and databases like PostgreSQL and MongoDB. I build scalable, high-performance web applications using cutting-edge frameworks and AI-driven solutions. My focus is developing intelligent, data-driven applications that anticipate future digital landscapes. Let's build something amazing together!`;


export const ABOUT_TEXT = `I'm currently pursuing my Bachelor's in Electronics and Communications Engineering at IIIT Pune. As a Full Stack Developer focused on Python and AI, I've mastered both front-end (React.js) and back-end (Node.js, Flask, FastAPI) technologies alongside MySQL and MongoDB.
<br /><br/>
I build scalable web applications with AI integration, specializing in efficient FastAPI back-ends. My machine learning expertise includes TensorFlow and PyTorch for data-driven solutions. I continuously expand my skillset with cloud computing, Docker, and Kubernetes.
<br /><br/>
My passion lies in deep learning and neural networks, where I focus on performance optimization. My goal: merging full-stack development with AI to create impactful, boundary-pushing solutions.`;

export const EXPERIENCES = [
  {
    year: "June-2025 to Present",
    role: "Software Engineer Intern",
    company: "AI Assistant",
    description: [
      "Built and delivered customer AI agents for diverse clients, enabling SMS and email–based automation to drive engagement and optimize business workflows.",
      "Integrated AI agents with Notion and HubSpot CRM, ensuring smooth data synchronization and enhancing customer interaction workflows.",
      "Created automated test suites for AI agents to validate accuracy, latency, and edge cases, reducing performance validation time by 60% and improving deployment reliability. ",
    ],
    technologies: ["Python", "Node.Js", "Postgres"],
  },
  {
    year: "Dec-2024 to January-2025",
    role: "Python Developer Intern",
    company: " ThirdEye AI (A JBM Group Company)",
    description: [
      "Developed a robust RESTful API with Flask for systematic time series analysis, delivering insights that resolved key performance bottlenecks.",
      "Worked on a shoplifting detection system leveraging action recognition techniques to identify suspicious behaviors in real-time.",
      "Created and optimized a real-time push notification system to alert clients when a vehicle enters a designated area, handling multiple vehicles and delivering personalized alerts based on location and vehicle data.",
    ],
    technologies: ["Python", "Flask", "Pytorch", "OpenCV", "MongoDB"],
  },
];

export const PROJECTS = [
  {
    title: "Foundrly",
    image: img6,
    link: "https://github.com/keshav1441/Foundrly",
    description:
      "Foundrly is a Tinder-inspired swipe-based matching app for founders with terrible startup ideas. Swipe through ideas, send requests to idea creators, match when requests are accepted, and chat in real-time.",
    technologies: ["React JS", "Node Js", "Google Gemini", "MongoDB", "Socket.IO"],
  },
  {
    title: "Kalamitra",
    image: img10,
    link: "https://github.com/why-aditi/kalamitra",
    description:
      "An AI-powered artisan marketplace enabling voice-based listing creation, multilingual support, and chatbot-guided navigation, built with Gemini, Stripe, and an intuitive web dashboard.",
    technologies: [
      "NextJs",
      "TypeScript",
      "Firebase",
      "MongoDB",
      "Stripe",
      "Google Gemini",
      "FastAPI",
    ],
  },
  {
    title: "Donezo",
    image: img3,
    link: "https://github.com/why-aditi/Donezo",
    description:
      "A full-stack collaborative task management platform with role-based access control.",
    technologies: ["MERN Stack", "Git"],
  },
  {
    title: "RAG PDF Chat Assistant",
    image: img1,
    link: "https://github.com/why-aditi/Chatbot",
    description:
      "A file-based chatbot built using Retrieval-Augmented Generation (RAG), allowing users to upload PDFs and interact with their content. Combines a FastAPI backend with a React frontend, powered by LangChain and Google Gemini.",
    technologies: ["FastAPI", "React", "LangChain", "Google Gemini"],
  },
  {
    title: "Diabetic Retinopathy Detection",
    image: img2,
    link: "https://github.com/why-aditi/Diabetic-Retinopathy",
    description:
      "Diabetic Retinopathy Detection: A deep learning approach utilizing DenseNet-201 architecture to classify retinal images with 82% accuracy.",
    technologies: ["Python", "Tensorflow", "Pandas", "Numpy"],
  },
  {
    title:
      "Semantic Object Segmentation for Autonomous Vehicles in Urban Traffic Scenes",
    image: img7,
    link: "https://www.kaggle.com/code/aditishere/btp-test",
    description:
      "Using U-Net architecture to achieve 76% accuracy in identifying and classifying critical objects in complex traffic scenes.",
    technologies: ["Python", "Pytorch", "Pandas", "Numpy"],
  },
];
