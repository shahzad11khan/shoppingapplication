import HeroSection from "./components/HeroSection";
import { useProductContext } from "./context/productcontex";

const About = () => {
  const { myName } = useProductContext();

  const data = {
    name: "This Is About Me",
    paragraph: "This is a new paragraph for the about section.",
    
  };

  return (
    <>
      {myName}
      
      <HeroSection myData={data}/>
     
    </>
  );
};

export default About;
