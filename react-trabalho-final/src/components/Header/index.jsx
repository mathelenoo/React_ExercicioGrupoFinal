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
              <p>Adicionar</p>
            </Link>
          </li>
          <li className="navbar-item">
            <Link>
              <p>Editar</p>
            </Link>
          </li>
          <li className="navbar-item">
            <Link>
              <p>Deletar</p>
            </Link>
          </li>
          <li className="navbar-item">
            <Link to={"/resumo/:id"}>
              <p>Ver Resumo</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
