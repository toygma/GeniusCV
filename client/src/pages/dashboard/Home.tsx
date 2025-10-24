import CallToAction from "@/components/home/CallToAction";
import Features from "@/components/home/Features";
import { Hero } from "@/components/home/Hero";
import Testimonial from "@/components/home/Testimonial";
import Banner from "@/components/home/Banner";
import Promotional from "@/components/home/Promotional";
import Team from "@/components/home/Team";

const Home = () => {
  return (
    <div>
      <Banner />
      <Hero />
      <Features />
      <CallToAction />
      <Testimonial />
      <Promotional />
      <Team />
    </div>
  );
};

export default Home;
