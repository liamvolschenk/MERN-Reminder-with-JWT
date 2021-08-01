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

//serve static assets if were in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


db.once('open', () => {
    app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}!`));
});