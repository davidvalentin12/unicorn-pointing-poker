var User = require('../user/user.model');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Room', new Schema({
    name: {
        type: String,
        required:true,
        unique:true
    },
    votes:{
        type: Array,
        default: []
    },
    users:{
        type: Array,
        default: []
    }
}));