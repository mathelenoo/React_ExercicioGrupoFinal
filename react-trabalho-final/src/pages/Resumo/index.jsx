import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Resumo() {
    const { id } = useParams();
    const [ler, setLer] = useState({});

    useEffect(() => {
        axios
            .get(`http://localhost:8080/livros/${id}`)
            // .get(`https://6662522a62966e20ef0839e2.mockapi.io/livros/${id}`)
            .then((response) => {
                setLer(response.data);
            })
            .catch(() => console.log("Erro na requisição!"));
    }, []);

    return (
        <div>
            <Header />
            <main>
                <div className="cards">
                    <div className="card">
                        <header>
                            <h2>{ler.titulo}</h2>
                        </header>
                        <div className="line" />
                        <p className="Sinopse">{ler.sinopse}</p>
                        <div className="line" />
                        <div className="cardInfos">
                            <div className="cardInfos">
                                <p className="infos">Categoria: {ler.categoria}</p>
                                <p className="infos">Autor: {ler.autor}</p>
                                <p className="infos">Editora: {ler.editora}</p>
                                <p className="infos">Numero de paginas: {ler.numeroPaginas}</p>
                            </div>
                            <Link className="cardInfos" to={"/"}>
                                <button>Voltar</button>
                            </Link>
                            <Link className="cardInfos" to={`/editar/${ler.id}`}>
                                <button>Editar</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Resumo;
