import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./style.css";

const validationPost = yup.object().shape({
  titulo: yup
    .string()
    .required("Informe o titulo")
    .max(100, "Maximo de 100 caracteres"),
  sinopse: yup
    .string()
    .required("Informe a sinopse")
    .max(300, "Maximo de 300 caracteres"),
  numeroPaginas: yup.number().typeError("Número de páginas deve ser um número"),
  categoria: yup
    .number()
    .oneOf(
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "Valores permitidos: 1 para Ficção Cientifica, 2 para Fantasia, 3 para Romance, 4 para Literatura Classica, 5 para Suspense, 6 para Horror, 7 para Poesia, 8 para Historia, 9 para Biografia, 10 para Autobiografia"
    )
    .typeError(
      "Valores permitidos: 1 para Ficção Cientifica, 2 para Fantasia, 3 para Romance, 4 para Literatura Classica, 5 para Suspense, 6 para Horror, 7 para Poesia, 8 para Historia, 9 para Biografia, 10 para Autobiografia"
    )
    .required("Informe a categoria"),
  autor: yup
    .string()
    .required("informe o autor")
    .max(30, "Maximo de 30 caracteres"),
  editora: yup
    .string()
    .required("Informe a editora")
    .max(30, "Maximo de 30 caracteres"),
});

function Editar() {
  const { id } = useParams();
  const [livro, setLivro] = useState([]);
  // const [image, setImage] = useState(null);

  const [responseCategoria, setResponseCategoria] = useState();
  const [selectedCategoria, setSelectedCategoria] = useState(undefined);

  let navigate = useNavigate();

  const categorias = [
    { id: 1, name: "Ficção Cientifica" },
    { id: 2, name: "Fantasia" },
    { id: 3, name: "Romance" },
    { id: 4, name: "Literatura Classica" },
    { id: 5, name: "Suspense" },
    { id: 6, name: "Horror" },
    { id: 7, name: "Poesia" },
    { id: 8, name: "Historia" },
    { id: 9, name: "Biografia" },
    { id: 10, name: "Autobiografia" },
  ];

  // const handleImageChange = (e) => {
  //   const file = e.currentTarget.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     //   reader.onloadend = () => {
  //     //     setPreview(reader.result);
  //     //   };
  //     reader.readAsDataURL(file);
  //   }
  //   setImage(file);
  // };

  const handleChange = (e) => {
    setSelectedCategoria(e);
  };

  function checkCategoria(responseCategoria) {
    let categoriaId;
    switch (responseCategoria) {
      case "FICCAO_CIENTIFICA":
        categoriaId = 1;
        break;
      case "FANTASIA":
        categoriaId = 2;
        break;
      case "ROMANCE":
        categoriaId = 3;
        break;
      case "LITERATURA_CLASSICA":
        categoriaId = 4;
        break;
      case "SUSPENSE":
        categoriaId = 5;
        break;
      case "HORROR":
        categoriaId = 6;
        break;
      case "POESIA":
        categoriaId = 7;
        break;
      case "HISTORIA":
        categoriaId = 8;
        break;
      case "BIOGRAFIA":
        categoriaId = 9;
        break;
      case "AUTOBIOGRAFIA":
        categoriaId = 10;
        break;
    }
    return categoriaId;
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8080/livros/${id}`)
      .then((response) => {
        reset(response.data);
        const { categoria: responseCategoria } = response.data;
        setResponseCategoria(checkCategoria(responseCategoria));
        setValue('categoria', checkCategoria(responseCategoria));
      })
      .catch(() => console.log("Erro na requisição!"));
  }, []);

  const addPost = (data) => {
    // const formData = new FormData();
    // formData.append(
    //   "livro",
    //   new Blob([JSON.stringify(data)], { type: "application/json" })
    // );
    axios
      .put(`http://localhost:8080/livros/${id}`, data) //formData
      .then(() => {
        navigate("/");
      })
      .catch(() => console.log("Falha na requisição"));
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(validationPost) });

  function deleteLivro(id) {
    axios
      .delete(`http://localhost:8080/livros/${id}`)
      // .delete(`https://6662522a62966e20ef0839e2.mockapi.io/livros/${id}`)
      .then(() => {
        setLivro(livro.filter((livro) => livro.id != id));
        navigate("/");
      })
      .catch(() => console.log("Falha na requisição"));
  }

  return (
    <div>
      <Header />
      <main>
        <div className="cards">
          <form onSubmit={handleSubmit(addPost)}>
            <div className="card">
              <h1>Editar informações do livro</h1>
              <div className="line" />

              <label htmlFor="titulo">Titulo</label>
              <input type="text" id="titulo" {...register("titulo")} />
              <p className="Error-message">{errors.titulo?.message}</p>

              <label htmlFor="autor">Autor</label>
              <input type="text" id="autor" {...register("autor")} />
              <p className="Error-message">{errors.autor?.message}</p>

              <label htmlFor="editora">Editora</label>
              <input type="text" id="editora" {...register("editora")} />
              <p className="Error-message">{errors.editora?.message}</p>

              <label htmlFor="numeroPaginas">Numero de paginas</label>
              <input
                type="text"
                id="numeroPaginas"
                {...register("numeroPaginas")}
              />
              <p className="Error-message">{errors.numeroPaginas?.message}</p>

              <label htmlFor="categoria">Categoria</label>
              <select
                className="selectEditar"
                id="categoria"
                defaultValue={responseCategoria}
                value={selectedCategoria}
                onChange={handleChange}
                {...register("categoria")}
              >
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.name}
                  </option>
                ))}
                {selectedCategoria}
              </select>
              <p className="Error-message">{errors.categoria?.message}</p>

              <label htmlFor="sinopse">Sinopse</label>
              <textarea
                type="text"
                id="sinopse"
                cols="50"
                rows="10"
                {...register("sinopse")}
              />
              <p className="Error-message">{errors.sinopse?.message}</p>

              {/* <div>
                <label>Imagem</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e)}
                  onClick={(e) => {
                    e.target.value = null;
                  }}
                />
                <p className="Error-message">{errors.imagem?.message}</p>
              </div> */}

              <div className="cardInfos">
                <button type="submit">Enviar</button>
              </div>
              <div className="cardInfos-delete">
                <button onClick={() => deleteLivro(id)}>Deletar</button>
              </div>
              <Link className="cardInfos" to={"/"}>
                <button>Voltar</button>
              </Link>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Editar;
