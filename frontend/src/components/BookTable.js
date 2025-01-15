import React from "react";
import { Link } from "react-router-dom";

const BookTable = ({ books, onEdit, onDelete }) => {
  return (
    <div className="table-container">
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book._id}>
            <td>
              <Link to={`/book/${book._id}`} className="book-link">
                {book.title}
              </Link>
            </td>
            <td>{book.author}</td>
            <td className="btns">
              <button className="button edit" onClick={() => onEdit(book)}>
                Edit
              </button>
              <button className="button delete" onClick={() => onDelete(book._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default BookTable;
