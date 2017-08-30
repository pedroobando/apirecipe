'use strict';

var express = require('express');
var api = express.Router();
var categoryCtrl = require('../controllers/category');

/* GET home page. */

api.route('/faker')
	.get((req, res, next) => {
		categoryCtrl.faker(req, res).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		})
	})

api.route('/faker/:recordTotal')
	.get((req, res, next) => {
		categoryCtrl.faker(req, res).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
			// res.status(200).json(retvalor)
		})
	})

api.route('/:categoryId/active')
	.patch((req, res, next) => {
		categoryCtrl.active(req, res).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch(err=>{
			console.log(err);
		})
	})

api.route('/:categoryId')
	// .get(categoryCtrl.getCategory)
	.get((req, res, next) => {
			categoryCtrl.getOne(req, res).then((retvalor) => {
				// console.log(retvalor.data);
				res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
			}).catch((err)=> {
				console.log(err);
			})
	})
	.put((req, res, next) => {
			categoryCtrl.update(req, res).then((retvalor) => {
				// console.log(retvalor);
				if (retvalor!=null) {
					res.status(200).json(retvalor);
				} else {
					res.status(500).json(retvalor);
				}
			})
	})
	.delete((req, res, next) => {
		categoryCtrl.remove(req, res).then((retvalor) => {
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
		categoryCtrl.getAll(req, res).then((retvalor)=>{
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch((err) => {
			// console.log(err);
			res.status(400).json(retvalor);
		})
	})
	.post((req, res, next) => {
			categoryCtrl.save(req, res).then((retvalor) => {
				res.status(200).json(retvalor);
		}).catch((err) => {
			res.status(400).json(retvalor);
		})
	})

module.exports = api;
