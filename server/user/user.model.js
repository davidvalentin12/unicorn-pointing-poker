var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    name: {
        type: String,
        default: ''
    },
    vote:{
        type: Number,
        default: ''
    }
});