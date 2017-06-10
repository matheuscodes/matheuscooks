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
    const t = this.props.translations;
    return (
      <Table fixedHeader={true} selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
            <TableRow>
              <TableHeaderColumn />
              <TableHeaderColumn
                tooltip={ t.IngredientsTable.headers.ingredients.tooltip }>
                {t.IngredientsTable.headers.ingredients.title}
              </TableHeaderColumn>
              <TableHeaderColumn
                tooltip={ t.IngredientsTable.headers.amounts.tooltip }>
                {t.IngredientsTable.headers.amounts.title}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} >
            {Object.keys(this.props.data).map((ingredient,index) => (
              <TableRow key={index}>
                <TableRowColumn>
                  <img
                    style={{
                      borderRadius: 32,
                    }}
                    width={64}
                    height={64}
                    src={[
                      constants.image.server,
                      'images/ingredients/',
                      ingredient,
                      '.png'
                    ].join('')} />
                </TableRowColumn>
                <TableRowColumn>
                  {this.props.translations.ingredients[ingredient] || ingredient}
                </TableRowColumn>
                <TableRowColumn>{this.props.data[ingredient]} g</TableRowColumn>
              </TableRow>
            ),this)}
        </TableBody>
      </Table>
    );
  }
}

IngredientsTable.propTypes = {
  data: React.PropTypes.object,
  translations: React.PropTypes.object,
}

module.exports = IngredientsTable;
