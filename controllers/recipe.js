'use strict';

const models = require('../models');

function faker(req, res, next) {
	const faker = require('faker');

	faker.locate = "es"
  // console.log();
  var total = req.params.recordTotal==null?20:req.params.recordTotal;
  var messageShow = `${total} recipe generate`;
  var listObjects = [];
  for (var i = 0; i < total; i++) {
     // _RecipeLine = {name:_RecipeName, active:false};
     listObjects.push({
     	name: faker.commerce.product(),
     	difficulty: 3,
     	portion: 4,
     	preparation: 'dsdsds kjkjdfk kdsjf',
     	active:true
     })
  }
  return models.recipe.bulkCreate(listObjects)
    .then(function(task) {
      return {recipe: messageShow, message: 'Indique el numero de registros con :/Recipe/faker/200'}
    	// res.status(200).send({message: messageShow})
  }).catch((err)=> {
      return {recipe: {error: `Error creando una Recipe: [${err}]`} }
  		// res.status(500).send(err);
  });
}

function getRecipe(req, res, next) {
  return _getRecipe(req.params.recipeId);
}

function getRecipes(req, res, next) {
  var theOrden = req.query.order==null?'NotOrder':req.query.order.toUpperCase()
  var _activeOnly = req.query.active
  if (theOrden == 'DESC' || theOrden == 'ASC') {
    return models.recipe.findAll({ order: [ ['name', theOrden]] }).then(recipesAll => {
      return _clearRecipes(recipesAll)
    })
  } else {
    return models.recipe.findAll().then(recipesAll => {
      return _clearRecipes(recipesAll)
    })
  }
}


function _getRecipe(Id) {
  if (Id==null) { return {Recipe: null} }
  return models.recipe.findById(Id).then((theObject) => {
    if (theObject) {
      return {recipe: _clearRecipe(theObject)}
    } else {
      return {recipe: null}
    }
  }).catch((err) => {
    return _errorRecipe(err, '_getRecipes')
  });
}

function _errorRecipe(err, onfunction) {
  return {recipe: {
    error: `Error ${onfunction} Recipe: [${err}]`,
    err: err
  } }
}

function _clearRecipes(_recipesAll) {
  var recipesAll = []
  _recipesAll.forEach((recipe) => {
    recipesAll.push(_clearRecipe(recipe))
  })
  return recipesAll
}

function _clearRecipe(_recipe) {
  return {id: _recipe.id, name: _recipe.name, difficulty: _recipe.difficulty, portion:_recipe.portion, preparation: _recipe.preparation, active: _recipe.active}
}

module.exports = { 
  faker,
  getRecipe,
  getRecipes
}