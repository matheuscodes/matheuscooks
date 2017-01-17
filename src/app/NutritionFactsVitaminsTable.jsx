import React from 'react';
import {autobind} from 'core-decorators';
import NutritionFactsTableRow from 'app/NutritionFactsTableRow.jsx'

import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table';

const styles = {
  row:{
    height:'2em'
  },
  firstcell:{
    height:'2em',
    fontSize:'1em'
  },
  cell:{
    height:'2em',
    fontSize:'1em'
  }
}

const vitaminText = {
  'b1':'Vitamin B1',
  'b2':'Vitamin B2',
  'b3':'Vitamin B3',
  'b4':'Vitamin B4',
  'b5':'Vitamin B5',
  'b6':'Vitamin B6',
  'b12':'Vitamin B12',
  'choline':'Choline',
  'folate':'Folate',
  'e':'Vitamin E',
  'k':'Vitamin K',
}

/**
 * Table of general nutrition facts.
 * @author Matheus
 * @since 1.0.0
 */
 @autobind
class NutritionFactsVitaminsTable extends React.Component {

  render() {
    const values = this.props.data;

    const rows = Object.keys(values).map(vitamin => {
      return (<NutritionFactsTableRow data={{
        title: (vitaminText[vitamin] || vitamin),
        content: values[vitamin],
        originUnit: 'mg'
      }} />);
    });

    return (
      <Table fixedHeader={true} selectable={false} >
        <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
          <TableRow style={styles.row} >
            <TableHeaderColumn
              style={styles.firstcell}
              tooltip="Overall vitamin values."
              colSpan="4" >
              <h2>Vitamins</h2>
            </TableHeaderColumn>
          </TableRow>
          <TableRow style={styles.row}>
            <TableHeaderColumn style={styles.cell}></TableHeaderColumn>
            <TableHeaderColumn style={styles.cell}></TableHeaderColumn>
            <TableHeaderColumn style={styles.cell}>
              {'per 100g'}
            </TableHeaderColumn>
            <TableHeaderColumn style={styles.cell}>
              {'per portion'}
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} >
          {rows}
        </TableBody>
      </Table>
    );
  }
}

NutritionFactsVitaminsTable.propTypes = {
  data: React.PropTypes.object
}

module.exports = NutritionFactsVitaminsTable;
