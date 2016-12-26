import React from 'react';
import {autobind} from 'core-decorators'
import {constants,request} from 'app/helpers';

import Dialog from 'material-ui/Dialog';
import {GridList,GridTile} from 'material-ui/GridList';
import {Tabs, Tab} from 'material-ui/Tabs';

import IngredientsTable from 'app/IngredientsTable.jsx'
import NutritionFactsGeneralTable from 'app/NutritionFactsGeneralTable.jsx'

const style = {
  content:{
    width: '100%',
    maxWidth: 'none',
  },
  body: {
    margin:'5 0',
  }
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
    request(['/recipes/',nextProps.recipeId].join(''),'GET',callbacks).send();
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
          cellHeight={'auto'}
          padding={4} >
          <GridTile>
            <img
              width={'100%'}
              src={[
                constants.image.server,
                'images/recipes/',
                this.props.recipeId,
                '.jpg'
              ].join('')} />
          </GridTile>

          <GridTile cols={2}>
            <Tabs>
              <Tab label="Ingredients" >
                {this.state.recipe.ingredients ?
                  <IngredientsTable data={this.state.recipe.ingredients}/> :
                  'No ingredients'
                }
              </Tab>

              <Tab label="Nutrition Facts" >
                <GridList
                  cols={2}
                  cellHeight={'auto'}
                  padding={4} >
                  <GridTile>
                    <NutritionFactsGeneralTable data={{
                            energy:{
                              hundred:123,
                              portion:123
                            },
                            protein:{
                              hundred:123,
                              portion:123
                            },
                            carbs:{
                              hundred:123,
                              portion:123,
                              sugars:{
                                hundred:123,
                                portion:123
                              },
                              fiber:{
                                hundred:123,
                                portion:123
                              },
                              starch:{
                                hundred:123,
                                portion:123
                              }
                            },
                            fat:{
                              hundred:123,
                              portion:123,
                              monosaturated:{
                                hundred:123,
                                portion:123
                              },
                              polyunsaturated:{
                                hundred:123,
                                portion:123
                              },
                              saturated:{
                                hundred:123,
                                portion:123
                              },
                              transFats:{
                                hundred:123,
                                portion:123
                              }
                            },
                            cholesterol:{
                              hundred:123,
                              portion:123
                            }
                      }}/>
                  </GridTile>
                </GridList>
              </Tab>
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