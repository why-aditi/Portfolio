import { HOME_CONTENT } from "../constants";
import HomeImg from "../assets/HomeImg.jpg";
import { motion } from "framer-motion";

const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5, delay: delay } },
  visible1: { x: 10, opacity: 1, transition: { duration: 0.5, delay: delay } },
});

export default function Home() {
  return (
    <section id="home">
      <div className="w-full min-h-screen border-b border-neutral-900 lg:pt-40 md:my-10 sm:my-10 lg:-my-14">
        <div className="flex flex-wrap h-full justify-between">
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="flex flex-col items-center lg:items-start">
              <motion.h1 
                variants={container(0)}
                initial="hidden"
                animate="visible1"
                className="pb-10 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl">
                Aditi Kala
              </motion.h1>
              <motion.span 
                variants={container(0.5)}
                initial="hidden"
                animate="visible1"
                className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-4xl tracking-tight text-transparent">
              Full Stack Developer | Python & AI 
              </motion.span>
              <motion.p 
                variants={container(1)}
                initial="hidden"
                animate="visible1"
                className="my-2 max-w-xl py-6 font-light">
                {HOME_CONTENT}
              </motion.p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 lg:p-8 -mt-14 -mx-4">
            <div className="flex justify-center ">
              <motion.img
                src={HomeImg}
                alt="Home Image"
                className="rounded-lg shadow-lg w-4/5 h-auto md:my-10 sm:my-10"
                initial={{ x: 100, opacity: 0} }
                animate={{x: 0, opacity: 1, transition: { duration: 0.5, delay: 1.3 } }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
