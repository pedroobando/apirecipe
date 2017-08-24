'use strict';
var express = require('express');
var api = express.Router();
var measureCtrl = require('../controllers/measure');

api.route('/faker')
	.get((req, res, next) => {
		measureCtrl.faker(req, res).then((retvalor) => {
			res.status(200).json(retvalor)
		})
	})

api.route('/faker/:recordTotal')
	.get((req, res, next) => {
		measureCtrl.faker(req, res).then((retvalor) => {
			res.status(200).json(retvalor)
		})
	})

api.route('/:measureId')
	// .get(measureCtrl.getCategory)
	.get((req, res, next) => {
			measureCtrl.getOne(req, res).then((retvalor) => {
				if (retvalor.data!=null) {
					res.status(200).json(retvalor);
				} else {
					res.status(500).json({measure:'Not Found'})
				}
			}).catch((err)=> {
				console.log(err);
			})
	})
	.put((req, res, next) => {
			measureCtrl.updateCategory(req, res).then((retvalor) => {
				// console.log(retvalor);
				if (retvalor!=null) {
					res.status(200).json(retvalor);
				} else {
					res.status(500).json(retvalor);
				}
			})
	})
	.delete((req, res, next) => {
		measureCtrl.deleteCategory(req, res).then((retvalor) => {
			if (retvalor!=null) {
				res.status(200).json(retvalor)
			} else {
				res.status(500).json(retvalor)
			}
		})
	})

api.route('/')
	.get((req, res, next) => {
		measureCtrl.getAll(req, res).then((retvalor)=>{
			res.status(200).json(retvalor);
		}).catch((err) => {
			// console.log(err);
			res.status(500).json(retvalor);
		})
	})
	.post((req, res, next) => {
			measureCtrl.saveCategory(req, res).then((retvalor) => {
				res.status(200).json(retvalor);
		}).catch((err) => {
			res.status(500).json(retvalor);
		})
	})

module.exports = api;