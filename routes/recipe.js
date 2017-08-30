'use strict';
var express = require('express');
var api = express.Router();
var recipeCtrl = require('../controllers/recipe');

api.route('/faker')
	.get((req, res, next) => {
		recipeCtrl.faker(req, res).then((retvalor) => {
			res.status(200).json(retvalor)
		})
	})

api.route('/faker/:recordTotal')
	.get((req, res, next) => {
		recipeCtrl.faker(req, res).then((retvalor) => {
			res.status(200).json(retvalor)
		})
	})

api.route('/:recipeId')
	// .get(recipeCtrl.getCategory)
	.get((req, res, next) => {
			recipeCtrl.getRecipe(req, res).then((retvalor) => {
				if (retvalor.recipe!=null) {
					res.status(200).json(retvalor);
				} else {
					res.status(404).json({recipe:'Not Found'})
				}
			}).catch((err)=> {
				console.log(err);
			})
	})
	.put((req, res, next) => {
			recipeCtrl.updateCategory(req, res).then((retvalor) => {
				// console.log(retvalor);
				if (retvalor!=null) {
					res.status(200).json(retvalor);
				} else {
					res.status(500).json(retvalor);
				}
			})
	})
	.delete((req, res, next) => {
		recipeCtrl.deleteCategory(req, res).then((retvalor) => {
			if (retvalor!=null) {
				res.status(200).json(retvalor)
			} else {
				res.status(500).json(retvalor)
			}
		})
	})
	// .delete(recipeCtrl.deleteCategory)

api.route('/')
	.get((req, res, next) => {
		recipeCtrl.getRecipes(req, res).then((retvalor)=>{
			res.status(200).json(retvalor);
		}).catch((err) => {
			// console.log(err);
			res.status(500).json(retvalor);
		})
	})
	.post((req, res, next) => {
			recipeCtrl.saveCategory(req, res).then((retvalor) => {
				res.status(200).json(retvalor);
		}).catch((err) => {
			res.status(500).json(retvalor);
		})
	})

module.exports = api;