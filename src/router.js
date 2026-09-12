import express from 'express';
const route= express.Router();

import { getBooksHandler, getBookByIdHandler, createBookHandler, updateBookHandler, deleteBookHandler } from './controllers/books.js';
import { getAuthorsHandler, getAuthorByIdHandler , createAuthorHandler, updateAuthorHandler, deleteAuthorHandler} from './controllers/authors.js';

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

/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: A list of authors
 *       500:
 *         description: Failed to retrieve authors
 */
route.get('/authors', getAuthorsHandler);

/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the author
 *     responses:
 *       200:
 *         description: The requested author
 *       404:
 *         description: Author not found
 *       500:
 *         description: Failed to retrieve author
 */

route.get('/authors/:id', getAuthorByIdHandler);

/**
 * @openapi
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags:
 *       - Authors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - birthYear
 *             properties:
 *               id:
 *                 type: string
 *                 example: a4
 *               name:
 *                 type: string
 *                 example: John Smith
 *               birthYear:
 *                 type: number
 *                 example: 1988
 *     responses:
 *       201:
 *         description: Author created successfully
 *       400:
 *         description: Invalid or missing author data
 *       500:
 *         description: Failed to create author
 */
route.post('/authors', createAuthorHandler);

/**
 * @openapi
 * /authors/{id}:
 *   put:
 *     summary: Update an existing author
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the author to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birthYear
 *             properties:
 *               name:
 *                 type: string
 *                 example: Maya Rivera Updated
 *               birthYear:
 *                 type: number
 *                 example: 1986
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       400:
 *         description: Missing or invalid author information
 *       404:
 *         description: Author not found
 *       500:
 *         description: Failed to update author
 */
route.put('/authors/:id', updateAuthorHandler);


/**
 * @openapi
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the author to delete
 *     responses:
 *       204:
 *         description: Author deleted successfully
 *       404:
 *         description: Author not found
 *       409:
 *         description: Cannot delete author because books still reference this author
 *       500:
 *         description: Failed to delete author
 */
route.delete('/authors/:id', deleteAuthorHandler);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - authorId
 *               - title
 *               - publicationDate
 *             properties:
 *               id:
 *                 type: string
 *                 example: b4
 *               authorId:
 *                 type: string
 *                 example: a1
 *               title:
 *                 type: string
 *                 example: The Great Gatsby
 *               publicationDate:
 *                 type: string
 *                 example: 1925-04-10
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Missing required fields, duplicate book ID, or author not found
 *       500:
 *         description: Internal server error
 */
route.post("/books", createBookHandler);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: b1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - authorId
 *               - title
 *               - publicationDate
 *             properties:
 *               authorId:
 *                 type: string
 *                 example: a1
 *               title:
 *                 type: string
 *                 example: 1984
 *               publicationDate:
 *                 type: string
 *                 example: 1949-06-08
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Missing required fields or author not found
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
route.put("/books/:id", updateBookHandler);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: b1
 *     responses:
 *       204:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
route.delete("/books/:id", deleteBookHandler);

export default route;