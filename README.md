
# Book Inventory Management System

A book inventory management system built with React. The application allows users to view, add, edit, and delete books from a collection. It also provides detailed book information, including author, publisher, and price.

## Features

- View a list of books.
- View detailed information for each book.
- Add new books to the inventory.
- Edit existing books.
- Delete books from the inventory.
- Responsive design for mobile and desktop.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **React Router**: For routing and navigation.
- **Fetch API**: To interact with the backend (assuming API endpoints are set up on the server).
- **CSS**: For custom styling of components and layout.
- **Toastify**: For displaying toast notifications (e.g., success, error).

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Bhavesh1513/Book-Inventory-Management-System-using-React.git
   ```

2. Navigate to the project folder:

   ```bash
   cd book-inventory-management
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

### Configuration

Make sure to replace the `BASE_URL` constant with the correct URL for your backend API.

```js
const BASE_URL = 'https://book-inventory-management-system-using.onrender.com';
```

### Running the Application

To run the application in development mode, use:

```bash
npm start
```

This will start the app on [http://localhost:3000](http://localhost:3000).

### Building the Application

To build the project for production, use:

```bash
npm run build
```

This will create a `build` folder containing the optimized production build.

## Folder Structure

```
/src
  /components
    - BookTable.js          // Displays the list of books
    - Modal.js              // Modal for adding/editing books
  /pages
    - BookDetailsPage.js    // Displays detailed information of a book
  /constants
    - index.js             // Contains BASE_URL constant
  /index.css               // Global styles
  - App.js                 // Main application component
```
