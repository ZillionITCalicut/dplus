
const mongoose = require('mongoose');


const enquirySchema = new mongoose.Schema({
    userName: { type: String },
    userEmail: { type: String },
    userPhone: { type: String },
    userMessage: { type: String },
    status: { type: String }
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;