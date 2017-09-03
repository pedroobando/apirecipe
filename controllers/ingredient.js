'use strict'

const models = require('../models');
const randomize = require('randomatic');
const randomInt = require('random-int');

function faker(req, res, next) {
	const faker = require('faker');
  var total = req.params.recordTotal==null?20:req.params.recordTotal;
  var messageShow = `${total} Ingredient generate`;
  var listObjects = [];
  var _vrandom = 0
  for (var i = 0; i < total; i++) {
    _vrandom = randomInt(1, 50)
    listObjects.push({
     	name: faker.commerce.productName(),
      quantity: randomize('0', 3),
      price: faker.commerce.price(),
     	active: faker.random.boolean(),
      measureId: _vrandom
     })
  }
  return models.ingredient.bulkCreate(listObjects)
    .then(function(task) {
      return _returnJson(201, messageShow, _clearObjectAll(task))
  }).catch((err)=> {
      return _returnJson(500, 'Error On Server faker - Ingredient', err)
  });
}

function getOne(req, res, next) {
  return _getOne(req.params.keyId, 'getOne');
}

function getAll(req, res, next) {
  let order = req.query.order==null?'NotOrder':req.query.order.toUpperCase()
  let offset = 0
  return models.ingredient.findAndCountAll()
    .then((dataAll) => {
      let limit = req.query.limit ==null?10:parseInt(req.query.limit)
      let page = req.query.page==null?1:parseInt(req.query.page)
      let pages = Math.ceil(dataAll.count / limit);
      offset = limit * (page - 1);
      if (order == 'DESC' || order == 'ASC') {
        return models.ingredient.findAll({
          attributes: ['id', 'name', 'price', 'quantity', 'active', 'measureId'],
          limit: limit,
          offset: offset,
          order: [['name', order]],
          include: [ 'measure' ]
        }).then((objectAll) => {
           return _returnJson(200,`Pagina ${page} de ${pages}`,_clearObjectAll(objectAll))
        })
      } else {
        return models.ingredient.findAll({
          attributes: ['id', 'name', 'price', 'quantity', 'active', 'measureId'],
          limit: limit,
          offset: offset,
          include: [ 'measure' ]
        }).then((objectAll) => {
          return _returnJson(200,`Pagina ${page} de ${pages}`,_clearObjectAll(objectAll))
        })
      }
    }).catch((err) =>{
      return _returnJson(500, 'Error On Server getAll - Ingredient', err)
    }); 
}

function save(req, res) {
  return models.ingredient.create({
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    active: req.body.active,
    measureId: req.body.measureId
  }).then(function(theObject) {
    return _returnJson(201,`Ingredient name ${theObject.name}`, _clearObjectSingle(theObject))
  }).catch((err) => {
    console.log(err);
    return _returnJson(500, 'Error On Server save - Ingredient', err)
  });
}

function active(req, res, next) {
  let IdCat = req.params.keyId;
  return models.ingredient.findById(IdCat).then((theObject) => {
    return models.ingredient.update({
      active: !theObject.active
    }, {
      where: {
        id: IdCat
      }
    }).then((affectedRows)=>{
      return _getOne(IdCat)
    }).catch((err)=>{
      return _returnJson(500, 'Error On Server active - Ingredient', err)
    })
  })
}

function update(req, res, next) {
  var IdCat = req.params.keyId;
  return models.ingredient.update({
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
    return _returnJson(500, 'Error On Server update - Ingredient', err)
  })
}

function remove(req, res) {
  var the_Id = req.params.keyId;
  return models.ingredient.destroy({
    where: {
      id: the_Id
    }
  }).then((affectedRows)=>{
    if (affectedRows>=1) {
      return _returnJson(202,`Ingredient DELETE ID:${the_Id}`, null)
    } else {
      return _returnJson(404,`Ingredient NOT FOUND ID:${the_Id}`, null)
    }
  }).catch((err)=>{
    console.log(err);
    return _returnJson(500, 'Error On Server remove - Ingredient', err)
  })
}


function _getOne(Id, onfunction) {
  onfunction = onfunction==null?'-':onfunction
  if (Id==null) { 
    return _returnJson(400, 'Bad Request - Ingredient', _clearObject({id:0,name:'',active:false}))
  }  
  return models.ingredient.findOne({
    where: {id: Id}, include: [ 'measure' ]}).then((theObject) => {
      // console.log(theObject);
      if ((theObject!=null)) {
        return _returnJson(200,`Ingredient name ${theObject.name}`, _clearObject(theObject))
      } else {
        return _returnJson(404, 'NOT FOUND - Ingredient', {id:0, name:'', active: false, price:0, quantity:0, measureId:0, measure: {id:0, name:'', active:false}})
      }
  }).catch((err) => {
    console.log(err);
    return _returnJson(500, `Error On Server _getOne -${onfunction} - Ingredient`, err)
  });
}

function _clearObjectAll(_objectAll) {
  var objectAll = []
  _objectAll.forEach((tObject) => {
    objectAll.push(_clearObject(tObject))
  })
 return objectAll
}

// function _clearObjectSingle(_object) {
//   return {
//     id: _object.id, name: _object.name, active: _object.active, price:_object.price, quantity: _object.quantity, measureId: _object.measureId, measure: _object.measure
//   }
// }

function _clearObject(_object) {
  return {
    id: _object.id, name: _object.name, active: _object.active, price:_object.price, quantity: _object.quantity, measureId: _object.measureId, measure: {id:_object.measure.id, name:_object.measure.name, active:_object.measure.active}
  }
}

function _errorObject(_err, onfunction) {
  return {
    message: `Error On Server ${onfunction} - Ingredient`,
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
