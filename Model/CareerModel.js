
const mongoose = require('mongoose');


const careerSchema = new mongoose.Schema({
    userName: { type: String },
    userEmail: { type: String },
    postApplied: { type: String },
    gender: { type: String },
    zipCode: { type: String },
    userPhone: { type: String },
    status: { type: String },
    resume: { type: String },
});

const Career = mongoose.model('Career', careerSchema);

module.exports = Career;