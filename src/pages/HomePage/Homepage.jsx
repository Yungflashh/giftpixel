import Hero from "../LandingPage/Hero";
import StepsSection from "../LandingPage/StepsSection";
import FeaturesSection from "../LandingPage/FeaturesSection";
import PromiseCardSection from "../LandingPage/PromiseCardSection";
import AboutSection from "../LandingPage/AboutSection";
import Testimonials from "../LandingPage/Testimonials";
import Navbar from "../LandingPage/Navbar";
import Contact from "../LandingPage/Contact";
import Footer from "../LandingPage/Footer";

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <StepsSection />
      <FeaturesSection />
      <PromiseCardSection />
      <AboutSection />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Homepage;
