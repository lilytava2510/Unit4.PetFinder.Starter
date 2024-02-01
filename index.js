// import the pets array from data.js
 
const express = require('express');
const path = require('path')
const pets = require('./data');

// init express app
const app = express();

const PORT = 8080;
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

// GET - / - returns homepage
app.get('/', function(req, res){
    // serve up the public folder as static index.html file
    res.sendFile(path.join(__dirname, '/public/index.html'))

});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    // send the pets array as a response 
        const alllPets = pets.map(pet => {return JSON.stringify(pet)})  
        res.send(`All the pets: ${alllPets}`)
    //const allPets = req.query.pet
//res.json(pets)

//    res.send(`All Pets: ${pets}`)

});

// get pet by owner with query string
app.get('/api/v1/pets/owner', (req, res) => {
    // get the owner from the request
    const owner = pets.map(pet => {return JSON.stringify(pet.owner)}) 
    const pet = pets.find(pet => pet.owner === owner);
    res.send(`Owner of pets: ${owner}`) 
    

    // find the pet in the pets array

    // send the pet as a response
    // res.send(owner)
});

// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request
    const name = req.params.name;
    //const namePet = pets.map(pet => {return JSON.stringify(pet.name)}) 
    // find the pet in the pets array
    const pet = pets.find(pet => pet.name === name);
    res.send(`${pet.name} `)
    // send the pet as a response

});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;