'use strict'

const models = require('../models')
const randomInt = require('random-int')

function faker(_recordTotal) {
  const faker = require('faker')
  // var total = req.params.recordTotal==null?20:req.params.recordTotal
  var messageShow = `${_recordTotal} Recipe generate`
  var listObjects = []
  for (var i = 0; i < _recordTotal; i++) {
     listObjects.push({
      name: faker.commerce.productName(),
      difficulty: randomInt(1, 5),
      portion: randomInt(3, 10),
      preparation: faker.lorem.paragraph(),
      active: faker.random.boolean()
     })
  }
  
  return models.recipe.bulkCreate(listObjects)
    .then(function(task) {
      return _returnJson(201, messageShow, _clearObjectAll(task, true))
  }).catch((err)=> {
      return _returnJson(500, 'Error On Server faker - Recipe', err)
  })
}

function getOne(req, res, next) {
  return _getOne(req.params.keyId, 'getOne')
}

function getAll(req, res, next) {
  let order = req.query.order==null?'NotOrder':req.query.order.toUpperCase()
  let offset = 0
  return models.recipe.findAndCountAll()
    .then((dataAll) => {
      let limit = req.query.limit ==null?10:parseInt(req.query.limit)
      let page = req.query.page==null?1:parseInt(req.query.page)
      let pages = Math.ceil(dataAll.count / limit)
      offset = limit * (page - 1)
      if (order == 'DESC' || order == 'ASC') {
        return models.recipe.findAll({
          attributes: ['id', 'name', 'difficulty', 'portion', 'preparation','active'],
          limit: limit,
          offset: offset,
          order: [['name', order]],
          include: [ 'categories' ]
        }).then((objectAll) => {
           return _returnJson(200,`Pagina ${page} de ${pages}`,_clearObjectAll(objectAll,false))
        })
      } else {
        return models.recipe.findAll({
          attributes: ['id', 'name', 'difficulty', 'portion', 'preparation','active'],
          limit: limit,
          offset: offset,
          include: [ 'categories' ]
        }).then((objectAll) => {
          return _returnJson(200,`Pagina ${page} de ${pages}`,_clearObjectAll(objectAll, false))
        })
      }
    }).catch((err) =>{
      return _returnJson(500, 'Error On Server getAll - Recipe', err)
    }) 
}

function save(req, res) {
  return models.recipe.create({
    name: req.body.name,
    difficulty: req.body.difficulty,
    portion: req.body.portion,
    preparation: req.body.preparation,
    active: req.body.active,
    // measureId: req.body.measureId
  }).then(function(theObject) {
    return _returnJson(201,`Recipe name ${theObject.name}`, _clearObject(theObject))
  }).catch((err) => {
    console.log(err)
    return _returnJson(500, 'Error On Server save - Recipe', err)
  })
}

function active(req, res, next) {
  let IdCat = req.params.keyId
  return models.recipe.findById(IdCat).then((theObject) => {
    return models.recipe.update({
      active: !theObject.active
    }, {
      where: {
        id: IdCat
      }
    }).then((affectedRows)=>{
      return _getOne(IdCat)
    }).catch((err)=>{
      return _returnJson(500, 'Error On Server active - Recipe', err)
    })
  })
}

function update(req, res, next) {
  var IdCat = req.params.keyId
  return models.recipe.update({
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    active: req.body.active,
    measureId: req.body.measureId
  }, {
    where: {
      id: IdCat
    }
  }).then((affectedRows)=>{
    return _getOne(IdCat)
  }).catch((err)=>{
    return _returnJson(500, 'Error On Server update - Recipe', err)
  })
}

function remove(req, res) {
  var the_Id = req.params.keyId
  return models.recipe.destroy({
    where: {
      id: the_Id
    }
  }).then((affectedRows)=>{
    if (affectedRows>=1) {
      return _returnJson(202,`Recipe DELETE ID:${the_Id}`, null)
    } else {
      return _returnJson(404,`Recipe NOT FOUND ID:${the_Id}`, null)
    }
  }).catch((err)=>{
    console.log(err)
    return _returnJson(500, 'Error On Server remove - Recipe', err)
  })
}

function _getOne(Id, onfunction) {
  onfunction = onfunction==null?'-':onfunction
  if (Id==null) { 
    return _returnJson(400, 'Bad Request - Recipe', _clearObject({id:0,name:'',active:false}))
  }
  // return models.recipe.findById(Id).then((theObject) => {
  return models.recipe.findOne({
    where: {id: Id},
    include: [ 
      'ingredients','categories'
      ] }).then((theObject) => {
      if (theObject!=null) {
        return _returnJson(200,`Recipe name ${theObject.name}`, _clearObject(theObject))
      } else {
        return _returnJson(404, 'NOT FOUND - Recipe', {id:0, name:'', active: false, price:0, quantity:0, measureId:0, measure: {id:0, name:'', active:false}})
      }
  }).catch((err) => {
    console.log(err)
    return _returnJson(500, `Error On Server _getOne -${onfunction} - Recipe`, err)
  })
}

function _clearObjectAll(_objectAll) {
  var objectAll = []
  _objectAll.forEach((tObject) => {
    objectAll.push(_clearObject(tObject))
  })
  return objectAll
}

function _clearObject(_object, _categories) {
  var categoryAll = []
  return {
    id: _object.id, name: _object.name, difficulty: _object.difficulty, portion:_object.portion, preparation: _object.preparation, active: _object.active,
    categories: _object.categories, ingredients: _object.ingredients
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
