'use strict'


var express = require('express')
var api = express.Router()
var categoryCtrl = require('../controllers/category')
const viewRoute = 'category/'

/* GET home page. */

api.route('/faker').get((req, res, next) => {
	let total = req.params.recordTotal==null?20:req.params.recordTotal;
	categoryCtrl.faker(total).then((retvalor) => {
		res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
	})
})

api.route('/faker/:recordTotal').get((req, res, next) => {
	let total = req.params.recordTotal==null?20:req.params.recordTotal;
	categoryCtrl.faker(total).then((retvalor) => {
		res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
			// res.status(200).json(retvalor)
	})
})

api.route('/:categoryId/active')
	.patch((req, res, next) => {
		categoryCtrl.active(req, res).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch(err => {
			console.log(err)
		})
	})

api.route('/:categoryId')
	// .get(categoryCtrl.getCategory)
	.get((req, res, next) => {
			categoryCtrl.getOne(req, res).then((retvalor) => {
				// console.log(retvalor.data);
				res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
			}).catch((err) => {
				console.log(err)
			})
	})

	.delete((req, res, next) => {
		categoryCtrl.remove(req, res).then((retvalor) => {
			if (retvalor != null) {
				res.status(200).json(retvalor)
			} else {
				res.status(500).json(retvalor)
			}
		})
	})
	// .delete(categoryCtrl.deleteCategory)

	// router.get('/', (req, res, next) => {
	// 	res.render('index', { title: 'Express' })
	// })

api.route('/')
	.get((req, res, next) => {
		categoryCtrl.getAll(req, res).then((retvalor) => {
			if (retvalor.statusCode==200) {
				res.render(viewRoute+'index',{title: 'Categorias', data: retvalor.data.collect, paginate:retvalor.data.paginate})
			} else {
				res.render(viewRoute+'index',{title: 'Error', data: retvalor.data.collect, paginate:retvalor.data.paginate})
			}
		}).catch((err) => {
				res.status(400).json(retvalor)
		})
	})
	.post((req, res, next) => {
			categoryCtrl.save(req, res).then((retvalor) => {
				// console.log(retvalor.statusCode);
				if (retvalor.statusCode==201) {
					res.redirect('/category?order=asc')
				}
				// res.status(200).json(retvalor)
		}).catch((err) => {
			res.status(400).json(retvalor)
		})
	})

api.route('/edit')
	.post((req, res, next) => {
		// console.log(req.body.id);
		categoryCtrl.update(req, res).then((retvalor) => {
			if (retvalor.statusCode==200) {
				res.redirect('/category?order=asc')
			}
			// console.log(retvalor);
			// if (retvalor != null) {
			// 	res.status(200).json(retvalor);
			// } else {
			// 	res.status(500).json(retvalor);
			// }
		})
	})

module.exports = api
