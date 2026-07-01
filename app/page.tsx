import WhoIsItFor from "./components/WhoIsItFor/WhoIsItFor";
import AboutBook from "./components/About/AboutBook";
import Readers from "./components/Readers/Readers";
import Author from "./components/Author/Author";
import CtaFooter from "./components/CtaFooter/CtaFooter";
import { Metadata } from "next";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/Hero/Hero";

export const metadata: Metadata = {
  title: "Secure Love — Emily Carter",
  description: "A debut novel about love, loss, and the courage to feel again.",

  icons: {
    icon: "/SiteLogo.png",
  },
};

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
