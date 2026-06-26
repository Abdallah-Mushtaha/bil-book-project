import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhoIsItFor from "./components/WhoIsItFor";
import AboutBook from "./components/AboutBook";
import Readers from "./components/Readers";
import Author from "./components/Author";
import CtaFooter from "./components/CtaFooter";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhoIsItFor />
      <AboutBook />
      <Readers />
      <Author />
      <CtaFooter />
    </main>
  );
}
