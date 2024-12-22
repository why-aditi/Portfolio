import { motion } from "framer-motion";
import AboutImg from "../assets/AboutImg.jpg";
import { ABOUT_TEXT } from '../constants';

export default function About() {
  return (
    <div className='border-b border-neutral-900 py-5'>
      <motion.h1 className='my-16 text-center text-4xl'>About Me</motion.h1>
      <div className="flex flex-wrap mb-8">
        <motion.div whileInView={{x:0,opacity:1}} initial={{x:-100,opacity:0}} transition={{dutation:1.0}} className="w-full lg:w-1/2 lg:p-4">
          <div className="flex items-center justify-center">
            <img 
              src={AboutImg} 
              alt="About Me" 
              className="rounded-lg shadow-lg w-3/5 h-auto object-cover md:my-2 sm:my-2"
            />
          </div>
        </motion.div>
        <motion.div whileInView={{x:0,opacity:1}} initial={{x:100,opacity:0}} transition={{dutation:1.0}} className="w-full lg:w-2/5">
          <div className="flex justify-center lg:justify-start">
            <div className="max-w-xl py-6 font-light">
              <p className='text-justify my-2 max-w-xl' dangerouslySetInnerHTML={{ __html: ABOUT_TEXT }} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
