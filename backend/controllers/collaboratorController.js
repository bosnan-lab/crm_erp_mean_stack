const Collaborator = require('../models/collaborator');
const bcrypt = require('bcrypt-nodejs');

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

module.exports = {
    register_collaborator_admin,
};
