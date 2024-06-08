import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./style.css";

function Resumo() {
    const { id } = useParams();
    const [ler, setLer] = useState({});

    useEffect(() => {
        axios
            // .get(`http://localhost:8080/livros/${id}`)
            .get(`https://6662522a62966e20ef0839e2.mockapi.io/livros/${id}`)
            .then((response) => {
                setLer(response.data);
            })
            .catch(() => console.log("Erro na requisição!"));
    }, []);

    return (
        <div>
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
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Resumo;
