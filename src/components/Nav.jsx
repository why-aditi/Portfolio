import { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track mobile menu open state

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu state
  };

  const closeMenu = () => {
    setIsMenuOpen(false); // Close menu when a link is clicked
  };

  return (
    <section id="Navbar">
      <nav
        className={`fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-6 transition-all duration-300 ${
          isScrolled ? "bg-neutral-950 bg-opacity-80 shadow-md" : "bg-transparent"
        }`}
      >
        <div className="flex flex-shrink-0 items-center m-4">
          <h1 className="text-5xl font-bold">AK</h1>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={handleMenuToggle}
            className="text-white text-2xl"
          >
            &#9776;
          </button>
        </div>

        {/* Desktop and mobile nav links */}
        <div
          className={`flex items-center gap-8 text-lg text-white transition-all duration-300 ${
            isMenuOpen
              ? "flex-col absolute top-0 left-0 right-0 bg-neutral-950 bg-opacity-90 p-6"
              : "hidden lg:flex"
          }`}
        >
          <ScrollLink
            to="home"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-gray-400"
            onClick={() => {
              scrollToTop();
              closeMenu(); // Close the menu after clicking on a link
            }}
          >
            Home
          </ScrollLink>
          <ScrollLink
            to="about"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-gray-400"
            onClick={closeMenu}
          >
            About
          </ScrollLink>
          <ScrollLink
            to="technologies"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-gray-400"
            onClick={closeMenu}
          >
            Tech Stack
          </ScrollLink>
          <ScrollLink
            to="experience"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-gray-400"
            onClick={closeMenu}
          >
            Experience
          </ScrollLink>
          <ScrollLink
            to="projects"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-gray-400"
            onClick={closeMenu}
          >
            Projects
          </ScrollLink>
          <ScrollLink
            to="contact"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-gray-400"
            onClick={closeMenu}
          >
            Contact
          </ScrollLink>
        </div>

        {/* Social icons (visible on both small and large screens) */}
        <div className="flex items-center justify-center gap-4 text-2xl text-white">
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
