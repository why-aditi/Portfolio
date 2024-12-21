import { RiReactjsLine } from 'react-icons/ri';
import { SiMongodb } from 'react-icons/si';
import { FaNodeJs } from 'react-icons/fa';
import { FaJava } from 'react-icons/fa';
import { SiFastapi } from 'react-icons/si';
import { FaPython } from 'react-icons/fa';
import { SiPostgresql } from 'react-icons/si';
import { SiMysql } from 'react-icons/si';
import { SiTensorflow } from 'react-icons/si';
import { SiFlask } from 'react-icons/si';
import { motion } from "framer-motion";

const iconVariant = (duration) => ({
  initial: { y: -10 },
  animate: {
    y: [10, -10],
    transition: {
      duration: duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
});

const Technologies = () => {
  return (
    <section id="Technologies">
      <div className="border-b border-neutral-800 pb-24">
        <motion.h1  whileInView={{y:0,opacity:1}} initial={{y:-100,opacity:0}} transition={{dutation:1}} className="my-20 text-center text-4xl text-white">Technologies:</motion.h1>
        <motion.div  whileInView={{x:0,opacity:1}} initial={{x:-100,opacity:0}} transition={{dutation:1}} className="flex flex-wrap items-center justify-center gap-6">
          {/* Python */}
          <motion.div
            variants={iconVariant(1)}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center rounded-2xl border-4 border-neutral-800 p-4"
          >
            <FaPython size={50} className="text-7xl text-yellow-500" aria-label="Python" />
            <p className="mt-2 text-center text-sm text-white">Python</p>
          </motion.div>

          {/* Java */}
          <motion.div
            variants={iconVariant(1.2)}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center rounded-2xl border-4 border-neutral-800 p-4"
          >
            <FaJava size={50} className="text-7xl text-orange-600" aria-label="Java" />
            <p className="mt-2 text-center text-sm text-white">Java</p>
          </motion.div>

          {/* React.js */}
          <motion.div
            variants={iconVariant(1.4)}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center rounded-2xl border-4 border-neutral-800 p-4"
          >
            <RiReactjsLine size={50} className="text-7xl text-cyan-400" aria-label="React.js" />
            <p className="mt-2 text-center text-sm text-white">React.js</p>
          </motion.div>

          {/* Node.js */}
          <motion.div
            variants={iconVariant(1.6)}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center rounded-2xl border-4 border-neutral-800 p-4"
          >
            <FaNodeJs size={50} className="text-7xl text-green-600" aria-label="Node.js" />
            <p className="mt-2 text-center text-sm text-white">Node.js</p>
          </motion.div>

          {/* FastAPI */}
          <motion.div
            variants={iconVariant(1.8)}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center rounded-2xl border-4 border-neutral-800 p-4"
          >
            <SiFastapi size={50} className="text-7xl text-green-500" aria-label="FastAPI" />
            <p className="mt-2 text-center text-sm text-white">FastAPI</p>
          </motion.div>

          {/* TensorFlow */}
          <motion.div
            variants={iconVariant(1)}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center rounded-2xl border-4 border-neutral-800 p-4"
          >
            <SiTensorflow size={50} className="text-7xl text-orange-500" aria-label="TensorFlow" />
            <p className="mt-2 text-center text-sm text-white">TensorFlow</p>
          </motion.div>

          {/* MongoDB */}
          <motion.div
            variants={iconVariant(1.2)}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center rounded-2xl border-4 border-neutral-800 p-4"
          >
            <SiMongodb size={50} className="text-7xl text-green-500" aria-label="MongoDB" />
            <p className="mt-2 text-center text-sm text-white">MongoDB</p>
          </motion.div>

          {/* PostgreSQL */}
          <motion.div
            variants={iconVariant(1.4)}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center rounded-2xl border-4 border-neutral-800 p-4"
          >
            <SiPostgresql size={50} className="text-7xl text-blue-600" aria-label="PostgreSQL" />
            <p className="mt-2 text-center text-sm text-white">PostgreSQL</p>
          </motion.div>

          {/* MySQL */}
          <motion.div
            variants={iconVariant(1.6)}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center rounded-2xl border-4 border-neutral-800 p-4"
          >
            <SiMysql size={50} className="text-7xl text-blue-500" aria-label="MySQL" />
            <p className="mt-2 text-center text-sm text-white">MySQL</p>
          </motion.div>
          {/* Flask */}
          <motion.div
            variants={iconVariant(1.6)}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center rounded-2xl border-4 border-neutral-800 p-4"
          >
            <SiFlask size={50} className="text-7xl text-blue-500" aria-label="MySQL" />
            <p className="mt-2 text-center text-sm text-white">Flask</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;