import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="antialiased" style={{ backgroundColor: "var(--surface)", color: "var(--text)" }}>
      <Nav />

      <main>
        <section id="hero">
          <Hero />
        </section>

        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <section id="about" style={{ isolation: "isolate" }}>
            <About />
          </section>

          <section id="skills" style={{ isolation: "isolate" }}>
            <Skills />
          </section>
        </div>

        <section id="experience" style={{ isolation: "isolate" }}>
          <Experience />
        </section>

        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <section id="projects" style={{ isolation: "isolate" }}>
            <Projects />
          </section>
        </div>

        <section id="achievements" style={{ isolation: "isolate" }}>
          <Achievements />
        </section>

        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <section id="contact" style={{ isolation: "isolate" }}>
            <Contact />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
