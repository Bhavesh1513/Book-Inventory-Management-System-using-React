import React from "react";
import { useLocation } from "react-router-dom";

const AddBookButton = () => {
  const location = useLocation();

  // Conditionally render the button
  if (location.pathname === "/book/:id") {
    return null; // Don't show the button on book details page
  }

  return (
    <button className="button add" onClick={() => { /* handleAddBook logic here */ }}>
      Add Book
    </button>
  );
};

export default AddBookButton;
