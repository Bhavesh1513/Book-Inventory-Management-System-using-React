import React from "react";
import { useParams } from "react-router-dom";

const BookDetailsPage = ({ books }) => {
  const { id } = useParams();
  const book = books.find((b) => b._id === id);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (!book) {
    return <div className="book-nf">Book not found</div>;
  }

  return (
    <div className="book-details">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Published Date:</strong> {formatDate(book.publishedDate)}</p>
      <p><strong>Publisher:</strong> {book.publisher}</p>
      <p><strong>Description:</strong> {book.description}</p>
      
      <div className="content">
        <p><strong>Content:</strong></p>
        <p>{book.bookContent}</p>
      </div>
      
      <p className="price"><strong>Price:</strong> ₹{book.price}</p>
    </div>
  );
};

export default BookDetailsPage;
