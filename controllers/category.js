'use strict'

const models = require('../models');

function getCategory(req, res, next) {
  return _getCategory(req.params.categoryId);
}

function getCategories(req, res, next) {
  var theOrden = req.query.order==null?'NotOrder':req.query.order.toUpperCase()
  var _activeOnly = req.query.active
  if (theOrden == 'DESC' || theOrden == 'ASC') {
    return models.category.findAll({ order: [ ['name', theOrden]] }).then(categoriesAll => {
      return _clearCategories(categoriesAll)
    })
  } else {
    return models.category.findAll().then(categoriesAll => {
      return _clearCategories(categoriesAll)
    })
  }
}

function saveCategory(req, res) {
	return models.category.create({
    name: req.body.name,
    active: req.body.active
  }).then(function(theObject) {
    return {category: _clearCategory(theObject)}
  }).catch((err) => {
    return _errorCategory(err, 'saveCategory')
  });
}

function fakerCategory(req, res, next) {
	const faker = require('faker');

	faker.locate = "es"
  // console.log();
  var total = req.params.recordTotal==null?20:req.params.recordTotal;
  var messageShow = `${total} category generate`;
  var _categoryLine, _categoryName
  var listaCategories = [];
  for (var i = 0; i < total; i++) {
    _categoryName = faker.commerce.product();
     _categoryLine = {name:_categoryName, active:false};
     listaCategories.push(_categoryLine);
  }
  return models.category.bulkCreate(listaCategories)
    .then(function(task) {
      return {category: messageShow, message: 'Indique el numero de registros con :/category/faker/200'}
    	// res.status(200).send({message: messageShow})
  }).catch((err)=> {
      return {category: {error: `Error creando una category: [${err}]`} }
  		// res.status(500).send(err);
  });
}

function updateCategory(req, res, next) {
  var IdCat = req.params.categoryId;
  return models.category.update({
    name: req.body.name,
    active: req.body.active
  }, {
    where: {
      id: IdCat
    }
  }).then((affectedRows)=>{
    return _getCategory(IdCat)
  }).catch((err)=>{
    return _errorCategory(err, 'updateCategory')
  })
}

function deleteCategory(req, res) {
  var the_Id = req.params.categoryId;
  return models.category.destroy({
    where: {
      id: the_Id
    }
  }).then((affectedRows)=>{
  	if (affectedRows>=1) {
      return {category: {message: 'Ok', rows: affectedRows}}
  	} else {
      return {category: {message: 'Not found', rows: affectedRows}}
  	}
  }).catch((err)=>{
    return _errorCategory(err, 'deleteCategory')
  })
}


function _getCategory(Id) {
  if (Id==null) { return {category: null} }
  return models.category.findById(Id).then((theObject) => {
    if (theObject) {
      return {category: _clearCategory(theObject)}
    } else {
      return {category: null}
    }
  }).catch((err) => {
    return _errorCategory(err, '_getCategories')
  });
}

function _errorCategory(err, onfunction) {
  return {category: {
    error: `Error ${onfunction} category: [${err}]`,
    err: err
  } }
}

function _clearCategories(_categoriesAll) {
  var categoriesAll = []
  _categoriesAll.forEach((category) => {
    categoriesAll.push(_clearCategory(category))
  })
  return categoriesAll
}

function _clearCategory(_category) {
  return {id: _category.id, name: _category.name, active: _category.active}
}

module.exports = {
	getCategory,
	getCategories,
	saveCategory,
	updateCategory,
	deleteCategory,
	fakerCategory
}
