const mongoose = require('mongoose');

//getting mongoose schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: String,
    password: String
});
//users is the collection name  that we created
module.exports = mongoose.model('user',userSchema,'users');