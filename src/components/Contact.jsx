import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section id="Contact" className="section mt-8">
      <div className="container1 flex flex-col items-center justify-center gap-8">
        {/* Text Section */}
        <motion.div 
          whileInView={{ x: 0, opacity: 1 }} 
          initial={{ x: -100, opacity: 0 }} 
          transition={{ duration: 1 }} 
          className="flex flex-col items-center text-center"
        >
          <h2 className="text-4xl mb-2">
            Get in Touch
          </h2>
          <p className="text-zinc-400 mt-3 mb-8 text-xl">
            Reach out to discuss your project needs and start collaborating on something amazing!
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.form 
          whileInView={{ x: 0, opacity: 1 }} 
          initial={{ x: 100, opacity: 0 }} 
          transition={{ duration: 1 }} 
          action="https://getform.io/f/blllvyqb"
          method="post"
          className="w-full sm:w-3/4 md:w-1/2 xl:w-1/3 flex flex-col items-center"
        >
          <div className="flex flex-col gap-4 w-full">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-zinc-200 text-m font-normal mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                required
                className="block outline-none w-full px-3 py-3 text-sm bg-zinc-800 rounded-xl ring-1 ring-inset ring-transparent transition-shadow hover:ring-zinc-50/5 focus:ring-zinc-400 focus:ring-2"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-zinc-200 text-m font-normal mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                className="block outline-none w-full px-3 py-3 text-sm bg-zinc-800 rounded-xl ring-1 ring-inset ring-transparent transition-shadow hover:ring-zinc-50/5 focus:ring-zinc-400 focus:ring-2"
                placeholder="Enter your Email"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-zinc-200 text-m font-normal mb-2"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                required
                placeholder="Enter your message"
                className="block outline-none w-full px-3 py-3 text-sm bg-zinc-800 rounded-xl ring-1 ring-inset ring-transparent transition-shadow hover:ring-zinc-50/5 focus:ring-zinc-400 focus:ring-2 resize-y min-h-32 max-h-80"
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="h-9 flex items-center gap-2 px-4 rounded-xl font-medium text-sm ring-1 ring-zinc-50/5 ring-inset transition-colors bg-zinc-100 text-zinc-950 hover:bg-purple-300 w-full justify-center mb-4"
              >
                Submit
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
