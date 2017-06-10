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

/**
 * Table of general nutrition facts.
 * @author Matheus
 * @since 1.0.0
 */
 @autobind
class NutritionFactsVitaminsTable extends React.Component {

  render() {
    const values = this.props.data;
    const t = this.props.translations;
    const vitaminText = t.NutritionFacts.vitamins;

    const rows = Object.keys(values).map((vitamin,index) => {
      return (<NutritionFactsTableRow key={index} data={{
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
              tooltip={t.NutritionFacts.VitaminsTable.headers.tooltip}
              colSpan="4" >
              <h2>{t.NutritionFacts.VitaminsTable.headers.title}</h2>
            </TableHeaderColumn>
          </TableRow>
          <TableRow style={styles.row}>
            <TableHeaderColumn style={styles.cell}></TableHeaderColumn>
            <TableHeaderColumn style={styles.cell}></TableHeaderColumn>
            <TableHeaderColumn style={styles.cell}>
              {t.NutritionFacts.per100g}
            </TableHeaderColumn>
            <TableHeaderColumn style={styles.cell}>
              {t.NutritionFacts.perPortion}
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
