import React from 'react';
import {autobind} from 'core-decorators'

import GridList from 'material-ui/GridList';
import Dialog from 'material-ui/Dialog';

import {request} from 'app/helpers';

import RecipeTile from 'app/RecipeTile.jsx';
import RecipeDialog from 'app/RecipeDialog.jsx';

/**
 * Grid of recipes.
 * @author Matheus
 * @since 1.0.0
 */
 @autobind
class RecipeGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {recipes:[],open:false};
    this.style = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: '100%',
        overflowY: 'auto',
      },
    }
  }

  componentDidMount() {
    let callbacks = {
      context: this,
      '200': (response) => {
        this.setState({recipes:JSON.parse(response.responseText)});
      }
    }
    request('recipes','GET',callbacks).send();
  }

  handleClose() {
    let current = this.state;
    current.open = false;
    delete current.recipeId;
    this.setState(current);
  }

  handleOpen(recipeId) {
    let current = this.state;
    current.open = true;
    current.recipeId = recipeId;
    this.setState(current);
  }

  render() {
    let recipes = this.state.recipes.map((recipe) =>
      <RecipeTile
        openDialog={this.handleOpen}
        rows={1} cols={1}
        key={recipe}
        recipeId={recipe} />
    );
    return (
      <div style={this.style.root}>
        <GridList
          cols={(
            Math.floor(document.documentElement.clientWidth / 320) ||
            Math.floor(window.innerWidth / 320) || 1
          )}
          cellHeight={320}
          padding={4}
          style={this.style.gridList} >
          {(recipes || 'No recipes.')}
        </GridList>
        <RecipeDialog
          recipeId={this.state.recipeId}
          open={this.state.open}
          onRequestClose={this.handleClose} />
      </div>
    );
  }
}

module.exports = RecipeGrid;
