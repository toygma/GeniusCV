import CallToAction from "@/components/home/CallToAction";
import Features from "@/components/home/Features";
import { Hero } from "@/components/home/Hero";
import Testimonial from "@/components/home/Testimonial";
import Banner from "@/components/home/Banner";

const Home = () => {
  return (
    <div>
      <Banner/>
      <Hero />
      <Features />
      <Testimonial />
      <CallToAction />
    </div>
  );
};

export default Home;
