import { useState } from "react";
import { scroller } from "react-scroll";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";

const App = () => {
  // Shared so a skill chip can filter the project list and scroll the reader to it.
  const [techFilter, setTechFilter] = useState(null);

  const filterFromSkills = (tech) => {
    setTechFilter(tech);
    scroller.scrollTo("projects", { smooth: true, duration: 600, offset: -72 });
  };

  return (
    <div className="antialiased" style={{ background: "var(--bg)", color: "var(--ink)" }}>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills onFilter={filterFromSkills} activeFilter={techFilter} />
        <Experience />
        <Projects filter={techFilter} onFilter={setTechFilter} />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
    </div>
  );
};

export default App;
