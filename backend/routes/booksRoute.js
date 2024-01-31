import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

const ITEMS_PER_PAGE = 4;

router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title || 
            !request.body.author || 
            !request.body.publishYear ||
            !request.file.path ||
            !request.body.description
        ) {
            response.status(400).send({ 
                message: 'Send all required fields: title, author, publishYear'
            })
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
            image: request.file.path,
            description: request.body.description
        }

        const book = await Book.create(newBook);
        return response.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/', async (request, response) => {
    try {
        const page = +request.query.page || 1;
        let totalItems;
        const books = await Book.find({})
            .then(book => {
                totalItems = book.length;
                return Book.find()
                .skip((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
                .sort({createdAt: 'desc'});
            });
        return response.status(200).json({
            count: books.length,
            data: books,
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalItems,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.post('/:id', async (request, response) => {
    try {
        if (
            !request.body.title || 
            !request.body.author || 
            !request.body.publishYear ||
            !request.file.path ||
            !request.body.description
        ) {
            response.status(400).send({ 
                message: 'Send all required fields: title, author, publishYear'
            })
        }

        const { id } = request.params;
        const book = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
            image: request.file.path,
            description: request.body.description
        }
        const result = await Book.findByIdAndUpdate(id, book);
        console.log(result);
        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }
        return response.status(200).json({ message: 'Book updated successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        console.log(result);
        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }
        return response.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;