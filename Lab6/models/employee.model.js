const mongoose = require("mongoose");

let empSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'Required field'
    },
    lastName: {
        type: String,
        required: 'Required field'
    },
    department: {
        type: String,
        required: 'Required field'
    },
    startDate: {
        type: Date,
        required: 'Required field'
    },
    jobTitle: {
        type: String,
        required: 'Required field'
    },
    salary: {
        type: Number,
        required: 'Required field'
    },
},{ collection: 'employee' });

module.exports = mongoose.model('Employee', empSchema);