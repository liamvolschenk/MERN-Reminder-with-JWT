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

// if the app is in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
};

// use the routes that were imported
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}!`));
});