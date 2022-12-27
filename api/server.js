const dotenv = require('dotenv').config();
const express = require('express');
const app = express();

// import the routes
const shirtRoutes = require('./routes/shirt');
const userRoutes = require('./routes/user');

const mongoose = require('mongoose');
app.use(express.json());

//to use the routes
app.use('/', shirtRoutes);
app.use('/', userRoutes);


mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);


const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})

app.get('/', function(req, res) {
    res.sendFile('/home/isdev/Documents/uni/IS-Progetto/UrbanShirt/sviluppo/implementation/ui/homepage.html', {});
})

app.get('/homepage.css', function(req, res) {
    res.sendFile('/home/isdev/Documents/uni/IS-Progetto/UrbanShirt/sviluppo/implementation/ui/homepage.css', {});
})

app.get('/style.css', function(req, res) {
    res.sendFile('/home/isdev/Documents/uni/IS-Progetto/UrbanShirt/sviluppo/implementation/ui/style.css', {});
})

app.get('/script.js', function(req, res) {
    res.sendFile('/home/isdev/Documents/uni/IS-Progetto/UrbanShirt/sviluppo/implementation/ui/script.js', {});
})

app.get('/propostecommunity.html', function(req, res) {
    res.sendFile('/home/isdev/Documents/uni/IS-Progetto/UrbanShirt/sviluppo/implementation/ui/propostecommunity.html', {});
})

/* INSERT DATI DI ESEMPIO PER COMPANY SHIRT - DA RIMUOVERE
const companyShirtModel = require('./models/company-shirt');

companyShirtModel.insertMany(
    [
        {name: 'homepage-community-shirt', creationDate: new Date(), image: 'https://github.com/UrbanShirt/implementation/blob/main/images/shirts/homepage-community-shirt.png?raw=true'},
        {name: 'homepage-company-shirt', creationDate: new Date(), image: 'https://github.com/UrbanShirt/implementation/blob/main/images/shirts/homepage-company-shirt.png?raw=true'},
        {name: 'maglietta nera c-style', creationDate: new Date(), image: 'https://github.com/UrbanShirt/implementation/blob/main/images/shirts/black-blank-shirt-company.png?raw=true', color: 'black', material: 'polyester'},
        {name: 'maglietta bianca c-style', creationDate: new Date(), image: 'https://github.com/UrbanShirt/implementation/blob/main/images/shirts/white-blank-shirt-company.png?raw=true', color: 'white', material: 'rayon'},
        {name: 'maglietta blu c-style', creationDate: new Date(), image: 'https://github.com/UrbanShirt/implementation/blob/main/images/shirts/blue-blank-shirt-company.png?raw=true', color: 'blue', material: 'polyester'},
        {name: 'maglietta rossa c-style', creationDate: new Date(), image: 'https://github.com/UrbanShirt/implementation/blob/main/images/shirts/red-blank-shirt-company.png?raw=true', color: 'red', material: 'polyester'},
    ],
    function (err) {
        console.log("array of shirts added");
    });
*/

/* INSERT DATI DI ESEMPIO PER COMMUNITY SHIRT - DA RIMUOVERE
const communityShirtModel = require('./models/community-shirt');

communityShirtModel.insertMany(
    [
        {name: 'maglietta nera RODOLFO', creationDate: new Date(), image: 'https://github.com/UrbanShirt/implementation/blob/main/images/shirts/black-blank-shirt-community.png?raw=true', creator: 'Rodolfo', color: 'black', material: 'polyester', isPublic: true},
        {name: 'maglietta bianca RODOLFO', creationDate: new Date(), image: 'https://github.com/UrbanShirt/implementation/blob/main/images/shirts/white-blank-shirt-community.png?raw=true', creator: 'Rodolfo', color: 'white', material: 'polyester', isPublic: true},
        {name: 'maglietta blu RODOLFO', creationDate: new Date(), image: 'https://github.com/UrbanShirt/implementation/blob/main/images/shirts/blue-blank-shirt-community.png?raw=true', creator: 'Rodolfo', color: 'blue', material: 'polyester', isPublic: true},
        {name: 'maglietta rossa RODOLFO', creationDate: new Date(), image: 'https://github.com/UrbanShirt/implementation/blob/main/images/shirts/red-blank-shirt-community.png?raw=true', creator: 'Rodolfo', color: 'red', material: 'polyester'},
        {name: 'maglietta swag quadrato rosso', creationDate: new Date(), image: 'https://github.com/UrbanShirt/implementation/blob/main/images/shirts/sample-weekly-shirt.png?raw=true', creator: 'Anselmo', color: 'white', material: 'cotton', likes: 2, isPublic: true, isMostLiked: true}
    ],
    function (err) {
        console.log("array of shirts added");
    });
*/

/*
const communityShirtModel = require('./models/community-shirt');
const companyShirtModel = require('./models/company-shirt');

communityShirtModel.deleteMany({name: {$regex: '.*', $options: 'i'}}, function(err) {console.log("shirts deleted");});
companyShirtModel.deleteMany({name: {$regex: '.*', $options: 'i'}}, function(err) {console.log("shirts deleted");});
*/
