// importing all the necessary modules
const express = require('express');
const path = require('path');
//importing the DB connection
const db = require('./config/connection');
//importing the routes created
const routes = require('./routes');

const app = express();
//setting the port
const PORT = process.env.PORT || 3001;

// express middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// use the routes that were imported
app.use(routes);

//serve client/build as static assets
const root = require('path').join(__dirname, 'client', 'build')
app.use(express.static(root));
app.get("*", (req, res) => {
    res.sendFile('index.html', {
        root
    });
})

db.once('open', () => {
    app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}!`));
});