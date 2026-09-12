import { getAllBooks, getBookById, createBook , authorExists,updateBook, deleteBook } from "../models/books.js";

const getBooksHandler = async(req , res)=>{
    try{
        const books= await getAllBooks();
        return res.status(200).json(books);
    }catch(error){
        console.error('Failed to retrieve books:', error.message);
        return res.status(500).json({message: 'Failed to retrieve books'});
    }
}

const getBookByIdHandler = async(req , res)=>{
    const bookId=req.params.id;
    try{
        const book= await getBookById(bookId);
        if(!book){
            return res.status(404).json({message: 'Book not found'});
        }
        return res.status(200).json(book);
    } catch(error){
        console.error('Failed to retrieve book:', error.message);
        return res.status(500).json({message: 'Failed to retrieve book'});
    }
}

const  createBookHandler= async(req , res)=>{
    try{
        const{id, authorId, title, publicationDate}= req.body;
        if(!id|| !authorId || !title || !publicationDate){
            return res.status(400).json({message: ' All field are required'})
        }

        // Check if book id already exists
        const existingBook= await getBookById(id);
        if(existingBook){
            return res.status(400).json({message: 'Book id already exist'})

        }

        // Check if author exists
        const existAuthor= await authorExists(authorId);
        if (!existAuthor){
            return res.status(404).json({message:' Author not found'})
        }

        const newBook = {id, authorId, title, publicationDate};
        await createBook(newBook);

        return res.status(200).json(newBook);
    }catch (error) {
        console.error("Failed to create book:", error.message);

        return res.status(500).json({
            message: "Failed to create book"
        });
    };

};

const updateBookHandler = async(req , res)=>{
    const bookId= req.params.id;
    try{
        // Check if the book exists
        const existingBook = await getBookById(bookId);

        if (!existingBook) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        const { authorId, title, publicationDate } = req.body;

        // Check required fields
        if (!authorId || !title || !publicationDate) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check if author exists
        const exists = await authorExists(authorId);

        if (!exists) {
            return res.status(400).json({
                message: "Author not found"
            });
        }

        const updatedBook = {
            authorId,
            title,
            publicationDate
        };

        await updateBook(bookId, updatedBook);

        const book = await getBookById(bookId);

        return res.status(200).json(book);

    } catch (error) {
        console.error("Failed to update book:", error.message);

        return res.status(500).json({
            message: "Failed to update book"
        });
    }
}

const deleteBookHandler = async(req, res)=>{
    const bookId= req.params.id;
    try{
        const result= await deleteBook(bookId);
         if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        return res.status(204).send();

    } catch (error) {
        console.error("Failed to delete book:", error.message);

        return res.status(500).json({
            message: "Failed to delete book"
        });
    }
    }






export {getBooksHandler, getBookByIdHandler, createBookHandler, updateBookHandler, deleteBookHandler};