require('app-module-path').addPath(__dirname);
const express = require('express');
const http = require('http');
const fs = require('fs');
const chalk = require('chalk');
const ingredients = require('ingredients');

const calculateNutritionValues = require('engine/calculateNutritionValues');

var app = express();

app.use(express.static('build'));

const recipeList = [];
const recipeMap = {};
const translations = {
  recipes:{original:{},de:{},en:{}},
  ingredients:{pt:{},de:{},en:{}},
}

Object.keys(ingredients).forEach(ingredient => {
  Object.keys(ingredients[ingredient].translations || {}).forEach(language => {
    translations.ingredients[language][ingredient] = ingredients[ingredient].translations[language];
  });
});

var recipeErrors = 0;

fs.readdirSync('node_modules/matheuscooks-recipes/vegan').forEach(function(recipe){
  try{
    console.log(['\n',recipe,':'].join(''));
    const fullRecipe = fs.readFileSync(['node_modules/matheuscooks-recipes/vegan',recipe].join('/'));
    const readRecipe = JSON.parse(fullRecipe.toString());
    const calculation = calculateNutritionValues(readRecipe);
    const recipeId = recipe.replace('.json','');
    recipeMap[recipeId] = calculation.recipe;
    Object.keys(calculation.recipe.titles || {}).forEach((language) => {
      translations.recipes[language][recipeId] = calculation.recipe.titles[language];
    });
    if(calculation.missedIngredients.length > 0){
      console.log(chalk.yellow(['\t✖ missed ',calculation.missedIngredients].join('')));
      recipeErrors += 1;
    } else {
      console.log(chalk.green('\t✓ Loaded ok'));
    }
    recipeList.push(recipeId);
  } catch(e) {
    console.log(chalk.red(['\t✖ failed due to ',e.message].join('')));
    recipeErrors += 1;
  }
});

console.log("\n\nAmount of recipes read:",recipeList.length);
console.log("Amount of reading errors:",recipeErrors);

app.get("/", function(req, res) {
  let basePage = [];
  basePage.push('<html>');
  basePage.push('<head>');
  basePage.push('<link href="https://fonts.googleapis.com/css?family=Roboto:400,300,500" rel="stylesheet" type="text/css" />');
  basePage.push('<meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />');
  basePage.push('<link href="styles/main.css" rel="stylesheet" type="text/css" />');
  basePage.push('</head>');
  basePage.push('<body style="background:#000">');
  basePage.push('<script async defer src="app.js" ></script>');
  basePage.push('<div id="mainContainer"></div>');
  basePage.push('</body>');
  basePage.push('</html>');
  res.send(basePage.join(''));
});

app.use('/fonts',express.static('fonts'));

app.param('recipe', function(req, res, next, recipe) {
  if(typeof recipe !== 'undefined'){
    req.recipe = recipe;
  }
  next();
});

app.param('language', function(req, res, next, language) {
  if(typeof language !== 'undefined'){
    req.language = language;
  }
  next();
});

app.get(['/recipes','/recipes/:recipe'], function(req, res) {
  if(typeof req.recipe === 'undefined'){
    res.send(JSON.stringify(recipeList));
  } else {
    res.send(JSON.stringify(recipeMap[req.recipe]));
  }
});

app.get(['/languages/:language/ingredients.json'], function(req, res) {
  res.send(JSON.stringify(translations.ingredients[req.language]));
});

app.get(['/languages/:language/recipes.json'], function(req, res) {
  res.send(JSON.stringify(translations.recipes[req.language] ||
                          translations.recipes['original']));
});

app.get('/recipes-index', function(req, res) {
  res.send(JSON.stringify(recipeList));
});

app.use('/styles',express.static('styles'));

var server = http.createServer(app);
server.listen(9091);
console.log("Listening to 9091");
