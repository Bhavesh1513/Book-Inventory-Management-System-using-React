
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
const cors = require('cors');
app.use(cors());


app.use(bodyParser.json());
app.use(
  cors({
    origin: '*',
  })
);

console.log(process.env.mongoURI)
console.log(typeof process.env.mongoURI)
const mongoURI = process.env.mongoURI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.log('Error connecting to MongoDB:', err);
});

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        default: Date.now(),
        required:false
      },
    publisher: {
        type: String,
        required: true
    },
    bookContent: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});


const Book = mongoose.model('Book', bookSchema);

app.get('/books', async (req, res) => {
    try {
        const books = await Book.find(); 
        if (!books.length) {
            return res.status(404).send('No books found');
        }
        res.json(books);
    } catch (err) {
        res.status(500).send('Error fetching books');
    }
});


app.get('/books/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.json(book);
    } catch (err) {
        res.status(500).send('Error fetching the book');
    }
});

app.post('/books', async (req, res) => {
    const { title, author, description, publishedDate, publisher, bookContent, price } = req.body;
    
    if (!title || !author || !description || !publisher || !bookContent || !price) {
        return res.status(400).send('Missing required fields');
    }

    try {
        const newBook = new Book({
            title,
            author,
            description,
            publishedDate,
            publisher,
            bookContent,
            price
        });
        
        await newBook.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(500).send('Error saving the book');
    }
});

app.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, description, publishedDate, publisher, bookContent, price } = req.body;

    if (!title || !author || !description || !publishedDate || !publisher || !bookContent || !price) {
        return res.status(400).send('Missing required fields');
    }

    try {
        const updatedBook = await Book.findByIdAndUpdate(id, {
            title,
            author,
            description,
            publishedDate,
            publisher,
            bookContent,
            price
        }, { new: true });

        if (!updatedBook) {
            return res.status(404).send('Book not found');
        }

        res.json(updatedBook);
    } catch (err) {
        res.status(500).send('Error updating the book');
    }
});

app.delete('/books/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).send('Book not found');
        }

        res.status(200).send('Book deleted successfully');
    } catch (err) {
        res.status(500).send('Error deleting the book');
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
