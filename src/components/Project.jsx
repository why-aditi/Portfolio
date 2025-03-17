import {PROJECTS} from "../constants/index"
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

const Projects = () => {
  
  return (
    <section id="Projects" className="py-20">
      <div className="border-b border-neutral-800/40 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-sm font-medium text-indigo-400 mb-3 uppercase tracking-wider">My Work</h2>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Featured Projects</h1>
          <p className="max-w-2xl mx-auto text-neutral-400">
            A collection of projects that showcase my skills and experience in building digital products.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-neutral-800/30 backdrop-blur-sm rounded-lg overflow-hidden border border-neutral-700/30 hover:border-neutral-600/50 transition-all duration-300 group h-full flex flex-col"
            >
              <div className="relative overflow-hidden aspect-[16/9]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-4 flex flex-col flex-grow">
              <div className="flex flex-wrap gap-1.5 mb-3 mt-auto justify-between">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300 line-clamp-1">
                  {project.title}
                </h3>
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-neutral-400 hover:text-white transition-colors duration-300"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <FaGithub size={22} />
                  </a>
                </div>
                <p className="text-neutral-400 text-s mb-3 line-clamp-3">
                  {project.description}
                </p>
                
                 <div className="flex flex-wrap gap-1.5 mb-3 mt-auto">
                 {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-1.5 py-0.5 text-s font-medium bg-neutral-700/50 text-neutral-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                 </div>
                </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mt-12"
        >
          <a 
            href="https://github.com/why-aditi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 font-medium rounded-lg transition-colors border border-indigo-500/30"
          >
            <FaGithub size={22} />
            <span>View More on GitHub</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;