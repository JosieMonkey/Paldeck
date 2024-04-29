import { Link } from "react-router-dom";

const Nav = (props) => {
  const { title } = props;
  return (
    <header>
      <nav className="nav">
        <div className="left">
          <Link to={"/"}>Catalog</Link>
          <br />
          <Link to={"/addpal"}>Add Pal</Link>
        </div>
        <div className="right">
          <h1>{title}</h1>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
