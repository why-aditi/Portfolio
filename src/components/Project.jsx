import {PROJECTS} from "../constants/index"
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const Projects = () => {
  
  return (
    <section id="Projects" className="py-20">
      <div className="border-b border-neutral-800/40 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-medium text-indigo-400 mb-3 uppercase tracking-wider">My Work</h2>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Featured Projects</h1>
          <p className="max-w-2xl mx-auto text-neutral-400">
            A collection of projects that showcase my skills and experience in building digital products.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-neutral-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-neutral-700/30 hover:border-neutral-600/50 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-neutral-400 text-sm mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 text-xs font-medium bg-neutral-700/50 text-neutral-300 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-end mt-auto pt-2">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-neutral-400 hover:text-white transition-colors duration-300"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <FaGithub size={20} />
                  </a>
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-neutral-400 hover:text-white transition-colors duration-300"
                      aria-label={`View live demo of ${project.title}`}
                    >
                      <FaExternalLinkAlt size={18} />
                    </a>
                  )}
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
          className="text-center mt-16"
        >
          <a 
            href="https://github.com/why-aditi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 font-medium rounded-lg transition-colors border border-indigo-500/30"
          >
            <FaGithub />
            <span>View More on GitHub</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;