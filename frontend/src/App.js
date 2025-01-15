import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookTable from "./components/BookTable";
import Modal from "./components/Modal";
import BookDetailsPage from "./pages/BookDetailsPage";
import { BASE_URL } from "./constants";
import "./index.css";


const App = () => {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [currentBook, setCurrentBook] = useState(null);


  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${BASE_URL}/books`);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleAddBook = () => {
    setModalType("add");
    setCurrentBook(null);
    setIsModalOpen(true);
  };

  const handleEditBook = (book) => {
    setModalType("edit");
    setCurrentBook(book);
    setIsModalOpen(true);
  };

  const handleDeleteBook = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/books/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setBooks(books.filter((book) => book._id !== id));
      } else {
        console.error("Failed to delete book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleSaveBook = async (book) => {
    try {
      if (modalType === "add") {
        const response = await fetch(`${BASE_URL}/books`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(book),
        });
        if (response.ok) {
          fetchBooks();
        }
      } else {
        const response = await fetch(`${BASE_URL}/books/${book._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(book),
        });
        if (response.ok) {
          fetchBooks(); 
        }
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  return (
    <Router>
      <div className="container">
        <h1>Book Management</h1>
        <button className="button add" onClick={handleAddBook}>
          Add Book
        </button>
        <Routes>
          <Route
            path="/"
            element={
              <BookTable
                books={books}
                onEdit={handleEditBook}
                onDelete={handleDeleteBook}
              />
            }
          />
          <Route
            path="/book/:id"
            element={<BookDetailsPage books={books} />}
          />
        </Routes>
        {isModalOpen && (
          <Modal
            type={modalType}
            book={currentBook}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveBook}
          />
        )}
      </div>
    </Router>
  );
};

export default App;