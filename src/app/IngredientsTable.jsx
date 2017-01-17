import React from 'react';
import {autobind} from 'core-decorators'
import {constants,request} from 'app/helpers';

import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table';

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
 * Table of ingredients.
 * @author Matheus
 * @since 1.0.0
 */
 @autobind
class IngredientsTable extends React.Component {

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
      <Table fixedHeader={true} selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
            <TableRow>
              <TableHeaderColumn
                tooltip="This is just a placeholder for a feature."
                colSpan="3"
                style={{textAlign: 'center'}} >
                Change unit
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip=""></TableHeaderColumn>
              <TableHeaderColumn tooltip="Ingredient">
                Ingredient
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Amount">
                Amount
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} >
            {Object.keys(this.props.data).map((ingredient,index) => (
              <TableRow key={index}>
                <TableRowColumn>
                  <img
                    width={64}
                    height={64}
                    src={[
                      constants.image.server,
                      'images/ingredients/',
                      ingredient,
                      '.png'
                    ].join('')} />
                </TableRowColumn>
                <TableRowColumn>{ingredient}</TableRowColumn>
                <TableRowColumn>{this.props.data[ingredient]}</TableRowColumn>
              </TableRow>
            ),this)}
        </TableBody>
      </Table>
    );
  }
}

IngredientsTable.propTypes = {
  data: React.PropTypes.object
}

module.exports = IngredientsTable;
