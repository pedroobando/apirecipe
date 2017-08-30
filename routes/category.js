'use strict';
var express = require('express');
var api = express.Router();
var categoryCtrl = require('../controllers/category');

/* GET home page. */

api.route('/faker')
	.get((req, res, next) => {
		categoryCtrl.fakerCategory(req, res).then((retvalor) => {
			res.status(200).json(retvalor)
		})
	})

api.route('/faker/:recordTotal')
	.get((req, res, next) => {
		categoryCtrl.fakerCategory(req, res).then((retvalor) => {
			res.status(200).json(retvalor)
		})
	})

api.route('active/:categoryId')
	.patch((req, res, next) => {
		categoryCtrl.active(req, res).then((retvalor) => {
			res.status(200).json(retvalor)
		})
	})

api.route('/:categoryId')
	// .get(categoryCtrl.getCategory)
	.get((req, res, next) => {
			categoryCtrl.getCategory(req, res).then((retvalor) => {
				if (retvalor.category!=null) {
					res.status(200).json(retvalor);
				} else {
					res.status(404).json({category:'Not Found'})
				}
			}).catch((err)=> {
				console.log(err);
			})
	})
	.put((req, res, next) => {
			categoryCtrl.updateCategory(req, res).then((retvalor) => {
				// console.log(retvalor);
				if (retvalor!=null) {
					res.status(200).json(retvalor);
				} else {
					res.status(500).json(retvalor);
				}
			})
	})
	.delete((req, res, next) => {
		categoryCtrl.deleteCategory(req, res).then((retvalor) => {
			if (retvalor!=null) {
				res.status(200).json(retvalor)
			} else {
				res.status(500).json(retvalor)
			}
		})
	})
	// .delete(categoryCtrl.deleteCategory)

api.route('/')
	.get((req, res, next) => {
		categoryCtrl.getCategories(req, res).then((retvalor)=>{
			res.status(200).json(retvalor);
		}).catch((err) => {
			// console.log(err);
			res.status(500).json(retvalor);
		})
	})
	.post((req, res, next) => {
			categoryCtrl.saveCategory(req, res).then((retvalor) => {
				res.status(200).json(retvalor);
		}).catch((err) => {
			res.status(500).json(retvalor);
		})
	})

module.exports = api;
