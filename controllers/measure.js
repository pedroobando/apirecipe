'use strict';

const models = require('../models');

function faker(req, res, next) {
	const faker = require('faker');

	faker.locate = "es"
  // console.log();
  var total = req.params.recordTotal==null?20:req.params.recordTotal;
  var messageShow = `${total} measure generate`;
  var listObjects = [];
  for (var i = 0; i < total; i++) {
     listObjects.push({
     	name: faker.commerce.productMaterial(),
     	active: faker.random.boolean()
     })
  }
  return models.measure.bulkCreate(listObjects)
    .then(function(task) {
      return {data: messageShow, message: 'Indique el numero de registros con :/measure/faker/200'}
  }).catch((err)=> {
      return _errorObject(err, 'faker')
  });
}

function getOne(req, res, next) {
  return _getOne(req.params.measureId);
}

function getAll(req, res, next) {
  let order = req.query.order==null?'NotOrder':req.query.order.toUpperCase()
  let offset = 0
  return models.measure.findAndCountAll()
    .then((dataAll) => {
      let limit = req.query.limit ==null?10:parseInt(req.query.limit)
      let page = req.query.page==null?1:parseInt(req.query.page)
      let pages = Math.ceil(dataAll.count / limit);
      offset = limit * (page - 1);
      if (order == 'DESC' || order == 'ASC') {
        return models.measure.findAll({
          attributes: ['id', 'name', 'active'],
          limit: limit,
          offset: offset,
          order: [['name', order]]
        }).then((objectAll) => {
          return _clearObjectAll(objectAll)
        })
      } else {
        return models.measure.findAll({
          attributes: ['id', 'name', 'active'],
          limit: limit,
          offset: offset
        }).then((objectAll) => {
          return _clearObjectAll(objectAll)
        })
      }
    }).catch((err) =>{
      console.log(err);
      return _errorObject(err, 'getAll')
    }); 
}

function _getOne(Id) {
  if (Id==null) { return {data: null} }
  return models.measure.findById(Id).then((theObject) => {
    if (theObject) {
      return {data: _clearObject(theObject)}
    } else {
      return {data: null}
    }
  }).catch((err) => {
    return _errorObject(err, '_getOnes')
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

module.exports = { 
  faker,
  getOne,
  getAll
}