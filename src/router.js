import express from 'express';
const route= express.Router();

import { getBooksHandler, getBookByIdHandler } from './controllers/books.js';

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get all books
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: A list of books
 *       500:
 *         description: Internal server error
 */
route.get('/books', getBooksHandler);


/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book
 *     responses:
 *       200:
 *         description: The requested book
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
route.get('/books/:id', getBookByIdHandler);

export default route;