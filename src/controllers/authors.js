import { getAllAuthors, getAuthorById, createAuthor, updateAuthor } from "../models/authors.js";

const getAuthorsHandler = async(req , res)=>{
    try{
        const authors= await getAllAuthors();
        return res.status(200).json(authors);  
    }catch(error){
        console.error('Failed to retrieve authors:', error.message);
        return res.status(500).json({ error: 'Failed to retrieve authors' });
    }
}

const getAuthorByIdHandler = async(req , res)=>{
    const authorId= req.params.id;
    try{
        const author= await getAuthorById(authorId);
        if(!author){
            return res.status(404).json({message:' Author not found'});
        }
        return res.status(200).json(author);
    }catch(error){
        console.error('Failed to retrieve author:', error.message);
        return res.status(500).json({ error: 'Failed to retrieve author' });
    }
}

const createAuthorHandler = async(req , res)=>{
    try{
        const {id, name, birthYear}= req.body;
        if(!id|| !name|| birthYear=== undefined){
            return res.status(400).json({message:' Missing required fields : id, name and BirthYear.'});   
        }

        const exsistingAuthor= await getAuthorById(id);
        if(exsistingAuthor){
            return res.status(400).json({message:' Author with the same ID already exists.'});
        }

        const newAuthor= await createAuthor({id, name, birthYear});
        return res.status(201).json(newAuthor);

    }catch(error){
        console.error('Failed to create author:', error.message);
        return res.status(500).json({ error: 'Failed to create author' });
    }
    
   
}

const updateAuthorHandler = async(req , res)=>{
    try{
        const authorId= req.params.id;
        const{name, birthYear}= req.body;
        if(!name || birthYear=== undefined){
            return res.status(400).json({message: 'Updatefailed'})
        }

        const updated= await updateAuthor(authorId, {name, birthYear})
        if(updated===false){
            return res.status(404).json({message:' Author not found'})
        }
        return res.status(200).json({message: 'Author updated successfully'})
    }catch (error) {
    console.error('Failed to update author:', error.message);
    return res.status(500).json({
        error: 'Failed to update author'
    });
}
}

const deleteAuthorHandler= async(req, res)=>{
    try{
        const authorId = req.params.id;

        const result = await deleteAuthorHandler(authorId);

        if (result.status === 'not_found') {
            return res.status(404).json({
                message: 'Author not found'
            });
        }

        if (result.status === 'referenced') {
            return res.status(409).json({
                message: 'Cannot delete author because books still reference this author'
            });
        }

        return res.status(204).send();

    } catch (error) {
        console.error('Failed to delete author:', error.message);

        return res.status(500).json({
            error: 'Failed to delete author'
        });
    }
}

export{getAuthorsHandler, getAuthorByIdHandler, createAuthorHandler, updateAuthorHandler, deleteAuthorHandler};