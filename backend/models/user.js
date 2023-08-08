// data to mongo db
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    full_names: { type: String, required: true },
    phone: { type: String, required: false },
    role: { type: String, required: true },
    gender: { type: String, required: true },
    document_number: { type: String, required: false },
    password: { type: String, required: true },
    state: { type: Boolean, default: true, required: true },
    country: { type: String, required: false },
});

module.exports = mongoose.model('user', userSchema);
