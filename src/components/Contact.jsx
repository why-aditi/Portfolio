import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const Contact = () => {
  return (
    <section id="Contact" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-center mb-16"
      >
        <h2 className="text-sm font-medium text-indigo-400 mb-3 uppercase tracking-wider">Contact</h2>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Get In Touch</h1>
        <p className="max-w-2xl mx-auto text-neutral-400">
          Have a project in mind or want to collaborate? Feel free to reach out!
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Let&apos;s Connect</h3>
              <p className="text-neutral-400 mb-8">
                I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your vision.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-500/20 p-3 rounded-lg text-indigo-400">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Email</h4>
                  <p className="text-neutral-400">aditi.kala@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-indigo-500/20 p-3 rounded-lg text-indigo-400">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Location</h4>
                  <p className="text-neutral-400">Pune, India</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <h4 className="text-white font-medium mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/why-aditi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-neutral-800 hover:bg-neutral-700 p-3 rounded-lg text-neutral-400 hover:text-white transition-colors"
                >
                  <FaGithub size={20} />
                </a>
                <a 
                  href="https://linkedin.com/in/aditi-kala" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-neutral-800 hover:bg-neutral-700 p-3 rounded-lg text-neutral-400 hover:text-white transition-colors"
                >
                  <FaLinkedin size={20} />
                </a>
                <a 
                  href="https://instagram.com/lostintheskyie" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-neutral-800 hover:bg-neutral-700 p-3 rounded-lg text-neutral-400 hover:text-white transition-colors"
                >
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="bg-neutral-800/30 backdrop-blur-sm rounded-xl border border-neutral-700/30 p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Send Me a Message</h3>
              
              <form 
                action="https://getform.io/f/blllvyqb"
                method="post"
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="name"
                      required
                      className="w-full px-4 py-3 bg-neutral-700/30 border border-neutral-600/50 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      required
                      className="w-full px-4 py-3 bg-neutral-700/30 border border-neutral-600/50 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 bg-neutral-700/30 border border-neutral-600/50 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    placeholder="Subject of your message"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    className="w-full px-4 py-3 bg-neutral-700/30 border border-neutral-600/50 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
