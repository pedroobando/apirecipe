'use strict'

var express = require('express')
var api = express.Router()
var measureCtrl = require('../controllers/measure')


api.route('/faker')
	.get((req, res, next) => {
		measureCtrl.faker(req, res).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		})
	})

api.route('/faker/:recordTotal')
	.get((req, res, next) => {
		measureCtrl.faker(req, res).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
			// res.status(200).json(retvalor)
		})
	})

api.route('/:measureId/active')
	.patch((req, res, next) => {
		measureCtrl.active(req, res).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch(err=>{
			console.log(err);
		})
	})

api.route('/:measureId')
	// .get(measureCtrl.getCategory)
	.get((req, res, next) => {
			measureCtrl.getOne(req, res).then((retvalor) => {
				// console.log(retvalor.data);
				res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
			}).catch((err)=> {
				console.log(err);
			})
	})
	.put((req, res, next) => {
			measureCtrl.update(req, res).then((retvalor) => {
				// console.log(retvalor);
				if (retvalor!=null) {
					res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
				} else {
					res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
				}
			})
	})
	.delete((req, res, next) => {
		measureCtrl.remove(req, res).then((retvalor) => {
			if (retvalor!=null) {
				res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
			} else {
				res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
			}
		})
	})

api.route('/')
	.get((req, res, next) => {
		measureCtrl.getAll(req, res).then((retvalor)=>{
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch((err) => {
			// console.log(err);
			res.status(400).json(retvalor);
		})
	})
	.post((req, res, next) => {
			measureCtrl.save(req, res).then((retvalor) => {
				res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch((err) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		})
	})

module.exports = api;
