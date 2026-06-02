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


app.get('/start', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/start', (req, res) => {
    console.log(req.body);
});

app.get('/findout', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

app.post('/findout', (req, res) => {
    console.log(req.body);
});



//last line in this file
app.listen(port, () => console.log(`Listening on port ${port}`));
