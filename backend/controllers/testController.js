const prueba_test = async function (req, res) {
    res.status(200).send({ message: 'Hi from Test' });
};

module.exports = {
    prueba_test,
};
