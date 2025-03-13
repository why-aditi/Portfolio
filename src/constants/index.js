import img4 from "../assets/projects/Screenshot 2025-01-11 083607.png";
import img3 from "../assets/projects/donezo.png";
import img5 from "../assets/projects/FA.png";
import img6 from "../assets/projects/zoom.png";
import img2 from "../assets/projects/dr.png";
import img7 from "../assets/projects/ad.png";
import img8 from "../assets/projects/rec.png";

export const HOME_CONTENT = `I am a passionate Full Stack Developer with a comprehensive skill set in Python and emerging technologies. Over the past few years, I have honed my expertise across front-end and back-end technologies, including React.js, Node.js, FastAPI, and databases like PostgreSQL and MongoDB. My technical approach focuses on building scalable, high-performance web applications that leverage cutting-edge frameworks and AI-driven solutions. Committed to continuous learning and technological excellence, I specialize in developing intelligent, data-driven applications that not only meet current technological demands but anticipate future digital landscapes.`;

export const ABOUT_TEXT = `I'm currently pursuing my Bachelor's in Electronics and Communications Engineering at the Indian Institute of Information Technology, Pune. As a Full Stack Developer with a keen focus on Python and AI, I've honed my skills in both front-end and back-end technologies, including React.js, Node.js, Flask FastAPI, MySQL, and MongoDB. Over the past few years, I've worked on building scalable, high-performance web applications while leveraging AI to integrate innovative features. I specialize in crafting efficient back-end systems with FastAPI and am always eager to take on new technological challenges.
<br /><br/>
Beyond web development, I've delved deeply into machine learning, utilizing frameworks like TensorFlow and PyTorch to create data-driven solutions. My drive for continuous growth leads me to explore new tools like cloud computing, Docker, and Kubernetes, ensuring I stay ahead in the rapidly evolving tech landscape. With a strong interest in AI, particularly deep learning and neural networks, I focus on optimizing performance and developing intelligent applications. My ultimate goal is to merge my full-stack development expertise with AI to create impactful, scalable solutions that push the boundaries of what technology can achieve.`;

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
    demoLink: "https://a2k-financial-advisory.vercel.app",
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
    demoLink: "https://formup-builder.vercel.app",
    description:
      "A drag-and-drop form builder for creating dynamic, customizable forms with real-time preview, built using React, TypeScript, PostgreSQL, Prisma, Dnd-Kit, and Tailwind CSS.",
    technologies: [
      "React",
      "TypeScript",
      "Dnd-Kit",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
    ],
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
