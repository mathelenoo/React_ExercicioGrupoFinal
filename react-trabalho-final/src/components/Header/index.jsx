import { Link } from "react-router-dom";
import './style.css';

function Header() {
  return (
    <header>
      <nav className="container">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to={"/"}>
              <p>Home</p>
            </Link>
          </li>
          <li className="navbar-item">
            <Link to={"/livros"}>
              <p>Adicionar Livro</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
