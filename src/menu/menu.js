import { Link } from "react-router-dom";

function Menu() {
  return (
    <nav className="p-3">
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link to="/economia" className="nav-link text-black">Economía</Link>
        </li>
        <li className="nav-item">
          <Link to="/opinion" className="nav-link text-black">Opinión</Link>
        </li>
        <li className="nav-item">
          <Link to="/nosotros" className="nav-link text-black">Nosotros</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
