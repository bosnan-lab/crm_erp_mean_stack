const Collaborator = require('../models/collaborator');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');

// register collaborator
const register_collaborator_admin = async function (req, res) {
    let data = req.body;

    try {
        // email validation if already exist
        const collaborators = await Collaborator.find({ email: data.email });

        // using bcrypt
        bcrypt.hash('123456789', null, null, async function (error, hash) {
            if (error) {
                res.status(200).send({
                    data: undefined,
                    message: 'Failed to generate password',
                });
            } else {
                if (collaborators.length >= 1) {
                    res.status(200).send({
                        data: undefined,
                        message: 'The email already exists',
                    });
                } else {
                    // concatenating full name
                    data.full_names = data.name + ' ' + data.last_name;
                    data.password = hash;
                    // record data in mongodb
                    let collaborator = await Collaborator.create(data);
                    res.status(200).send({ data: collaborator });
                }
            }
        });
    } catch (error) {
        res.status(200).send({
            data: undefined,
            message: 'Verify the data form',
        });
    }
};

// login collaborator
const login_admin = async function (req, res) {
    let data = req.body;
    // email validation if already exist
    const collaborators = await Collaborator.find({ email: data.email });

    if (collaborators.length >= 1) {
        // if there is an account

        // bcrypt to compare the password
        bcrypt.compare(
            data.password,
            collaborators[0].password,
            async function (error, check) {
                if (check) {
                    res.status(200).send({
                        user: collaborators[0],
                        token: jwt.createToken(collaborators[0]),
                    });
                } else {
                    res.status(200).send({
                        data: undefined,
                        message: 'Password is wrong',
                    });
                }
            }
        );
    } else {
        res.status(200).send({
            data: undefined,
            message: 'email does not exist',
        });
    }
};

module.exports = {
    register_collaborator_admin,
    login_admin,
};
