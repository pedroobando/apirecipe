/*
// Categorias de Recetas
*/

'use strict'

const models = require('../models')
const randomInt = require('random-int')

function faker(_recordTotal) {
  // var total = req.params.recordTotal==null?20:req.params.recordTotal
  var messageShow = `${_recordTotal} Category generate in recipe`
  var listObjects = []
  for (var i = 0; i < (_recordTotal); i++) {
     listObjects.push({
      categoryId: randomInt(1, _recordTotal-1),
      recipeId: randomInt(1, _recordTotal-1),
     })
  }
  
  return models.recipeCategory.bulkCreate(listObjects)
    .then(function(task) {
      return _returnJson(201, messageShow, _clearObjectCategoryAllFaker(task))
  }).catch((err)=> {
      return _returnJson(500, 'Error On Server fakerCategory - Recipe', err)
  })
}

function getAllByRecipe(_recipeId) {
  return _getAllByRecipe(_recipeId, 'getAllByRecipe')
}

function getOneByRecipe(_recipeId, _categoryId) {
  return _getOneByRecipe(_recipeId, _categoryId, 'getOneByRecipe')
}

function save(_recipeId, _categoryId) {
  return models.recipeCategory.create({
    recipeId: _recipeId,
    categoryId: _categoryId
  }).then(function(theObject) {
    return _getOne(theObject.id)
     // _returnJson(201,`Category ${theObject.categoryId} Add on Recipe ${theObject.recipeId}`, _g)
  }).catch((err) => {
    console.log(err)
    return _returnJson(500, 'Error On Server save - recipeCategory', err)
  })
}

// function update(req, res, next) {
//   var idKey = req.params.keyId
//   return models.recipe.update({
//     recipeId: req.body.recipeId,
//     categoryId: req.body.categoryId
//   }, {
//     where: {
//       id: idKey
//     }
//   }).then((affectedRows)=>{
//     return _getOne(idKey)
//   }).catch((err)=>{
//     return _returnJson(500, 'Error On Server update - Recipe', err)
//   })
// }

function remove(_recipeId, _categoryId) {
  // var the_Id = req.params.keyId
  return models.recipeCategory.destroy({
    where: {
      recipeId: _recipeId,
      categoryId: _categoryId
    }
  }).then((affectedRows)=>{
    if (affectedRows>=1) {
      return _returnJson(202,`Category is DELETE ID:${_categoryId}`, null)
    } else {
      return _returnJson(404,`Category NOT FOUND ID:${_categoryId}`, null)
    }
  }).catch((err)=>{
    console.log(err)
    return _returnJson(500, 'Error On Server remove - recipeCategory', err)
  })
}

function _getOne(Id, onfunction) {
  onfunction = onfunction==null?'-':onfunction
  if (Id==null) { 
    return _returnJson(400, 'Bad Request - recipeCategory', _clearObject({id:0,name:'',active:false}))
  }
  return models.recipeCategory.findOne({
    where: {id: Id}, include: [ 'category', 'recipe' ]}).then((theObject) => {
      if (theObject!=null) {
        return _returnJson(200,`Add category ${theObject.category.name } on recipe ${theObject.recipe.name}`, _clearObject(theObject))
      } else {
        return _returnJson(404, 'NOT FOUND - recipeCategory', {id:0, name:'', active: false, price:0, quantity:0, measureId:0, measure: {id:0, name:'', active:false}})
      }
  }).catch((err) => {
    console.log(err)
    return _returnJson(500, `Error On Server _getOne -${onfunction} - recipeCategory`, err)
  })
}

function _getAllByRecipe(Id, onfunction) {
  onfunction = onfunction==null?'-':onfunction
  if (Id==null) { 
    return _returnJson(400, 'Bad Request - recipeCategory', _clearObject({id:0,name:'',active:false}))
  }
  return models.recipeCategory.findAll({
    where: {recipeId: Id}, include: [ 'category', 'recipe' ]}).then((theObjects) => {
      if (theObjects!=null) {
        return _returnJson(200,`All categories from recipe`, _clearObjectCategoryAll(theObjects))
      } else {
        return _returnJson(404, 'NOT FOUND - categories', {id:0, name:''})
      }
  }).catch((err) => {
    console.log(err)
    return _returnJson(500, `Error On Server _getAllByRecipe -${onfunction} - Recipe`, err)
  })
}

function _getOneByRecipe(_recipeId, _categoryId, onfunction) {
  onfunction = onfunction==null?'-':onfunction
  if (_recipeId==null || _categoryId==null) { 
    return _returnJson(400, 'Bad Request - recipeCategory', _clearObject({id:0,name:'',active:false}))
  }
  return models.recipeCategory.findOne({
    where: {
      recipeId: _recipeId,
      categoryId: _categoryId },
    include: [ 'category', 'recipe' ]})
    .then((theObjects) => {
      if (theObjects!=null) {
        return _returnJson(200,`This category ${theObjects.category.name} from recipe ${theObjects.recipe.name}`, _clearObject(theObjects))
      } else {
        return _returnJson(404, 'NOT FOUND - Category in this recipe', {categoryId: _categoryId, recipeId: _recipeId})
      }
  }).catch((err) => {
    console.log(err)
    return _returnJson(500, `Error On Server - ${onfunction} - recipeCategory`, err)
  })
}


function _clearObjectCategoryAll(_objectAll) {
  var objectAll = []
  _objectAll.forEach((tObject) => {
    objectAll.push(_clearObject(tObject))
  })
  return objectAll
}

function _clearObjectCategoryAllFaker(_objectAll) {
  var objectAll = []
  _objectAll.forEach((tObject) => {
    objectAll.push(_clearObjectFaker(tObject))
  })
  return objectAll
}

function _clearObjectFaker(_object) {
  return {
    id:_object.id, recipeId: _object.recipeId, categoryId: _object.categoryId
  }
}


function _clearObject(_object) {
  return {
   id:_object.id, recipeId: _object.recipeId, recipeName: _object.recipe.name, categoryId: _object.categoryId, categoryName: _object.category.name
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
  
