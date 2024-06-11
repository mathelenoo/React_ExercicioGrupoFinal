import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./style.css";
import { useEffect, useState } from "react";

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
  // imagem: yup
  //   .mixed()
  //   .required("Uma imagem é necessaria")
  //   .test(
  //     "fileType",
  //     "Tipo de arquivo não suportado",
  //     (value) =>
  //       !value ||
  //       (value && ["image/jpeg", "image/png", "image/gif"].includes(value.type))
  //   ),
});

function Adicionar() {
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);


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

  const handleChange = (e) => {
    setSelectedCategoria(e);
  };

  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setImage(file);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationPost) });

  const addPost = async (data) => {
    const file = new Blob([image], {
      type: image.type,
    });

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "livro",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    console.log(data);
    axios
      .post(`http://localhost:8080/livros`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch(() => console.log("Falha na requisição"));
  };

  return (
    <div>
      <Header />
      <main>
        <div className="card-post">
          <h1>Adicionar Livro</h1>
          <br />
          <form onSubmit={handleSubmit(addPost)}>
            <div className="fields">
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
                id="categoria"
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
              
              {/* <input type="text" id="categoria" {...register("categoria")} /> */}

              <label htmlFor="sinopse">Sinopse</label>
              <textarea
                type="text"
                id="sinopse"
                cols="50"
                rows="10"
                {...register("sinopse")}
              />
              <p className="Error-message">{errors.sinopse?.message}</p>

              <div>
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
              </div>
              {/* {preview && ( 
              <div>
                <h3>Imagem Livro:</h3>
                <img src={preview} alt="Imagem preview" style={{ width: '300px', height: 'auto' }} />
              </div>
            )} */}
              <div className="card-add">
                <button>Adicionar</button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Adicionar;
