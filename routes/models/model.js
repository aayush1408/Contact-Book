var mongoose = require('mongoose');
var connect = mongoose.connect('mongodb://localhost/contact');
var db = mongoose.connection;

var contactSchema = mongoose.Schema({
    name:{type:String},
    email:{type:String},
    number:{type:String},
    address:{type:String}
});

var Contact = module.exports = mongoose.model('Contact',contactSchema);
