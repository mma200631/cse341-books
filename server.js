import app from './app.js';
const PORT= process.env.PORT;

if(!PORT) {
    throw new Error('PORT is not defined');
}

app.listen(PORT , ()=> {
    console.log(`Serveris listening at 127.0.0.1: ${PORT}`)
})