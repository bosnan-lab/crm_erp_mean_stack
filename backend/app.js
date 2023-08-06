const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

// port number
const PORT = process.env.PORT || 3000;

const app = express();
const test_routes = require('./routes/test');

// database connection
const dbURI = 'mongodb://127.0.0.1:27017/crm-erp';

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// obtain the instance of the connection
const db = mongoose.connection;

// event handlers for connection
db.on('error', (error) => {
    console.error('Connection Error', error);
});

db.once('open', () => {
    console.error('Successfully established connection to the database');
});

// requests or data from the frontend
app.use(bodyparser.urlencoded({ limit: '100mb', extended: true }));
app.use(bodyparser.json({ limit: '100mb', extended: true }));

// cors middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, PUT, POST, DELETE, OPTIONS'
    );
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});

// express initialization
app.listen(PORT, function () {
    console.log(`Server running on port: ${PORT}`);
});

app.use('/api', test_routes);

module.exports = app;
