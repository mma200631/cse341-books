import express from 'express';
const route= express.Router();

import { getBooksHandler, getBookByIdHandler } from './controllers/books.js';

route.get('/books', getBooksHandler);
route.get('/books/:id', getBookByIdHandler);

export default route;