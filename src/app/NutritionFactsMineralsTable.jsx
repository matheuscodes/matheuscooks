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

const mineralText = {
  'calcium':'Calcium',
  'copper':'Copper',
  'iron':'Iron',
  'magnesium':'Magnesium',
  'manganese':'Manganese',
  'phosphorus':'Phosphorus',
  'potassium':'Potassium',
  'selenium':'Selenium',
  'sodium':'Sodium',
  'zinc':'Zinc',
}

/**
 * Table of general nutrition facts.
 * @author Matheus
 * @since 1.0.0
 */
 @autobind
class NutritionFactsMineralsTable extends React.Component {

  render() {
    const values = this.props.data;

    const rows = Object.keys(values).map((mineral, index) => {
      return (<NutritionFactsTableRow key={index} data={{
        title: (mineralText[mineral] || mineral),
        content: values[mineral],
        originUnit: 'mg'
      }} />);
    });

    return (
      <Table fixedHeader={true} selectable={false} >
        <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
          <TableRow style={styles.row} >
            <TableHeaderColumn
              style={styles.firstcell}
              tooltip="Overall mineral values."
              colSpan="4" >
              <h2>Minerals</h2>
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

NutritionFactsMineralsTable.propTypes = {
  data: React.PropTypes.object
}

module.exports = NutritionFactsMineralsTable;
