import React from 'react';
import {autobind} from 'core-decorators';

import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table';

const styles = {
  firstColSpan: 2,
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
  },
  subrow:{
    paddingLeft: '48px',
    height:'1em'
  },
  firstsubcell:{
    paddingLeft: 'inherit',
    height:'1em'
  },
  subcell:{
    height:'1em'
  }
}

/**
 * Table of general nutrition facts.
 * @author Matheus
 * @since 1.0.0
 */
 @autobind
class NutritionFactsGeneralTable extends React.Component {

  render() {
    const values = this.props.data;
    return (
      <Table fixedHeader={true} selectable={false} >
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
            <TableRow style={styles.row} >
              <TableHeaderColumn
                style={styles.firstcell}
                tooltip="Overall nutritional values."
                colSpan="4" >
                <h2>General</h2>
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
            <TableRow style={styles.row}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstcell}>{'Energy'}</TableRowColumn>
              <TableRowColumn style={styles.cell}>{values.energy.hundred.toString()}</TableRowColumn>
              <TableRowColumn style={styles.cell}>{values.energy.portion.toString()}</TableRowColumn>
            </TableRow>
            <TableRow style={styles.row}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstcell}>{'Protein'}</TableRowColumn>
              <TableRowColumn style={styles.cell}>{values.protein.hundred.toString()}</TableRowColumn>
              <TableRowColumn style={styles.cell}>{values.protein.portion.toString()}</TableRowColumn>
            </TableRow>
            <TableRow style={styles.row}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstcell}>{'Carbs'}</TableRowColumn>
              <TableRowColumn style={styles.cell}>{values.carbs.hundred.toString()}</TableRowColumn>
              <TableRowColumn style={styles.cell}>{values.carbs.portion.toString()}</TableRowColumn>
            </TableRow>
            {values.carbs.sugars ?
            <TableRow style={styles.subrow}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstsubcell}>{'- sugars'}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{values.carbs.sugars.hundred.toString()}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{values.carbs.sugars.portion.toString()}</TableRowColumn>
            </TableRow> : ''}
            {values.carbs.fiber ?
            <TableRow style={styles.subrow}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstsubcell}>{'- fiber'}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{values.carbs.fiber.hundred.toString()}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{values.carbs.fiber.portion.toString()}</TableRowColumn>
            </TableRow> : ''}
            {values.carbs.starch ?
            <TableRow style={styles.subrow}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstsubcell}>{'- starch'}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{values.carbs.starch.hundred.toString()}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{values.carbs.starch.portion.toString()}</TableRowColumn>
            </TableRow> : ''}
            <TableRow style={styles.row}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstcell}>{'Fat'}</TableRowColumn>
              <TableRowColumn style={styles.cell}>{values.fat.hundred.toString()}</TableRowColumn>
              <TableRowColumn style={styles.cell}>{values.fat.portion.toString()}</TableRowColumn>
            </TableRow>
            {values.fat.monounsaturated ?
            <TableRow style={styles.subrow}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstsubcell}>{'- monosaturated'}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{values.fat.monounsaturated.hundred.toString()}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{values.fat.monounsaturated.portion.toString()}</TableRowColumn>
            </TableRow> : ''}
            {values.fat.polyunsaturated ?
            <TableRow style={styles.subrow}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstsubcell}>{'- polyunsaturated'}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{values.fat.polyunsaturated.hundred.toString()}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{values.fat.polyunsaturated.portion.toString()}</TableRowColumn>
            </TableRow> : ''}
            {values.fat.saturated ?
            <TableRow style={styles.subrow}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstsubcell}>{'- saturated'}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{values.fat.saturated.hundred.toString()}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{values.fat.saturated.portion.toString()}</TableRowColumn>
            </TableRow> : ''}
            {values.fat.transFats ?
            <TableRow style={styles.subrow}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstsubcell}>{'- trans fats'}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{values.fat.transFats.hundred.toString()}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{values.fat.transFats.portion.toString()}</TableRowColumn>
            </TableRow> : ''}
            <TableRow style={styles.row}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstcell}>{'Cholesterol'}</TableRowColumn>
              <TableRowColumn style={styles.cell}>{values.cholesterol.hundred.toString()}</TableRowColumn>
              <TableRowColumn style={styles.cell}>{values.cholesterol.portion.toString()}</TableRowColumn>
            </TableRow>
        </TableBody>
      </Table>
    );
  }
}

NutritionFactsGeneralTable.propTypes = {
  data: React.PropTypes.object
}

module.exports = NutritionFactsGeneralTable;
