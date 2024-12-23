import img1 from "../assets/projects/project-1.jpg";
import img2 from "../assets/projects/project-2.jpg";
import img4 from "../assets/projects/project-4.jpg";

export const HOME_CONTENT = `I am a passionate Full Stack Developer with a comprehensive skill set in Python and emerging technologies. Over the past few years, I have honed my expertise across front-end and back-end technologies, including React.js, Node.js, FastAPI, and databases like PostgreSQL and MongoDB. My technical approach focuses on building scalable, high-performance web applications that leverage cutting-edge frameworks and AI-driven solutions. Committed to continuous learning and technological excellence, I specialize in developing intelligent, data-driven applications that not only meet current technological demands but anticipate future digital landscapes.`;

export const ABOUT_TEXT = `I’m currently pursuing my Bachelor's in Electronics and Communications Engineering at the Indian Institute of Information Technology, Pune. As a Full Stack Developer with a keen focus on Python and AI, I’ve honed my skills in both front-end and back-end technologies, including React.js, Node.js, Flask FastAPI, MySQL, and MongoDB. Over the past few years, I’ve worked on building scalable, high-performance web applications while leveraging AI to integrate innovative features. I specialize in crafting efficient back-end systems with FastAPI and am always eager to take on new technological challenges.
<br /><br/>
Beyond web development, I’ve delved deeply into machine learning, utilizing frameworks like TensorFlow and PyTorch to create data-driven solutions. My drive for continuous growth leads me to explore new tools like cloud computing, Docker, and Kubernetes, ensuring I stay ahead in the rapidly evolving tech landscape. With a strong interest in AI, particularly deep learning and neural networks, I focus on optimizing performance and developing intelligent applications. My ultimate goal is to merge my full-stack development expertise with AI to create impactful, scalable solutions that push the boundaries of what technology can achieve.`;

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

export const CONTACT = {
  address: "767 Fifth Avenue, New York, NY 10153 ",
  phoneNo: "+12 4555 666 00 ",
  email: "me@example.com",
};

export const PROJECTS = [
  {
    title: "FormiUp - Form Builder",
    image: img2,
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
    title: "AI Financial Advisory",
    image: img4,
    description:
      "An AI-powered financial advisory platform offering spending insights, savings projections, and chatbot-driven advice, leveraging Azure Cognitive Services, OpenAI, and interactive dashboards.",
    technologies: ["MERN Stack", "Git", "Microsoft Azure OpenAI"],
    timeline: "Jul 2024 – Present",
  },
  {
    title: "Zoom Clone",
    image: img1,
    description:
      "A NodeJs Zoom clone with WebRTC for real-time video/audio, using Node.js, Express.js, and Socket.io for backend communication. Added in-call chat and dynamic room management for multiple video calls.",
    technologies: ["NodeJs", "ExpressJs", "Socket.io"],
  },
];
