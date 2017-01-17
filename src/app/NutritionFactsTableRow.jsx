import React from 'react';
import {autobind} from 'core-decorators';
import {convertUnit} from 'app/helpers';

import {TableRow, TableRowColumn} from 'material-ui/Table';

/**
 * Table of general nutrition facts.
 * @author Matheus
 * @since 1.0.0
 */
 @autobind
class NutritionFactsTableRow extends React.Component {

  render() {
    const values = this.props.data;
    return (
      <TableRow style={{height:'2em'}}>
        <TableRowColumn colSpan={2} style={{height:'2em', fontSize:'1em'}}>
          {values.title}
        </TableRowColumn>
        <TableRowColumn style={{height:'2em', fontSize:'1em'}}>
          {convertUnit(values.content.hundred,values.originUnit,values.unit)}
        </TableRowColumn>
        <TableRowColumn style={{height:'2em', fontSize:'1em'}}>
          {convertUnit(values.content.portion,values.originUnit,values.unit)}
        </TableRowColumn>
      </TableRow>
    );
  }
}

NutritionFactsTableRow.propTypes = {
  data: React.PropTypes.object
}

module.exports = NutritionFactsTableRow;
