// models/User.js
const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
    id: { type: String },
    BannerName: { type: String },
    WebsiteBanner: { type: String },
    bannerStatus: { type: String }
});

module.exports = mongoose.model('WebsiteBanner', websiteSchema);
