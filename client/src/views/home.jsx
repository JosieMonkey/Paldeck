import Nav from "../components/nav.jsx";
import DisplayAll from "../components/display.jsx";

const Home = (props) => {
  return (
    <div>
      <Nav title={"Pal Catalog"} />
      <DisplayAll />
    </div>
  );
};

export default Home;
