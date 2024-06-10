import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <img
        src={book.image}
        alt={book.title}
        className="book-image"
        style={{ width: '150px', height: '150px' }} // Adicionando estilos para definir o tamanho da imagem
      />
      <div className="book-details">
        <h2>{book.title}</h2>
        <p><strong>Autor:</strong> {book.author}</p>
        <p><strong>Descrição:</strong> {book.description}</p>
        <p><strong>Gênero:</strong> {book.genre}</p>
      </div>
    </div>
  );
};

export default BookCard;
