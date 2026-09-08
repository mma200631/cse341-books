import express from 'express';
const route= express.Router();

import { getBooksHandler } from './controllers/books.js';

route.get('/books', getBooksHandler);

export default route;