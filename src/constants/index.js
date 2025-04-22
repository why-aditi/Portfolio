import img4 from "../assets/projects/Screenshot 2025-01-11 083607.png";
import img3 from "../assets/projects/donezo.png";
import img5 from "../assets/projects/FA.png";
import img6 from "../assets/projects/zoom.png";
import img2 from "../assets/projects/dr.png";
import img7 from "../assets/projects/ad.png";
import img8 from "../assets/projects/rec.png";
import img1 from "../assets/projects/rag-pdf.png";
import img9 from "../assets/projects/bg-remove.png";

export const HOME_CONTENT = `I'm a Full Stack Developer with expertise in Python, React.js, Node.js, FastAPI, and databases like PostgreSQL and MongoDB. I build scalable, high-performance web applications using cutting-edge frameworks and AI-driven solutions. My focus is developing intelligent, data-driven applications that anticipate future digital landscapes. Let's build something amazing together!`;

export const ABOUT_TEXT = `I'm currently pursuing my Bachelor's in Electronics and Communications Engineering at IIIT Pune. As a Full Stack Developer focused on Python and AI, I've mastered both front-end (React.js) and back-end (Node.js, Flask, FastAPI) technologies alongside MySQL and MongoDB.
<br /><br/>
I build scalable web applications with AI integration, specializing in efficient FastAPI back-ends. My machine learning expertise includes TensorFlow and PyTorch for data-driven solutions. I continuously expand my skillset with cloud computing, Docker, and Kubernetes.
<br /><br/>
My passion lies in deep learning and neural networks, where I focus on performance optimization. My goal: merging full-stack development with AI to create impactful, boundary-pushing solutions.`;

export const EXPERIENCES = [
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
    title: "A2K Financial Advisory",
    image: img5,
    link: "https://github.com/why-aditi/Financial-Advisory",
    description:
      "An AI-powered financial advisory platform offering spending insights, savings projections, and chatbot-driven advice, leveraging Azure Cognitive Services, OpenAI, and interactive dashboards.",
    technologies: ["MERN Stack", "Git", "Google Gemini"],
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
    title: "FormUp - Form Builder",
    image: img4,
    link: "https://github.com/why-aditi/FormUp",
    description:
      "A drag-and-drop form builder for creating dynamic, customizable forms with real-time preview, built using React, TypeScript, PostgreSQL, Prisma, Dnd-Kit, and Tailwind CSS.",
    technologies: [
      "NextJs",
      "TypeScript",
      "Dnd-Kit",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
    ],
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
    title: "Background Remover",
    image: img9,
    link: "https://github.com/why-aditi/BgRemover",
    description:
      "An AI-powered web app that removes backgrounds from images with a single click. Built using Streamlit for an intuitive UI and Python Imaging Library (PIL) for efficient image processing.",
    technologies: ["Streamlit", "PIL"],
  },
  {
    title: "Movie Recommendation System",
    image: img8,
    link: "https://github.com/why-aditi/Movie-Recommendation-System-CPP",
    description:
      "A collaborative filtering-based movie recommendation system. It predicts movie ratings for users and recommends top-rated movies based on user similarities.",
    technologies: ["C++", "Git"],
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
  {
    title: "Zoom Clone",
    image: img6,
    link: "https://github.com/why-aditi/Zoom-Clone",
    description:
      "A video conferencing application, leveraging WebRTC and Socket.io to enable real-time audio/video communication with dynamic room creation and management for multiple simultaneous video calls.",
    technologies: ["Node Js", "Express Js", "Socket.io"],
  },
];
