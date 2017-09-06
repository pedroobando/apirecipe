'use strict';

const models = require('../models');
const categoryCtrl = require('../controllers/category');
const measureCtrl = require('../controllers/measure');
const ingredientCtrl = require('../controllers/ingredient');
const recipeCtrl = require('../controllers/recipe');
const recipeCatCtrl = require('../controllers/recipeCategory');
const recipeIngCtrl = require('../controllers/recipeIngredient');


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

function createDemo(_recordTotal) {
		var rowcreated = []
		let seed = ()=> {
			return models.sequelize.sync({force:true}).then(() => {
				return Promise.all([
					// req.params.recordTotal = 110
					categoryCtrl.faker(_recordTotal).then(retvalor => {
					 	// rowcreated.category = retvalor.data
					 	return retvalor.data
					}),
					// req.params.recordTotal = 50
					measureCtrl.faker(_recordTotal).then((retvalor) => {
						return retvalor.data
					}),
					// req.params.recordTotal=100
					ingredientCtrl.faker(_recordTotal).then((retvalor) => {
						return retvalor.data
					}),
					// req.params.recordTotal=50
					recipeCtrl.faker(_recordTotal).then((retvalor) => {
						return retvalor.data
					}),
					recipeCatCtrl.faker(_recordTotal).then((retvalor) => {
						return retvalor.data
					}),
					recipeIngCtrl.faker(_recordTotal).then(retvalor => {
						return retvalor.data
					})
				]).then( result => {
					rowcreated.push(result[0])
					rowcreated.push(result[1])
					rowcreated.push(result[2])
					rowcreated.push(result[3])
					rowcreated.push(result[4])
					rowcreated.push(result[5])
					console.log('Agregadas todos los datos');
				})
			})
		}

		return seed().then(() => {
			return _returnJson(200, `Los datos fueron creados:`,rowcreated)
		}).catch( err => {
			console.log(err);
			return _returnJson(500, 'Error On Server createDemo - database controllers', err)
		})

}

function _returnJson(_statusCode, _message, _data) {
  return { 
    statusCode:_statusCode, message:_message, data:_data 
  }
}

module.exports = { 
	createDb,
	conectDb,
	createDemo
}