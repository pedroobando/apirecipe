'use strict'

var express = require('express')
var router = express.Router()
var ctrlDatabase = require('../controllers/database')
var categoryCtrl = require('../controllers/category')
var measureCtrl = require('../controllers/measure')
var ingredientCtrl = require('../controllers/ingredient')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
})

router.get('/createdb', ctrlDatabase.createDb)

router.get('/conectdb', ctrlDatabase.conectDb)

router.route('/createdemo')
	.get((req, res, next) => {
		let rowcreated = []
		req.params.recordTotal=110
		categoryCtrl.faker(req, res).then((retvalor) => {
			rowcreated.category = retvalor.data
			// res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch(err => {
			console.log(err)
		})
		req.params.recordTotal=120
		measureCtrl.faker(req, res).then((retvalor) => {
			rowcreated.measure = retvalor.data
			// res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch(err => {
			console.log(err)
		})
		
		req.params.recordTotal=100
		ingredientCtrl.faker(req, res).then((retvalor) => {
			rowcreated.ingredient = retvalor.data
			// res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch(err => {
			console.log(err)
		})

		res.status(200).json({
			message: 'Fueron creados todos los datos',
			data_category: rowcreated.category,
			data_measure: rowcreated.measure,
			data_ingredient: rowcreated.ingredient
		})
	})

module.exports = router
