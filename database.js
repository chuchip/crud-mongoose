const mongoose  = require('mongoose');
logger = require('./logger').logger

let isConnected;
require('dotenv').config({ path: './db.env' });

module.exports = connectToDatabase = () => 
{
    if (isConnected) {
        console.log('=> using existing database connection');
        return Promise.resolve();
    }
    logger.info("Connecting to mongo .... ");
    const db_user=process.env['DB_USER'] || 'chuchip'
    const db_pass=process.env.DB_PASS
    const db_url = process.env.DB_URL
    logger.debug(`Usuario: ${db_user} Contraseña: ${db_pass}`)
    var uri = `mongodb+srv://${db_user}:${db_pass}@${db_url}`;

    if (db_url.startsWith("mongodb"))
      uri=db_url;
    return mongoose.connect(db_url, { useNewUrlParser: true})
    .then(db => { 
     isConnected = db.connections[0].readyState;
    })
    .catch(err => console.log("Error al conectar: "+err));

   
  }
    