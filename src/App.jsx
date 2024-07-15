// components
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import About from "./components/About";
import Counters from "./components/Counters";
import Testimonials from "./components/Testimonials";
import Questions from "./components/Questions";
import Footer from "./components/Footer";

// styles
import "./styles/App.scss";

const App = () => {
  return (
    <>
      <NavBar />
      <Main />
      <About />
      <Counters />
      <Testimonials />
      <Questions />
      <Footer />
    </>
  );
};

export default App;
