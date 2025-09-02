//standard way to configure an express app
const express = require('express');             //importation
const app = express();                           //instantation
const port = 3000;

//route for the landing page
app.get('/', (req, res) => {
    res.send('Get started!');
});

//route for the home page
app.get('/home', (req, res) => {
    res.send('Browse your city weather!');
});


//last line in this file
app.listen(port, () => console.log(`Listening on port ${port}`));
