'use strict'

var express = require('express')
var api = express.Router()
var recipeCtrl = require('../controllers/recipe')
var recipeCategoryCtrl = require('../controllers/recipeCategory')


api.route('/faker')
	.get((req, res, next) => {
		recipeCtrl.faker(req, res).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		})
	})

api.route('/faker/:recordTotal')
	.get((req, res, next) => {
		recipeCtrl.faker(req, res).then((retvalor) => {
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

api.route('/:keyId')
	.get((req, res, next) => {
		recipeCtrl.getOne(req, res).then((retvalor) => {
			// console.log(retvalor.data);
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

module.exports = api;
