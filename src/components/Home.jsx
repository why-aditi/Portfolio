import { HOME_CONTENT } from "../constants";
import HomeImg from "../assets/HomeImg.jpg";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

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
    <section id="home">
      <div className="w-full min-h-screen flex flex-col justify-center border-b border-neutral-800/40 lg:flex-row lg:items-center lg:gap-12 py-10 lg:py-0">
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start order-2 lg:order-1 mt-10 lg:mt-0">
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center lg:items-start"
          >
            <motion.div 
              variants={fadeIn(0.1)}
              className="flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-300 w-fit"
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
              Aditi Kala
            </motion.h1>
            
            <motion.div 
              variants={fadeIn(0.3)}
              className="mb-6"
            >
              <span className="bg-gradient-to-r from-pink-400 via-indigo-500 to-purple-500 bg-clip-text text-2xl md:text-3xl font-semibold tracking-tight text-transparent">
                Full Stack Developer | Python & AI 
              </span>
            </motion.div>
            
            <motion.p 
              variants={fadeIn(0.4)}
              className="text-lg text-neutral-300/80 max-w-xl mb-8 text-center lg:text-left"
            >
              {HOME_CONTENT}
            </motion.p>
            
            <motion.div 
              variants={fadeIn(0.5)}
              className="flex gap-6 mb-8"
            >
              <a 
                href="https://github.com/why-aditi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white transition-colors"
              >
                <FaGithub size={24} />
              </a>
              <a 
                href="https://linkedin.com/in/aditi-kala" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
              <a 
                href="https://instagram.com/lostintheskyie" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white transition-colors"
              >
                <FaInstagram size={24} />
              </a>
            </motion.div>
            
            <motion.div 
              variants={fadeIn(0.6)}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a 
                href="#contact" 
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
              >
                Contact Me
              </a>
              <a 
                href="#projects" 
                className="px-6 py-3 bg-transparent border border-neutral-700 hover:border-neutral-500 text-white font-medium rounded-lg transition-colors"
              >
                View Projects
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center items-center order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-2xl blur opacity-30"></div>
            <img
              src={HomeImg}
              alt="Aditi Kala"
              className="relative rounded-2xl shadow-2xl w-full max-w-md object-cover z-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
