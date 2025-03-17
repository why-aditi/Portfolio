import { motion } from "framer-motion";
import AboutImg from "../assets/AboutImg.jpg";
import { ABOUT_TEXT } from '../constants';
import { FaCode, FaServer, FaDatabase, FaRobot } from "react-icons/fa";

export default function About() {
  const skills = [
    { 
      icon: <FaCode />, 
      title: "Frontend Development", 
      description: "Building responsive and interactive user interfaces with React, TypeScript, and modern CSS frameworks." 
    },
    { 
      icon: <FaServer />, 
      title: "Backend Development", 
      description: "Creating robust APIs and server-side applications using Node.js, FastAPI, and Express." 
    },
    { 
      icon: <FaDatabase />, 
      title: "Database Management", 
      description: "Working with SQL and NoSQL databases including PostgreSQL, MongoDB, and MySQL." 
    },
    { 
      icon: <FaRobot />, 
      title: "AI & Machine Learning", 
      description: "Implementing machine learning models using TensorFlow, PyTorch, and other AI frameworks." 
    },
  ];

  return (
    <div className='border-b border-neutral-800/40 py-20'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-center mb-16"
      >
        <h2 className="text-sm font-medium text-indigo-400 mb-3 uppercase tracking-wider">About Me</h2>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">My Background</h1>
        <p className="max-w-2xl mx-auto text-neutral-400">
          Get to know more about me, my background, and what I do.
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12 mb-16">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
          className="w-2/3"
        >
          <div className="relative max-w-xs mx-auto">
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-2xl blur opacity-20"></div>
            <img 
              src={AboutImg} 
              alt="Aditi Kala" 
              className="relative rounded-xl shadow-2xl w-full h-auto object-cover z-10"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
          className="w-full lg:w-2/3"
        >
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-neutral-300 leading-relaxed text-justify" dangerouslySetInnerHTML={{ __html: ABOUT_TEXT }} />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mt-20"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">Core Competencies</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-neutral-800/30 backdrop-blur-sm p-6 rounded-xl border border-neutral-700/30 hover:border-neutral-600/50 transition-all duration-300"
            >
              <div className="text-indigo-400 text-3xl mb-4">{skill.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{skill.title}</h3>
              <p className="text-neutral-400 text-sm">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
