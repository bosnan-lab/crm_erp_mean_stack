const express = require('express');
const collaboratorController = require('../controllers/collaboratorController');

const app = express.Router();

app.post(
    '/register_collaborator_admin',
    collaboratorController.register_collaborator_admin
);

module.exports = app;
