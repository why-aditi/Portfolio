import { ThemeProvider } from "./components/ThemeProvider";
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
    <ThemeProvider>
      <div
        className="antialiased"
        style={{ backgroundColor: "var(--bg-dark)", color: "var(--text-primary)" }}
      >
        <div
          className="fixed top-0 left-0 -z-10 h-full w-full"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(155, 79, 150, 0.15), transparent)",
            backgroundColor: "var(--bg-dark)",
          }}
        />

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

          <div className="w-full max-w-[min(100%,1920px)] mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
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
    </ThemeProvider>
  );
};

export default App;
