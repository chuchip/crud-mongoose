const mongoose  = require('mongoose');
logger = require('../logger').logger
const { Schema } = mongoose;

const PersonSchema = new Schema({
  user:  String, // String is shorthand for {type: String}
  password: String,
  name:   String,
  surname: String,
  company_email:String,
   personal_email:String,
   city: String,
   active: Boolean ,
   imagen_url: String,
   termination_date: Date,
   createdAt: Date,
    updatedAt: Date
});

module.exports  = mongoose.model('Persona', PersonSchema);