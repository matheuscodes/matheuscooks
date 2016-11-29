require('app-module-path').addPath(__dirname);
var express = require('express');
var http = require('http');
var fs = require('fs');

var app = express();

app.use(express.static('build'));

const recipeList = [];
const recipeMap = {};
var recipeErrors = 0;

fs.readdirSync('recipes').forEach(function(recipe){
  try{
    const fullRecipe = fs.readFileSync(['recipes',recipe].join('/'));
    recipeMap[recipe] = JSON.parse(fullRecipe.toString());
  } catch(e) {
    recipeErrors += 1;
  }
  recipeList.push(recipe); // FIXME only add to list if no error.
});

console.log("Amount of recipes read:",recipeList.length);
console.log("Amount of reading errors:",recipeErrors);

app.get("/home", function(req, res) {
  let basePage = [];
  basePage.push('<html>');
  basePage.push('<head>');
  basePage.push('<link href="https://fonts.googleapis.com/css?family=Roboto:400,300,500" rel="stylesheet" type="text/css" />');
  basePage.push('<meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />');
  basePage.push('<link href="styles/main.css" rel="stylesheet" type="text/css" />');
  basePage.push('</head>');
  basePage.push('<body>');
  basePage.push('<script async defer src="app.js" ></script>');
  basePage.push('<div id="mainContainer"></div>');
  basePage.push('</body>');
  basePage.push('</html>');
  res.send(basePage.join(''));
});

app.use('/images',express.static('images'));
app.use('/fonts',express.static('fonts'));

app.param('recipe', function(req, res, next, recipe) {
  if(typeof recipe !== 'undefined'){
    req.recipe = recipe;
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

app.get('/recipes-index', function(req, res) {
  res.send(JSON.stringify(recipeList));
});

app.use('/index.html',express.static('src/index.html'));
app.use('/scripts',express.static('scripts'));
app.use('/styles',express.static('styles'));

var server = http.createServer(app);
server.listen(9091);
console.log("Listening to 9091");
