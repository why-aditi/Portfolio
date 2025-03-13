import {PROJECTS} from "../constants/index"
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { 
      duration: 0.5,
      delay: i * 0.1
    }
  })
};

const Projects = () => {
  
  return (
    <section id="Projects">
      <div className="border-b border-neutral-900 pb-12">
        <motion.h1 
          whileInView={{y:0, opacity:1}} 
          initial={{y:-100, opacity:0}} 
          transition={{duration:1}}  
          className="mt-20 mb-10 text-center text-4xl pt-20"
        >
          Projects
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-4">
          {PROJECTS.map((project, index) => (
            <motion.div 
              key={index}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="bg-neutral-800 rounded-lg overflow-hidden shadow-lg flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{project.title}</h3>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-500 hover:text-purple-700 transition-colors"
                    aria-label={"GitHub repository for ${project.title}"}
                  >
                    <FaGithub size={20} />
                  </a>
                </div>
                
                <p className="text-neutral-400 mb-4 flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="rounded bg-neutral-900 px-2 py-1 text-xs font-medium text-purple-500"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;