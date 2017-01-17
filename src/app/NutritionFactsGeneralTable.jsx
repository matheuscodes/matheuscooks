import React from 'react';
import {autobind} from 'core-decorators';
import {convertUnit} from 'app/helpers';

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
              <TableRowColumn style={styles.cell}>{convertUnit(values.energy.hundred,'kcal')}</TableRowColumn>
              <TableRowColumn style={styles.cell}>{convertUnit(values.energy.portion,'kcal')}</TableRowColumn>
            </TableRow>
            <TableRow style={styles.row}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstcell}>{'Proteins'}</TableRowColumn>
              <TableRowColumn style={styles.cell}>{convertUnit(values.proteins.hundred,'mg','g')}</TableRowColumn>
              <TableRowColumn style={styles.cell}>{convertUnit(values.proteins.portion,'mg','g')}</TableRowColumn>
            </TableRow>
            <TableRow style={styles.row}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstcell}>{'Carbs'}</TableRowColumn>
              <TableRowColumn style={styles.cell}>{convertUnit(values.carbs.hundred,'mg','g')}</TableRowColumn>
              <TableRowColumn style={styles.cell}>{convertUnit(values.carbs.portion,'mg','g')}</TableRowColumn>
            </TableRow>
            {values.carbs.sugars ?
            <TableRow style={styles.subrow}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstsubcell}>{'- sugars'}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.carbs.sugars.hundred,'mg','g')}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.carbs.sugars.portion,'mg','g')}</TableRowColumn>
            </TableRow> : ''}
            {values.carbs.fiber ?
            <TableRow style={styles.subrow}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstsubcell}>{'- fiber'}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.carbs.fiber.hundred,'mg','g')}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.carbs.fiber.portion,'mg','g')}</TableRowColumn>
            </TableRow> : ''}
            {values.carbs.starch ?
            <TableRow style={styles.subrow}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstsubcell}>{'- starch'}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.carbs.starch.hundred,'mg','g')}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.carbs.starch.portion,'mg','g')}</TableRowColumn>
            </TableRow> : ''}
            <TableRow style={styles.row}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstcell}>{'Fat'}</TableRowColumn>
              <TableRowColumn style={styles.cell}>{convertUnit(values.lipids.hundred,'mg','g')}</TableRowColumn>
              <TableRowColumn style={styles.cell}>{convertUnit(values.lipids.portion,'mg','g')}</TableRowColumn>
            </TableRow>
            {values.lipids.monounsaturated ?
            <TableRow style={styles.subrow}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstsubcell}>{'- monosaturated'}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.lipids.monounsaturated.hundred,'mg','g')}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.lipids.monounsaturated.portion,'mg','g')}</TableRowColumn>
            </TableRow> : ''}
            {values.lipids.polyunsaturated ?
            <TableRow style={styles.subrow}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstsubcell}>{'- polyunsaturated'}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.lipids.polyunsaturated.hundred,'mg','g')}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.lipids.polyunsaturated.portion,'mg','g')}</TableRowColumn>
            </TableRow> : ''}
            {values.lipids.saturated ?
            <TableRow style={styles.subrow}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstsubcell}>{'- saturated'}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.lipids.saturated.hundred,'mg','g')}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.lipids.saturated.portion,'mg','g')}</TableRowColumn>
            </TableRow> : ''}
            {values.lipids.transFats ?
            <TableRow style={styles.subrow}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstsubcell}>{'- trans fats'}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.lipids.transFats.hundred,'mg','g')}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.lipids.transFats.portion,'mg','g')}</TableRowColumn>
            </TableRow> : ''}
            {values.cholesterol ?
              <TableRow style={styles.row}>
                <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstcell}>{'Cholesterol'}</TableRowColumn>
                <TableRowColumn style={styles.cell}>{convertUnit(values.cholesterol.hundred,'mg','g')}</TableRowColumn>
                <TableRowColumn style={styles.cell}>{convertUnit(values.cholesterol.portion,'mg','g')}</TableRowColumn>
              </TableRow> : ''}
        </TableBody>
      </Table>
    );
  }
}

NutritionFactsGeneralTable.propTypes = {
  data: React.PropTypes.object
}

module.exports = NutritionFactsGeneralTable;
