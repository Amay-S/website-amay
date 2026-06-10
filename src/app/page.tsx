import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="relative overflow-x-clip">
        {/* Mesh gradient blobs — absolute behind content */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {/* Hero area */}
          <div className="blob-1 absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.15)_0%,transparent_70%)] blur-3xl" />
          <div className="blob-2 absolute -top-20 -right-40 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(99,38,220,0.12)_0%,transparent_70%)] blur-3xl" />
          {/* Experience area */}
          <div className="blob-3 absolute top-[20%] -left-48 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(38,100,220,0.10)_0%,transparent_70%)] blur-3xl" />
          <div className="blob-4 absolute top-[25%] -right-32 h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.12)_0%,transparent_70%)] blur-3xl" />
          {/* Skills area */}
          <div className="blob-5 absolute top-[40%] left-1/4 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(120,40,200,0.10)_0%,transparent_70%)] blur-3xl" />
          {/* Education area */}
          <div className="blob-1 absolute top-[58%] -right-40 h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle,rgba(99,38,220,0.12)_0%,transparent_70%)] blur-3xl" />
          <div className="blob-3 absolute top-[62%] -left-32 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.12)_0%,transparent_70%)] blur-3xl" />
          {/* Certifications / Footer area */}
          <div className="blob-2 absolute top-[78%] right-1/4 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(38,100,220,0.10)_0%,transparent_70%)] blur-3xl" />
          <div className="blob-4 absolute top-[85%] -left-40 h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(120,40,200,0.12)_0%,transparent_70%)] blur-3xl" />
        </div>

        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <Experience />
            <Skills />
            <Education />
            <Projects />
            <Certifications />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
