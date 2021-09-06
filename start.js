'use strict';
// Inicializa Express
const express = require('express')
const cors = require("cors");
require('dotenv').config({ path: './db.env' });
const app = express();
const port = process.env['PORT'] || 3000

app.use(express.json()) // for parsing application/json




const logger = require('./logger').logger

logger.info("Comienza la aplicacion")
const db = require('./database').db;


const personaController = require('./persona.controller')
personaController.addControllers(app);

var corsOptions = {
    origin: "http://localhost:4200"
  };
  
app.use(cors(corsOptions));
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

