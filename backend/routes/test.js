const express = require('express');
const testController = require('../controllers/testController');

const app = express.Router();

app.get('/prueba_test', testController.prueba_test);

module.exports = app;
