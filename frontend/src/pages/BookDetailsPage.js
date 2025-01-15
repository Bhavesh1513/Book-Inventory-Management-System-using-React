import React from "react";
import { useParams } from "react-router-dom";

const BookDetailsPage = ({ books }) => {
  const { id } = useParams(); // Get book id from URL
  const book = books.find((b) => b._id === id);

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="book-details">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Published Date:</strong> {book.publishedDate}</p>
      <p><strong>Publisher:</strong> {book.publisher}</p>
     
      <p><strong>Content:</strong> {book.bookContent}</p>
      <p><strong>Price:</strong> ${book.price}</p>
    </div>
  );
};

export default BookDetailsPage;
