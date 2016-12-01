import React from 'react';
import {request} from 'app/helpers';

import {GridList} from 'material-ui/GridList';

import RecipeTile from 'app/RecipeTile.jsx';

/**
 * Grid of recipes.
 * @author Matheus
 * @since 1.0.0
 */

class RecipeGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {recipes:[]};
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
    request('/recipes','GET',callbacks).send();
  }

  render() {
    let recipes = this.state.recipes.map((recipe) =>
      <RecipeTile
        rows={1}
        cols={1}
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
          padding={1}
          style={this.style.gridList}>
          {(recipes || 'No recipes.')}
        </GridList>
      </div>
    );
  }
}

module.exports = RecipeGrid;
