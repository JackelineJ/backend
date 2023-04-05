const express = require('express')
const fs = require('fs')

const app = express()

app.get('/', (request, response) => {
    response.send('Hi this is my server')
})

app.get('/products', (request, response) => {
    fs.readFile('productArchive.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).send('Error reading products file');
            return;
        }
        const products = JSON.parse(data);
        response.json(products);
    });
})

app.listen(8080, ()=>{
    console.log('Here is the 8080 port')
})