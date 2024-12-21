import { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);

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
        <div className="flex items-center gap-8 text-lg text-white">
            <ScrollLink
            to="/"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-gray-400"
            onClick={scrollToTop}
            >
            Home
            </ScrollLink>
            <ScrollLink
            to="about"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-gray-400"
            >
            About
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
        <div className="m-8 flex items-center justify-center gap-4 text-2xl text-white">
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
