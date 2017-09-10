/*
// Categorias de Recetas
*/

'use strict'

const models = require('../models')
const randomInt = require('random-int')

function faker(_recordTotal) {
  // var total = req.params.recordTotal==null?20:req.params.recordTotal
  var messageShow = `${_recordTotal} Ingredients generate in recipe`
  var listObjects = []
  for (var i = 0; i < (_recordTotal); i++) {
     listObjects.push({
      ingredientId: randomInt(1, _recordTotal-1),
      recipeId: randomInt(1, _recordTotal-1),
      quantity: randomInt(1,6),
      measureId: randomInt(1, 10)
     })
  }

  return models.recipeIngredient.bulkCreate(listObjects)
    .then(function(task) {
      return _returnJson(201, messageShow, _clearObjectIngredientAllFaker(task))
  }).catch((err)=> {
      return _returnJson(500, 'Error On Server fakerIngredient - Recipe', err)
  })
}

function getAllByRecipe(_recipeId) {
  return _getAllByRecipe(_recipeId, 'getAllByRecipe')
}

function getOneByRecipe(_recipeId, _ingredientId) {
  return _getOneByRecipe(_recipeId, _ingredientId, 'getOneByRecipe')
}

function save(_recipeId, _ingredientId, _measureId, _quantity) {
  return models.recipeIngredient.create({
    recipeId: _recipeId,
		ingredientId: _ingredientId,
		measureId: _measureId,
		quantity: _quantity
  }).then(function(theObject) {
    return _getOne(theObject.id)
     // _returnJson(201,`Ingredient ${theObject.ingredientId} Add on Recipe ${theObject.recipeId}`, _g)
  }).catch((err) => {
    console.log(err)
    return _returnJson(500, 'Error On Server save - recipeIngredient', err)
  })
}

function remove(_recipeId, _ingredientId) {
  // var the_Id = req.params.keyId
  return models.recipeIngredient.destroy({
    where: {
      recipeId: _recipeId,
      ingredientId: _ingredientId
    }
  }).then((affectedRows)=>{
    if (affectedRows>=1) {
      return _returnJson(202,`Ingredient is DELETE ID:${_ingredientId}`, null)
    } else {
      return _returnJson(404,`Ingredient NOT FOUND ID:${_ingredientId}`, null)
    }
  }).catch((err)=>{
    console.log(err)
    return _returnJson(500, 'Error On Server remove - recipeIngredient', err)
  })
}

function _getOne(Id, onfunction) {
  onfunction = onfunction==null?'-':onfunction
  if (Id==null) {
    return _returnJson(400, 'Bad Request - recipeIngredient', _clearObject({id:0,name:'',active:false}))
  }
  return models.recipeIngredient.findOne({
    // where: {id: Id}, include: [ 'ingredient', 'recipe' ]}).then((theObject) => {
		where: {id: Id}, include: [ 'ingredient', 'measure' ]}).then((theObject) => {
			console.log(theObject)
      if (theObject!=null) {
        return _returnJson(200,`Add ingredient ${theObject.ingredient.name} on recipe ${theObject.recipeId}`, _clearObject(theObject))
      } else {
        return _returnJson(404, 'NOT FOUND - recipeIngredient', {id:0, name:'', active: false, price:0, quantity:0, measureId:0})
      }
  }).catch((err) => {
    console.log(err)
    return _returnJson(500, `Error On Server _getOne -${onfunction} - recipeIngredient`, err)
  })
}

function _getAllByRecipe(Id, onfunction) {
  onfunction = onfunction==null?'-':onfunction
  if (Id==null) {
    return _returnJson(400, 'Bad Request - recipeIngredient', _clearObject({id:0,name:'',active:false}))
  }
  return models.recipeIngredient.findAll({
    where: {recipeId: Id}, include: [ 'ingredient', 'recipe', 'measure' ]}).then((theObjects) => {
      if (theObjects!=null) {
        return _returnJson(200,`All ingredients from recipe`, _clearObjectIngredientAll(theObjects))
      } else {
        return _returnJson(404, 'NOT FOUND - ingredients', {id:0, name:''})
      }
  }).catch((err) => {
    console.log(err)
    return _returnJson(500, `Error On Server _getAllByRecipe -${onfunction} - Recipe`, err)
  })
}

function _getOneByRecipe(_recipeId, _ingredientId, onfunction) {
  onfunction = onfunction==null?'-':onfunction
  if (_recipeId==null || _ingredientId==null) {
    return _returnJson(400, 'Bad Request - recipeIngredient', _clearObject({id:0,name:'',active:false}))
  }
  return models.recipeIngredient.findOne({
    where: {
      recipeId: _recipeId,
      ingredientId: _ingredientId },
    include: [ 'ingredient', 'recipe', 'measure' ]})
    .then((theObjects) => {
      if (theObjects!=null) {
        return _returnJson(200,`This ingredient ${theObjects.ingredient.name} from recipe ${theObjects.recipe.name}`, _clearObject(theObjects))
      } else {
        return _returnJson(404, 'NOT FOUND - Ingredient in this recipe', {ingredientId: _ingredientId, recipeId: _recipeId})
      }
  }).catch((err) => {
    console.log(err)
    return _returnJson(500, `Error On Server - ${onfunction} - recipeIngredient`, err)
  })
}


function _clearObjectIngredientAll(_objectAll) {
  var objectAll = []
  _objectAll.forEach((tObject) => {
    objectAll.push(_clearObject(tObject))
  })
  return objectAll
}

function _clearObjectIngredientAllFaker(_objectAll) {
  var objectAll = []
  _objectAll.forEach((tObject) => {
    objectAll.push(_clearObjectFaker(tObject))
  })
  return objectAll
}

function _clearObjectFaker(_object) {
  return {
    id:_object.id, recipeId: _object.recipeId, ingredientId: _object.ingredientId, measureId: _object.measureId, quantity: _object.quantity
  }
}


function _clearObject(_object) {
  return {
   id:_object.id,
   recipeId: _object.recipeId , // recipeName: _object.recipe.name,
   ingredientId: _object.ingredientId, ingredientName: _object.ingredient.name,
   measureId: _object.measureId, measureName: _object.measure.name,
   quantity: _object.quantity
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
  faker,
  getAllByRecipe,
  getOneByRecipe,
  save,
  remove,
  save
}

