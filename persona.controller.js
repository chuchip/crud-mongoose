'use strict';

const connectDB = require('./database');
const Person = require('./models/Person');
const PATH="/persona"

async function  addPersona(req, res)
{    
    const cuerpo = req.body;
    console.log("Cuerpo: "+JSON.stringify(cuerpo));
    logger.debug("En addPersona: ");
    try {

      const person= await Person.create(cuerpo)
      res.status(201).send(person);
    } catch (ex)
    {
      res.status(501).send("Error at addPersona: "+ex.message);
    }

/*    
// This is the same than above using promises.
    const ct = connectToDatabase().then( () =>{
      try {
        const person= Person.create(cuerpo).then( (p)=>   res.status(201).send(p))
      } catch (ex)
      {
        res.status(501).send("Error at addPersona: "+ex.message);
      }
    })*/
}

async function getPersonaById(req,res)
{  
  logger.debug("En getPersonaById");

  try {  
    const person = await Person.findById(req.params.id);  
    if (person)  
      res.status(200).send(person);
    else
      res.status(404).send("Not found person with id: "+req.params.id);
  } catch (ex)
  {
    res.status(501).send("Error at getPersonaById: "+ex.message);
  }
}

/*
* Update Persona 
* Modifica una persona buscado por parametro id
* En el body se pondran los campos a modificar.
* Ejemplo: PUT  localhost:3000/persona/611a7c26be8e095b49aaf46f
*/
async function updatePersona(req,res)
{  
  logger.debug("En updatePersona");
  try {
    const condiciones={ _id:req.params.id}
    const newRegistry= req.body 
    const result = await Person.findByIdAndUpdate(req.params.id,newRegistry);  
    if (result)  
    {
        const devolver= { _id: req.params.id }; 
        devolver.updated=req.body;      
        res.status(200).send(result);
    }
    else
        res.status(404).send("Not found id: "+req.params.id);
  } catch (ex)
  {
    res.status(501).send("Error at updatePersona: "+ex.message);
  }
}
/*
* Borrar una persona por el ID mandado
*/
async function deletePersona(req,res)
{  
  logger.debug("En deletePersona");
  try {       
    const result = await Person.deleteOne({"_id": req.params.id});  
    if (result.deletedCount==1)  
      res.status(200).send(`Delete registry with ID: ${req.params.id}`);
    else
      res.status(404).send("Not found id: "+req.params.id);
  } catch (ex)
  {
    res.status(501).send("Error at deletePersona: "+ex.message);
  }
}
/*
* GetPersona.
* En el body se pueden poner los filtros de busqueda.
*/
async function  getPersona(req, res)
{
  try
  {
    let condiciones=req.body;
   
    logger.debug("En getPersona: ");
    const cursorPersonas=await Person.find(condiciones);        
    res.status(200).send(cursorPersonas);
  } catch (ex)
  {
    res.status(501).send("Error at getPersona: "+ex.message);
  }
}
exports.addControllers= (app) =>
{
  connectDB().then(() =>
  {
    app.route(PATH).post(addPersona);
    app.get(PATH,getPersona);
    app.get(`${PATH}/:id`, getPersonaById)
    app.put(`${PATH}/:id`, updatePersona)
    app.delete(`${PATH}/:id`, deletePersona)
  })
}