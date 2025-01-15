import React, { useState } from "react";

const Modal = ({ type, book, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    book || { title: "", author: "", description: "", publisher: "", bookContent: "", price: "" }
  );

  const [errors, setErrors] = useState({});

  const validateInput = () => {
    const newErrors = {};
    const alphanumericRegex = /^[a-zA-Z0-9\s]+$/;
    const numericRegex = /^\d+(\.\d+)?$/;

    if (!formData.title || !alphanumericRegex.test(formData.title)) {
      newErrors.title = "Title must be alphanumeric.";
    }
    if (formData.description && !alphanumericRegex.test(formData.description)) {
      newErrors.description = "Description must be alphanumeric.";
    }
    if (formData.bookContent && !alphanumericRegex.test(formData.bookContent)) {
      newErrors.bookContent = "Book content must be alphanumeric.";
    }
    if (formData.publisher && !alphanumericRegex.test(formData.publisher)) {
      newErrors.publisher = "Publisher must be alphanumeric.";
    }
    if (!formData.price || !numericRegex.test(formData.price)) {
      newErrors.price = "Price must be a numeric value.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInput()) {
      onSave(formData);
    }
  };

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <h2>{type === "add" ? "Add Book" : "Edit Book"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          {errors.title && <span className="error">{errors.title}</span>}
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author"
            required
          />
          {errors.author && <span className="error">{errors.author}</span>}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />
          {errors.description && <span className="error">{errors.description}</span>}
          <input
            type="text"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            placeholder="Publisher"
          />
          {errors.publisher && <span className="error">{errors.publisher}</span>}
          <textarea
            name="bookContent"
            value={formData.bookContent}
            onChange={handleChange}
            placeholder="Book Content"
          />
          {errors.bookContent && <span className="error">{errors.bookContent}</span>}
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          {errors.price && <span className="error">{errors.price}</span>}
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
};

export default Modal;
