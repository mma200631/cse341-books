import express from 'express';
import route from './src/router.js';
const app= express();

app.use(express.json());
app.use(route);

app.get('/', (req, res)=> {
    return res.status(200).json({message: 'Server is running successfully'});
});



export default app;