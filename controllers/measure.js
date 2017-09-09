'use strict'

const models = require('../models')
const configLocal = require('../config')

function faker(_recordTotal) {
  const faker = require('faker');
  // var total = req.params.recordTotal==null?20:req.params.recordTotal;
  var messageShow = `${_recordTotal} Measure generate`
  var listObjects = [];
  for (var i = 0; i < _recordTotal; i++) {
     listObjects.push({
      name: faker.commerce.productMaterial(),
      active: faker.random.boolean()
     })
  }
  return models.measure.bulkCreate(listObjects)
    .then(function(task) {
      return _returnJson(201, messageShow, _clearObjectAll(task))
  }).catch((err)=> {
      return _returnJson(500, 'Error On Server faker - Measure', err)
  });
}

function getOne(req, res, next) {
  return _getOne(req.params.measureId, 'getOne');
}

function getAll(req, res, next) {
  let order = req.query.order==null?'NotOrder':req.query.order.toUpperCase()
  let offset = 0
  return models.measure.findAndCountAll()
    .then((dataAll) => {
			let limit = req.query.limit ==null?configLocal.PAGESIZE:parseInt(req.query.limit)
      let page = req.query.page==null?1:parseInt(req.query.page)
      let pages = Math.ceil(dataAll.count / limit);
      offset = limit * (page - 1);
      if (order == 'DESC' || order == 'ASC') {
        return models.measure.findAll({
          // include: [ 'ingredient' ],
          attributes: ['id', 'name', 'active'],
          limit: limit,
          offset: offset,
          order: [['name', order]]
        }).then((objectAll) => {
           return _returnJson(200,`Pagina ${page} de ${pages}`,_clearObjectAll(objectAll))
        })
      } else {
        return models.measure.findAll({
          attributes: ['id', 'name', 'active'],
          // include: [ 'ingredient' ],
          limit: limit,
          offset: offset
        }).then((objectAll) => {
          return _returnJson(200,`Pagina ${page} de ${pages}`,_clearObjectAll(objectAll))
        })
      }
    }).catch((err) =>{
      return _returnJson(500, 'Error On Server getAll - measure', err)
    });
}

function save(req, res) {
  return models.measure.create({
    name: req.body.name,
    active: req.body.active
  }).then(function(theObject) {
    return _returnJson(201,`Measure name ${theObject.name}`, _clearObject(theObject))
  }).catch((err) => {
    console.log(err);
    return _returnJson(500, 'Error On Server save - Measure', err)
  });
}

function active(req, res, next) {
  let IdCat = req.params.measureId;
  return models.measure.findById(IdCat).then((theObject) => {
    return models.measure.update({
      active: !theObject.active
    }, {
      where: {
        id: IdCat
      }
    }).then((affectedRows)=>{
      return _getOne(IdCat)
    }).catch((err)=>{
      return _returnJson(500, 'Error On Server active - Measure', err)
    })
  })
}

function update(req, res, next) {
  var IdCat = req.params.measureId;
  return models.measure.update({
    name: req.body.name,
    active: req.body.active
  }, {
    where: {
      id: IdCat
    }
  }).then((affectedRows)=>{
    return _getOne(IdCat)
  }).catch((err)=>{
    return _returnJson(500, 'Error On Server update - measure', err)
  })
}

function remove(req, res) {
  var the_Id = req.params.measureId;
  return models.measure.destroy({
    where: {
      id: the_Id
    }
  }).then((affectedRows)=>{
    if (affectedRows>=1) {
      return _returnJson(202,`Measure DELETE ID:${the_Id}`, null)
    } else {
      return _returnJson(404,`Measure NOT FOUND ID:${the_Id}`, null)
    }
  }).catch((err)=>{
    return _returnJson(500, 'Error On Server remove - measure', err)
  })
}


function _getOne(Id, onfunction) {
  onfunction = onfunction==null?'-':onfunction
  if (Id==null) {
    return _returnJson(400, 'Bad Request - Measure', _clearObject({id:0,name:'',active:false}))
  }
  return models.measure.findById(Id).then((theObject) => {
  // return models.measure.findOne({
  //   where: {id: Id}, include: [ 'ingredient' ]}).then((theObject) => {
      if (theObject) {
        return _returnJson(200,`Measure name ${theObject.name}`, _clearObject(theObject))
      } else {
        return _returnJson(404, 'NOT FOUND - Measure', _clearObject({id:0,name:'',active:false}))
      }
  }).catch((err) => {
    return _returnJson(500, `Error On Server _getOne -${onfunction} - measure`, err)
  });
}

function _clearObjectAll(_objectAll) {
  var objectAll = []
  _objectAll.forEach((tObject) => {
    objectAll.push(_clearObject(tObject))
  })
  return objectAll
}

function _clearObject(_object) {
  return {
    id: _object.id, name: _object.name, active: _object.active
    // id: _object.id, name: _object.name, active: _object.active, ingredients: _object.ingredient
  }
}

function _errorObject(_err, onfunction) {
  return {
    message: `Error On Server ${onfunction} - measure`,
    data: _err
  }
}

function _returnJson(_statusCode, _message, _data) {
  return {
    statusCode:_statusCode, message:_message, data:_data
  }
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
