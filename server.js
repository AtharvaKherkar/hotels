const express = require('express');
const app = express();
const db = require('./db');
const Person = require('./models/person');
const MenuItem = require('./models/MenuItem'); // Fixed import

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to our Hotel');
});



// Import the router file
const personRoutes = require('./routes/personRoute'); // Must match the filename exactly
;
const menuItemRoutes = require('./routes/menuItemRoute')
// Use the router
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

// Start the server
app.listen(3000, () => {
    console.log('Listening on port 3000');
});


