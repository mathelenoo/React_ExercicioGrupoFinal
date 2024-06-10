import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import BookCard from "../../components/BookCard";
import "../Home/styles.css";
import axios from "axios";

const Home = () => {
  const [booksTemp, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/livros`)
      .then((response) => {
        setBooks(response.data);
      })
      .catch(() => console.log("Erro na requisição!"));
  }, []);

  const books = [
    {
      id: 1,
      title: "Dom Casmurro",
      author: "Machado de Assis",
      description: "Um dos maiores clássicos da literatura brasileira.",
      genre: "Romance",
      image:
        "https://m.media-amazon.com/images/I/61Z2bMhGicL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      description: "Uma distopia clássica que continua relevante até hoje.",
      genre: "Ficção Científica",
      image:
        "https://pixelcefetmg.wordpress.com/wp-content/uploads/2015/04/1984.jpg",
    },
    {
      id: 3,
      title: "O Pequeno Príncipe",
      author: "Antoine de Saint-Exupéry",
      description: "Um conto encantador sobre amizade e humanidade.",
      genre: "Fantasia",
      image:
        "https://m.media-amazon.com/images/I/81fXBeYYxpL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: 4,
      title: "Harry Potter e a Pedra Filosofal",
      author: "J.K. Rowling",
      description: "O primeiro livro da famosa série de Harry Potter.",
      genre: "Fantasia",
      image:
        "https://m.media-amazon.com/images/I/81OxctAK5WL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: 5,
      title: "O Senhor dos Anéis: A Sociedade do Anel",
      author: "J.R.R. Tolkien",
      description: "O início da épica jornada na Terra Média.",
      genre: "Fantasia",
      image:
        "https://harpercollins.com.br/cdn/shop/products/9786555113631_79a81e4f-07c1-4aa8-ba58-b44033442bbf.jpg?v=1686061056",
    },
    {
      id: 6,
      title: "A Culpa é das Estrelas",
      author: "John Green",
      description: "Uma emocionante história de amor e perda.",
      genre: "Romance",
      image:
        "https://m.media-amazon.com/images/I/51M9IbBqxCL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: 7,
      title: "Percy Jackson e o Ladrão de Raios",
      author: "Rick Riordan",
      description: "Aventuras de Percy Jackson, filho de Poseidon.",
      genre: "Fantasia",
      image: "https://m.media-amazon.com/images/I/51fSoQlXKWL._SL500_.jpg",
    },
    {
      id: 8,
      title: "O Alquimista",
      author: "Paulo Coelho",
      description: "Uma jornada espiritual em busca dos sonhos.",
      genre: "Ficção",
      image:
        "https://m.media-amazon.com/images/I/81slUinjTlS._AC_UF1000,1000_QL80_.jpg",
    },
  ];

  return (
    <div>
      <Header />
      <h1 className="home-title">Home Page - Cards de Sugestão de Livros</h1>
      <div className="books-container">
        {/* {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))} */}

        {booksTemp.map((book, key) => {
          return (
            <div className="card" key={key}>
              <header>
                <img src={book.url}/>
                <h2>{book.titulo}</h2>
              </header>
              <div className="line" />
              <p>{book.sinopse} </p>
              <div className="line" />
              <p>{book.numeroPaginas} </p>
              <div className="line" />
              <p>{book.categoria} </p>
              <div className="line" />
              <p>{book.autor} </p>
              <div className="line" />
              <p>{book.editora} </p>

            </div>
            
          );
        })}
      </div>
    </div>
  );
};

export default Home;
