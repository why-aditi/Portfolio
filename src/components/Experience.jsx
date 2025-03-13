import { motion } from "framer-motion";
import { EXPERIENCES } from "../constants/index.js";
import { FaBriefcase, FaCalendarAlt, FaBuilding } from "react-icons/fa";

const Experience = () => {
  return (
    <section id="Experience" className="py-20">
      <div className="border-b border-neutral-800/40 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-medium text-indigo-400 mb-3 uppercase tracking-wider">My Journey</h2>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Work Experience</h1>
          <p className="max-w-2xl mx-auto text-neutral-400">
            A timeline of my professional experience and the skills I&apos;ve developed along the way.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {EXPERIENCES.map((experience, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="mb-12 relative"
            >
              {/* Timeline connector */}
              {index < EXPERIENCES.length - 1 && (
                <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-transparent h-full"></div>
              )}
              
              <div className="flex flex-col md:flex-row gap-6">
                {/* Timeline dot */}
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center text-indigo-400">
                    <FaBriefcase size={20} />
                  </div>
                </div>
                
                <div className="flex-grow bg-neutral-800/30 backdrop-blur-sm rounded-xl border border-neutral-700/30 p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-0">
                      {experience.role}
                    </h3>
                    <div className="flex items-center text-sm text-indigo-300 font-medium">
                      <FaCalendarAlt className="mr-2" />
                      <span>{experience.year}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4 text-neutral-300">
                    <FaBuilding className="mr-2" />
                    <span className="font-medium">{experience.company}</span>
                  </div>
                  
                  <div className="mb-6">
                    <ul className="space-y-3">
                      {experience.description.map((point, idx) => (
                        <li key={idx} className="text-neutral-300 flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 mr-3 flex-shrink-0"></span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className="px-3 py-1 text-xs font-medium bg-indigo-500/10 text-indigo-300 rounded-full border border-indigo-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
