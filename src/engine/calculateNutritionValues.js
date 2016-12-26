const ingredients = require('ingredients');
const lodash = require('lodash');

function ingredientMerger(objValue, srcValue) {
  if(typeof objValue === 'undefined'){
    return lodash.cloneDeep(srcValue);
  }
  if (lodash.isArray(objValue)) {
    return objValue.concat(srcValue);
  } else {
    let objCopy = lodash.cloneDeep(objValue);
    Object.keys(srcValue).forEach(key => {
      if(typeof objCopy[key] !== 'undefined'){
        if(lodash.isObject(objCopy[key]) && lodash.isObject(srcValue[key])){
          objCopy[key] = ingredientMerger(objCopy[key],srcValue[key]);
        } else if (!lodash.isObject(srcValue[key])){
          objCopy[key] = objCopy[key] + srcValue[key];
        } else {
          throw new Error('Incompatible formats! This should never happen.')
        }
      } else {
        objCopy[key] = srcValue[key];
      }
    });
    return objCopy;
  }
}

function ingredientMultiplier(objValue, multiplier) {
  let objCopy = lodash.cloneDeep(objValue);
  Object.keys(objCopy).forEach(key => {
    if(lodash.isObject(objCopy[key])){
      objCopy[key] = ingredientMultiplier(objCopy[key],multiplier);
    } else {
      objCopy[key] = objCopy[key] * multiplier;
    }
  });
  return objCopy;
}

function sumDeep(object){
  let sum = 0;
  if(typeof object === 'undefined' || typeof object === 'null'){
    return sum;
  }
  Object.keys(object).forEach(key => {
    if(lodash.isObject(object[key])){
      sum += sumDeep(object[key]);
    } else {
      sum += object[key];
    }
  });
  return sum;
}

function topLevels(nutritionValues){
  let totals = {};
  totals.carbs = sumDeep(nutritionValues.carbs);
  totals.lipids = sumDeep(nutritionValues.lipids);
  totals.proteins = sumDeep(nutritionValues.proteins);
  totals.alcohol = sumDeep(nutritionValues.alcohol);
  // https://en.wikipedia.org/wiki/Food_energy
  totals.energy = 0;
  totals.energy += totals.carbs * 0.004;
  totals.energy += totals.proteins * 0.004;
  totals.energy += totals.lipids * 0.009;
  totals.energy += totals.alcohol * 0.007;
  return totals;
}

function splitInformation(nutritionValues,totalWeight,portions){
  const factorHundred = 100/totalWeight;
  let split = {};
  Object.keys(nutritionValues).forEach(key => {
    if(lodash.isObject(nutritionValues[key])){
      split[key] = splitInformation(nutritionValues[key],totalWeight,portions);
    } else if(lodash.isArray(nutritionValues[key])){
      return nutritionValues[key];
    } else {
      split[key] = {};
      split[key].hundred = nutritionValues[key]*factorHundred;
      split[key].portion = nutritionValues[key]/portions;
    }
  });
  return split;
}

function calculateNutritionValues(recipe) {
  let nutritionValues = {};
  let missedIngredients = [];
  let totalAmount = 0;
  Object.keys(recipe.ingredients).forEach(ingredient => {
    if(typeof ingredients[ingredient] !== 'undefined'){
      let thisIngredient = ingredients[ingredient];
      let thisAmount = recipe.ingredients[ingredient];
      totalAmount += thisAmount;
      let multiplied = ingredientMultiplier(thisIngredient.nutritionValues,
                                            thisAmount);

      nutritionValues = ingredientMerger(nutritionValues,multiplied);
    } else {
      missedIngredients.push(ingredient);
    }
  });
  const portions = (recipe.portions || 1);
  let overview = topLevels(nutritionValues);
  overview = splitInformation(overview,totalAmount,portions);
  nutritionValues = splitInformation(nutritionValues,totalAmount,portions);
  let recipeCopy = lodash.cloneDeep(recipe);
  recipeCopy.totalWeight = totalAmount;
  recipeCopy.nutritionValues = {};
  lodash.merge(recipeCopy.nutritionValues,overview);
  lodash.merge(recipeCopy.nutritionValues,nutritionValues);
  return {
    recipe: recipeCopy,
    missedIngredients
  }
}

module.exports = calculateNutritionValues;
