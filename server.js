const dotenv = require('dotenv').config();
const express = require('express');
const app = express();

// import the routes
const routes = require('./routes/shirt');

const mongoose = require('mongoose');

//to use the routes
app.use('/', routes);


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


