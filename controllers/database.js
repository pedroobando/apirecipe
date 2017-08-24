'use strict';

const models = require('../models');

function createDb(req, res, next) {
  return models.sequelize.sync({force:true})
  	.then(()=>{
  		res.status(200).send({message: 'La base de datos fue creada..'})
  	})
  	.catch(err => {
  		res.status(500).send({message: `Imposible conectar a la base de datos: [${err}]`});	
  	})
}

function conectDb(req, res) {
	return models.sequelize
	  .authenticate()
	  .then(() => {
	  	res.status(200).send({message:'La coneccion a la base de datos ha sido la correcta...'});
	  })
	  .catch(err => {
	  	res.status(500).send({message:`Imposible conectar a la base de datos: [${err}]`});
		});
}

module.exports = { createDb, conectDb }