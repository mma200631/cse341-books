import { getDb } from "../db/connect.js";

const getAllAuthors = async()=>{
    const db= getDb()
    const collection= db.collection('authors');
    const authors= await collection.find({}).toArray();
    return authors;
}

const getAuthorById= async(authorId)=>{
    const db= getDb();
    const collection = db.collection('authors');
    const author= await collection.findOne({id:authorId});
    return author;
}

const createAuthor= async(authorData)=>{
    const db= getDb();
    const collection= db.collection('authors');
    const result= await collection.insertOne(authorData);
    return authorData;
}

const updateAuthor= async(authorId, updatedData)=>{
    const db= getDb();
    const collection= db.collection('authors');
    const result= await collection.updateOne({id:authorId}, {$set: updatedData})
    return result.modifiedCount > 0;
}

const deleteAuthor= async(authorId)=>{
    const db= getDb();
    const authorsCollection = db.collection('authors');
    const booksCollection= db.collection('books');

     // Check if the author exists
     const author = await authorsCollection.findOne({id:authorId})
     if(!author){
        return {status: 'not_found'};
     }

     // Check if any books reference this author
     const book= await booksCollection.findOne({authorId})
     if(book){
        return {status: 'referenced'}
     }

     // Delete the author
     await authorsCollection.deleteOne({id: authorId})
     return {status: 'deleted'}

}

export { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };