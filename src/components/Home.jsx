import { HOME_CONTENT } from "../constants";
import HomeImg from "../assets/HomeImg.jpg";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaArrowRight } from "react-icons/fa";

const fadeIn = (delay) => ({
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      duration: 0.6, 
      delay: delay,
      ease: [0.22, 1, 0.36, 1]
    } 
  },
});

export default function Home() {
  return (
    <section id="home" className="flex items-center justify-center">
      <div className="w-full min-h-screen flex flex-col justify-center items-center border-b border-neutral-800/40 lg:flex-row lg:items-center lg:gap-16 py-10 lg:py-0 -mt-16">
        {/* Background decorative elements */}
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[20%] right-[5%] w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
        
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start order-2 lg:order-1 mt-10 lg:mt-0 px-4 md:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center lg:items-start max-w-xl mx-auto lg:mx-0"
          >
            <motion.div 
              variants={fadeIn(0.1)}
              className="flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-300 w-fit backdrop-blur-sm border border-indigo-500/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-sm font-medium">Available for new projects</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn(0.2)}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 text-center lg:text-left"
            >
              <span className="inline-block">Aditi</span>{" "}
              <span className="inline-block bg-gradient-to-r from-pink-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">Kala</span>
            </motion.h1>
            
            <motion.div 
              variants={fadeIn(0.3)}
              className="mb-6 text-center lg:text-left"
            >
              <span className="bg-gradient-to-r from-pink-400 via-indigo-500 to-purple-500 bg-clip-text text-2xl md:text-3xl font-semibold tracking-tight text-transparent">
                Full Stack Developer | Python & AI 
              </span>
            </motion.div>
            
            <motion.p 
              variants={fadeIn(0.4)}
              className="text-lg text-neutral-300/80 max-w-xl mb-8 text-center lg:text-left leading-relaxed"
            >
              {HOME_CONTENT}
            </motion.p>
            
            <motion.div 
              variants={fadeIn(0.5)}
              className="flex gap-6 mb-8 justify-center lg:justify-start"
            >
              <a 
                href="https://github.com/why-aditi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-indigo-400 transition-colors p-2 hover:bg-neutral-800/50 rounded-full"
                aria-label="GitHub"
              >
                <FaGithub size={24} />
              </a>
              <a 
                href="https://linkedin.com/in/aditi-kala" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-indigo-400 transition-colors p-2 hover:bg-neutral-800/50 rounded-full"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
              <a 
                href="https://instagram.com/lostintheskyie" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-indigo-400 transition-colors p-2 hover:bg-neutral-800/50 rounded-full"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
            </motion.div>
            
            <motion.div 
              variants={fadeIn(0.6)}
              className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start"
            >
              <a 
                href="#projects" 
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 group"
              >
                View Projects
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="https://drive.google.com/file/d/1bJ_rO9qjCNjeL_QQNtnbT9e_Ao737sUv/view?usp=sharing" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 hover:border-indigo-500/50 text-white font-medium rounded-lg transition-all"
              >
                Resume
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center items-center order-1 lg:order-2 px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-2xl blur opacity-30 animate-pulse"></div>
            <img
              src={HomeImg}
              alt="Aditi Kala"
              className="relative rounded-2xl shadow-2xl w-full max-w-md object-cover z-10 border border-neutral-800/50"
            />
            
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-500/10 rounded-full backdrop-blur-md border border-indigo-500/20 z-0"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-pink-500/10 rounded-full backdrop-blur-md border border-pink-500/20 z-0"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
