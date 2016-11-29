import React from 'react';
import {Request} from 'app/helpers';

/**
 * Grid of recipes.
 * @author Matheus
 * @since 1.0.0
 */
class RecipeGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {recipes:[]};
  }

  componentDidMount() {
    let callbacks = {
      context: this,
      '200': (response) => {
        this.setState({recipes:JSON.parse(response.responseText)});
      }
    }
    Request('/recipes','GET',callbacks).send();
  }

  render() {
    let recipes = this.state.recipes.map((recipe) =>
      <div style={{margin: '0 0 48pt'}}>
        {recipe}
      </div>
    );
    console.log(recipes)
    if(recipes.length > 0){
      return (<div> {recipes} </div>);
    }
    else{
      return <div>No recipes.</div>
    }
  }
}

module.exports = RecipeGrid;
