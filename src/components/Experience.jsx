import { motion } from "framer-motion";
import { EXPERIENCES } from "../constants/index.js";

const Experience = () => {

  return (
    <section id="Experience" className="py-8">
      <div className="border-b border-neutral-900 pb-4">
        <motion.h1
          whileInView={{ y: 0, opacity: 1 }}
          initial={{ y: -100, opacity: 0 }}
          transition={{ duration: 1 }}
          className="my-20 text-center text-4xl"
        >
          Experience
        </motion.h1>
        {EXPERIENCES.map((experience, index) => (
          <div key={index} className="mb-8 flex flex-wrap lg:justify-center">
            <div className="w-full lg:w-1/4">
              <motion.p
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ x: -50, opacity: 0 }}
                transition={{ duration: 1 }}
                className="mb-2 text-sm text-neutral-400"
              >
                {experience.year}
              </motion.p>
            </div>
            <motion.div
              whileInView={{ x: 0, opacity: 1 }}
              initial={{ x: 50, opacity: 0 }}
              transition={{ duration: 1 }}
              className="w-full max-w-xl lg:w-3/4"
            >
              <h6 className="mb-2 font-semibold">
                {experience.role} -{" "}
                <span className="text-sm text-purple-100">{experience.company}</span>
              </h6>
              <ul className="mb-2 text-neutral-400 text-justify list-none">
                {experience.description.map((point, index) => (
                  <li key={index} className="mb-2">
                    {point}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="mr-2 mt-2 rounded bg-neutral-900 px-2 py-1 text-sm font-medium text-purple-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
