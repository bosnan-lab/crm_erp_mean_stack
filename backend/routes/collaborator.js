const express = require('express');
const collaboratorController = require('../controllers/collaboratorController');

const app = express.Router();

//register
app.post(
    '/register_collaborator_admin',
    collaboratorController.register_collaborator_admin
);
//login
// app.post('/login_admin', collaboratorController.login_admin);

module.exports = app;
