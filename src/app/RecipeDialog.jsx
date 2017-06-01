import React from 'react';
import {autobind} from 'core-decorators'
import {constants,request} from 'app/helpers';

import Dialog from 'material-ui/Dialog';
import {GridList,GridTile} from 'material-ui/GridList';
import {Tabs, Tab} from 'material-ui/Tabs';

import IngredientsTable from 'app/IngredientsTable.jsx'
import NutritionFactsGeneralTable from 'app/NutritionFactsGeneralTable.jsx'
import NutritionFactsVitaminsTable from 'app/NutritionFactsVitaminsTable.jsx'
import NutritionFactsMineralsTable from 'app/NutritionFactsMineralsTable.jsx'

const style = {
  content:{
    width: '100%',
    maxWidth: 'none',
  },
  body: {
    margin:'5 0',
  },
  sideImage: (server,recipeId) => { return {
    backgroundImage: `url(${server}images/recipes/${recipeId}.jpg)`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center top',
  }},
}

function cellHeight(nutritionValues){
  let minRows = 0;
  if(typeof nutritionValues !== 'undefined' &&
     typeof nutritionValues.vitamins !== 'undefined'){
    if(Object.keys(nutritionValues.vitamins).length > minRows){
      minRows = Object.keys(nutritionValues.vitamins).length;
    }
  }
  if(typeof nutritionValues !== 'undefined' &&
     typeof nutritionValues.minerals !== 'undefined'){
    if(Object.keys(nutritionValues.minerals).length > minRows){
      minRows = Object.keys(nutritionValues.minerals).length;
    }
  }
  console.log(minRows)
  return (minRows || 6) * 32 /*rows*/ + 32 /*portion*/ + 55 /*title*/
}


/**
 * Full display of a recipe.
 * @author Matheus
 * @since 1.0.0
 */
 @autobind
class RecipeDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {recipe:{}}
  }

  componentWillReceiveProps(nextProps) {
    let callbacks = {
      context: this,
      '200': (response) => {
        this.setState({recipe:JSON.parse(response.responseText)});
      }
    }
    request(['recipes/',nextProps.recipeId].join(''),'GET',callbacks).send();
  }

  render() {
    return (
      <Dialog
        contentStyle={style.content}
        bodyStyle={style.body}
        autoDetectWindowHeight={true}
        autoScrollBodyContent={true}
        title={this.props.recipeId}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose} >
        <GridList
          cols={3}
          cellHeight={cellHeight(this.state.recipe.nutritionValues)*2 + 96 /* 2 x tabs for error margin*/}
          padding={4} >
          <GridTile style={style.sideImage(constants.image.server,this.props.recipeId)} />
          <GridTile cols={2}>
            <Tabs>
              <Tab label="Ingredients" >
                {this.state.recipe.ingredients ?
                  <IngredientsTable data={this.state.recipe.ingredients}/> :
                  'No ingredients'
                }
              </Tab>
              {this.state.recipe.nutritionValues ?
                <Tab label="Nutrition Facts" >
                  <GridList
                    cols={2}
                    cellHeight={cellHeight(this.state.recipe.nutritionValues)}
                    padding={4} >
                    <GridTile>
                      <NutritionFactsGeneralTable data={this.state.recipe.nutritionValues}/>
                    </GridTile>
                    <GridTile>
                      <NutritionFactsVitaminsTable data={this.state.recipe.nutritionValues.vitamins}/>
                    </GridTile>
                    <GridTile>
                      {''}
                    </GridTile>
                    <GridTile>
                      <NutritionFactsMineralsTable data={this.state.recipe.nutritionValues.minerals}/>
                    </GridTile>
                  </GridList>
                </Tab> : ''}
            </Tabs>
          </GridTile>
        </GridList>
      </Dialog>
    );
  }
}

RecipeDialog.propTypes = {
  recipeId: React.PropTypes.string
}

module.exports = RecipeDialog;
