'use strict'

var express = require('express')
var api = express.Router()
var recipeCtrl = require('../controllers/recipe')
var recipeCategoryCtrl = require('../controllers/recipeCategory')
var recipeIngredientCtrl = require('../controllers/recipeIngredient')


api.route('/faker')
	.get((req, res, next) => {
		let total = req.params.recordTotal==null?20:req.params.recordTotal;
		recipeCtrl.faker(total).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		})
	})

api.route('/faker/:recordTotal')
	.get((req, res, next) => {
		let total = req.params.recordTotal==null?20:req.params.recordTotal;
		recipeCtrl.faker(total).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		})
	})

api.route('/:keyId/active')
	.patch((req, res, next) => {
		recipeCtrl.active(req, res).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch(err => {
			console.log(err)
		})
	})

api.route('/:keyId/show')
	.get((req, res, next) => {
		var idRecipe = req.params.keyId
		recipeCtrl.getOneId(idRecipe).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch((err)=> {
			console.log(err);
		})
	})

api.route('/:keyId')
	.get((req, res, next) => {
		recipeCtrl.getOne(req, res).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch((err)=> {
			console.log(err);
		})
	})
	.put((req, res, next) => {
		recipeCtrl.update(req, res).then((retvalor) => {
			if (retvalor!=null) {
				res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
			} else {
				res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
			}
		})
	})
	.delete((req, res, next) => {
		recipeCtrl.remove(req, res).then((retvalor) => {
			if (retvalor!=null) {
				res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
			} else {
				res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
			}
		})
	})


api.route('/')
	.get((req, res, next) => {
		recipeCtrl.getAll(req, res).then((retvalor)=>{
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch((err) => {
			res.status(400).json(retvalor);
		})
	})
	.post((req, res, next) => {
		recipeCtrl.save(req, res).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch((err) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		})
	})


api.route('/:keyId/category')
	.get((req, res, next) => {
		let keyId = req.params.keyId;
		recipeCategoryCtrl.getAllByRecipe(keyId).then((retvalor)=>{
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch((err) => {
			res.status(400).json(retvalor);
		})
	})

api.route('/:keyId/category/:categoryId')
	.get((req, res, next) => {
		let keyId = req.params.keyId
		let categoryId = req.params.categoryId
		recipeCategoryCtrl.getOneByRecipe(keyId, categoryId).then((retvalor)=>{
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch((err) => {
			res.status(400).json(retvalor);
		})
	})
	.post((req, res, next) => {
		let keyId = req.params.keyId
		let categoryId = req.params.categoryId
		recipeCategoryCtrl.save(keyId, categoryId).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch((err) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		})
	})
	.delete((req, res, next) => {
		let keyId = req.params.keyId
		let categoryId = req.params.categoryId
		recipeCategoryCtrl.remove(keyId, categoryId).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch((err) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		})
	})

api.route('/:keyId/ingredient')
	.get((req, res, next) => {
		let keyId = req.params.keyId;
		recipeIngredientCtrl.getAllByRecipe(keyId).then((retvalor)=>{
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch((err) => {
			res.status(400).json(retvalor);
		})
	})

api.route('/:keyId/ingredient/:ingredientId')
	.get((req, res, next) => {
		let keyId = req.params.keyId
		let ingredientId = req.params.ingredientId
		recipeIngredientCtrl.getOneByRecipe(keyId, ingredientId).then((retvalor)=>{
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch((err) => {
			res.status(400).json(retvalor);
		})
	})
	.post((req, res, next) => {
		let keyId = req.params.keyId
		let ingredientId = req.params.ingredientId
		let quantity = req.body.quantity!=null?req.body.quantity:0
		let measureId = req.body.measureId!=null?req.body.measureId:0
		recipeIngredientCtrl.save(keyId, ingredientId, measureId, quantity).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch((err) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		})
	})
	.delete((req, res, next) => {
		let keyId = req.params.keyId
		let ingredientId = req.params.ingredientId
		recipeIngredientCtrl.remove(keyId, ingredientId).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch((err) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		})
	})


module.exports = api;
