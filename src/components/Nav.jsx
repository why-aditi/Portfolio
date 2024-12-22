import { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaInstagram, FaBars, FaTimes } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section id="Navbar">
      <nav
        className={`fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-6 transition-all duration-300 ${
          isScrolled ? "bg-neutral-950 bg-opacity-80 shadow-md" : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <div className="flex flex-shrink-0 items-center m-4">
          <h1 className="text-5xl font-bold">
            <ScrollLink
              to=""
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-gray-400"
              onClick={scrollToTop}
            >
              AK
            </ScrollLink>
          </h1>
        </div>

        {/* Toggle button for smaller screens */}
        <div className="lg:hidden text-3xl text-white cursor-pointer" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes aria-label="Close Menu" /> : <FaBars aria-label="Open Menu" />}
        </div>

        {/* Side Menu */}
        <div
          className={`fixed left-0 w-64 bg-neutral-950 bg-opacity-90 text-white transition-transform duration-300 ${
            isMenuOpen ? "top-20 h-full" : "-translate-x-full"
          } lg:hidden`}
        >
          <div className="flex flex-col items-start p-6 space-y-6">
            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              className="flex items-center gap-3 text-lg cursor-pointer hover:text-gray-400"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </ScrollLink>
            <ScrollLink
              to="technologies"
              smooth={true}
              duration={500}
              className="flex items-center gap-3 text-lg cursor-pointer hover:text-gray-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Tech Stack
            </ScrollLink>
            <ScrollLink
              to="experience"
              smooth={true}
              duration={500}
              className="flex items-center gap-3 text-lg cursor-pointer hover:text-gray-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Experience
            </ScrollLink>
            <ScrollLink
              to="projects"
              smooth={true}
              duration={500}
              className="flex items-center gap-3 text-lg cursor-pointer hover:text-gray-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </ScrollLink>
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              className="flex items-center gap-3 text-lg cursor-pointer hover:text-gray-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </ScrollLink>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4 mt-6 text-2xl">
              <a
                href="https://github.com/why-aditi"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaGithub aria-label="GitHub" />
              </a>
              <a
                href="https://www.linkedin.com/in/aditi-kala-b4740228b/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaLinkedin aria-label="LinkedIn" />
              </a>
              <a
                href="https://www.instagram.com/lostintheskyie/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaInstagram aria-label="Instagram" />
              </a>
            </div>
          </div>
        </div>

        {/* Nav links for larger screens */}
        <div className="hidden lg:flex items-center gap-8 text-lg text-white">
          <ScrollLink
            to="about"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-gray-400"
          >
            About
          </ScrollLink>
          <ScrollLink
            to="technologies"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-gray-400"
          >
            Tech Stack
          </ScrollLink>
          <ScrollLink
            to="experience"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-gray-400"
          >
            Experience
          </ScrollLink>
          <ScrollLink
            to="projects"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-gray-400"
          >
            Projects
          </ScrollLink>
          <ScrollLink
            to="contact"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-gray-400"
          >
            Contact
          </ScrollLink>
        </div>

        {/* Social icons */}
        <div className="hidden lg:flex items-center justify-center gap-4 text-2xl text-white">
          <a href="https://github.com/why-aditi" target="_blank" rel="noopener noreferrer">
            <FaGithub aria-label="GitHub" />
          </a>
          <a
            href="https://www.linkedin.com/in/aditi-kala-b4740228b/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin aria-label="LinkedIn" />
          </a>
          <a
            href="https://www.instagram.com/lostintheskyie/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram aria-label="Instagram" />
          </a>
        </div>
      </nav>
    </section>
  );
}
