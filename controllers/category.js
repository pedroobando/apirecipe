'use strict'

const models = require('../models');


function faker(req, res, next) {
  const faker = require('faker');

  // faker.locate = "es"
  // console.log();
  var total = req.params.recordTotal==null?20:req.params.recordTotal;
  var messageShow = `${total} category generate`;
  var _categoryLine, _categoryName
  var listObjects = [];
  // var a = 'a'
  for (var i = 0; i < total; i++) {
    listObjects.push({name:faker.commerce.productMaterial(), active:faker.random.boolean()});
  }
  return models.category.bulkCreate(listObjects)
    .then(function(task) {
      return _returnJson(200, messageShow, _clearObjectAll(task))
  }).catch((err)=> {
      // return _errorObject(err, 'faker')
      return _returnJson(500, 'Error On Server faker - Category', err)
  });
}

function getOne(req, res, next) {
  return _getOne(req.params.categoryId);
}

function getAll(req, res, next) {
  let order = req.query.order==null?'NotOrder':req.query.order.toUpperCase()
  let offset = 0
  return models.category.findAndCountAll()
    .then((dataAll) => {
      let limit = req.query.limit ==null?10:parseInt(req.query.limit)
      let page = req.query.page==null?1:parseInt(req.query.page)
      let pages = Math.ceil(dataAll.count / limit);
      offset = limit * (page - 1);
      if (order == 'DESC' || order == 'ASC') {
        return models.category.findAll({
          attributes: ['id', 'name', 'active'],
          limit: limit,
          offset: offset,
          order: [['name', order]]
        }).then((objectAll) => {
          return _returnJson(200,`Pagina ${page} de ${pages}`,_clearObjectAll(objectAll))
        })
      } else {
        return models.category.findAll({
          attributes: ['id', 'name', 'active'],
          limit: limit,
          offset: offset
        }).then((objectAll) => {
          return _returnJson(200,`Pagina ${page} de ${pages}`,_clearObjectAll(objectAll))
        })
      }
    }).catch((err) =>{
      // console.log(err[0]);
      // return _errorObject(err, 'getAll')
      return _returnJson(500, 'Error On Server getAll - Category', err)
    });
}

function save(req, res) {
	return models.category.create({
    name: req.body.name,
    active: req.body.active
  }).then(function(theObject) {
    return _returnJson(200,`Category name ${theObject.name}`, _clearObject(theObject))
    // return {data: _clearCategory(theObject), messageShow: `Categoria ${theObject.name} creada`}
    // {data: messageShow, message: 'Indique el numero de registros con :/category/faker/200'}
  }).catch((err) => {
    //return _errorCategory(err, 'saveCategory')
    return _returnJson(500, 'Error On Server save - Category', err)
  });
}

function active(req, res, next) {
  var IdCat = req.params.categoryId;
  return models.category.update({
    active: req.body.active
  }, {
    where: {
      id: IdCat
    }
  }).then((affectedRows)=>{
    return _getOne(IdCat)
  }).catch((err)=>{
    // return _errorCategory(err, 'active')
    return _returnJson(500, 'Error On Server active - Category', err)
  })
}


function update(req, res, next) {
  var IdCat = req.params.categoryId;
  return models.category.update({
    name: req.body.name,
    active: req.body.active
  }, {
    where: {
      id: IdCat
    }
  }).then((affectedRows)=>{
    return _getOne(IdCat)
  }).catch((err)=>{
    return _returnJson(500, 'Error On Server update - Category', err)
  })
}

function remove(req, res) {
  var the_Id = req.params.categoryId;
  return models.category.destroy({
    where: {
      id: the_Id
    }
  }).then((affectedRows)=>{
  	if (affectedRows>=1) {
      return _returnJson(200,`Category DELETE ID:${the_Id}`, null)
      // return {category: {message: 'Ok', rows: affectedRows}}
  	} else {
      return _returnJson(404,`Category NOT FOUND ID:${the_Id}`, null)
      // return {category: {message: 'Not found', rows: affectedRows}}
  	}
  }).catch((err)=>{
    // return _errorCategory(err, 'deleteCategory')
    return _returnJson(500, 'Error On Server remove - Category', err)
  })
}


function _getOne(Id) {
  if (Id==null) { 
    return _returnJson(404, 'NOT FOUND - Category', _clearObject({id:0,name:'',active:false}))
  }
  return models.category.findById(Id).then((theObject) => {
    if (theObject) {
      return _returnJson(200,`Category name ${theObject.name}`, _clearObject(theObject))
    } else {
      return _returnJson(404, 'NOT FOUND - Category', _clearObject({id:0,name:'',active:false}))
    }
  }).catch((err) => {
    // return _errorObject(err, '_getOnes')
    //console.log(err);
    return _returnJson(500, 'Error On Server getOne - Category', err)
  });
}

function _errorObject(err, onfunction) {
  return {data: {
    error: `Error ${onfunction} data: [${err}]`,
    err: err
  } }
}

function _clearObjectAll(_objectAll) {
  var objectAll = []
  _objectAll.forEach((tObject) => {
    objectAll.push(_clearObject(tObject))
  })
  return objectAll
}

function _clearObject(_object) {
  return {id: _object.id, name: _object.name, active: _object.active}
}

function _returnJson(_statusCode, _message, _data) {
  return { statusCode:_statusCode, message:_message, data:_data }
}

module.exports = {
	getOne,
	getAll,
	save,
	update,
	remove,
	faker,
  active
}
