import React from 'react';
import {autobind} from 'core-decorators';
import {convertUnit} from 'app/helpers';

import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table';

const styles = {
  firstColSpan: 1,
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
    const t = this.props.translations;
    return (
      <Table fixedHeader={true} selectable={false} >
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
            <TableRow style={styles.row} >
              <TableHeaderColumn
                style={styles.firstcell}
                tooltip={t.NutritionFacts.GeneralTable.headers.tooltip}
                colSpan="3" >
                <h2>{t.NutritionFacts.GeneralTable.headers.title}</h2>
              </TableHeaderColumn>
            </TableRow>
            <TableRow style={styles.row}>
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
            <TableRow style={styles.row}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstcell}>
                {t.NutritionFacts.GeneralTable.energy}
              </TableRowColumn>
              <TableRowColumn style={styles.cell}>{convertUnit(values.energy.hundred,'kcal')}</TableRowColumn>
              <TableRowColumn style={styles.cell}>{convertUnit(values.energy.portion,'kcal')}</TableRowColumn>
            </TableRow>
            <TableRow style={styles.row}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstcell}>
                {t.NutritionFacts.GeneralTable.proteins}
              </TableRowColumn>
              <TableRowColumn style={styles.cell}>{convertUnit(values.proteins.hundred,'mg','g')}</TableRowColumn>
              <TableRowColumn style={styles.cell}>{convertUnit(values.proteins.portion,'mg','g')}</TableRowColumn>
            </TableRow>
            <TableRow style={styles.row}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstcell}>
                {t.NutritionFacts.GeneralTable.carbs}
              </TableRowColumn>
              <TableRowColumn style={styles.cell}>{convertUnit(values.carbs.hundred,'mg','g')}</TableRowColumn>
              <TableRowColumn style={styles.cell}>{convertUnit(values.carbs.portion,'mg','g')}</TableRowColumn>
            </TableRow>
            {values.carbs.sugars ?
            <TableRow style={styles.subrow}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstsubcell}>
                - {t.NutritionFacts.GeneralTable.sugars}
              </TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.carbs.sugars.hundred,'mg','g')}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.carbs.sugars.portion,'mg','g')}</TableRowColumn>
            </TableRow> : ''}
            {values.carbs.fiber ?
            <TableRow style={styles.subrow}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstsubcell}>
                - {t.NutritionFacts.GeneralTable.fibers}
              </TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.carbs.fiber.hundred,'mg','g')}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.carbs.fiber.portion,'mg','g')}</TableRowColumn>
            </TableRow> : ''}
            {values.carbs.starch ?
            <TableRow style={styles.subrow}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstsubcell}>
                - {t.NutritionFacts.GeneralTable.starch}
              </TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.carbs.starch.hundred,'mg','g')}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.carbs.starch.portion,'mg','g')}</TableRowColumn>
            </TableRow> : ''}
            <TableRow style={styles.row}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstcell}>
                {t.NutritionFacts.GeneralTable.fat}
              </TableRowColumn>
              <TableRowColumn style={styles.cell}>{convertUnit(values.lipids.hundred,'mg','g')}</TableRowColumn>
              <TableRowColumn style={styles.cell}>{convertUnit(values.lipids.portion,'mg','g')}</TableRowColumn>
            </TableRow>
            {values.lipids.monounsaturated ?
            <TableRow style={styles.subrow}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstsubcell}>
                - {t.NutritionFacts.GeneralTable.monounsaturated}
              </TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.lipids.monounsaturated.hundred,'mg','g')}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.lipids.monounsaturated.portion,'mg','g')}</TableRowColumn>
            </TableRow> : ''}
            {values.lipids.polyunsaturated ?
            <TableRow style={styles.subrow}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstsubcell}>
                - {t.NutritionFacts.GeneralTable.polyunsaturated}
              </TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.lipids.polyunsaturated.hundred,'mg','g')}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.lipids.polyunsaturated.portion,'mg','g')}</TableRowColumn>
            </TableRow> : ''}
            {values.lipids.saturated ?
            <TableRow style={styles.subrow}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstsubcell}>
                - {t.NutritionFacts.GeneralTable.saturated}
              </TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.lipids.saturated.hundred,'mg','g')}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.lipids.saturated.portion,'mg','g')}</TableRowColumn>
            </TableRow> : ''}
            {values.lipids.transFats ?
            <TableRow style={styles.subrow}>
              <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstsubcell}>
                {t.NutritionFacts.GeneralTable.transFats}
              </TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.lipids.transFats.hundred,'mg','g')}</TableRowColumn>
              <TableRowColumn style={styles.subcell}>{convertUnit(values.lipids.transFats.portion,'mg','g')}</TableRowColumn>
            </TableRow> : ''}
            {values.cholesterol ?
              <TableRow style={styles.row}>
                <TableRowColumn colSpan={styles.firstColSpan} style={styles.firstcell}>
                  {t.NutritionFacts.GeneralTable.cholesterol}
                </TableRowColumn>
                <TableRowColumn style={styles.cell}>{convertUnit(values.cholesterol.hundred,'mg','g')}</TableRowColumn>
                <TableRowColumn style={styles.cell}>{convertUnit(values.cholesterol.portion,'mg','g')}</TableRowColumn>
              </TableRow> : ''}
        </TableBody>
      </Table>
    );
  }
}

NutritionFactsGeneralTable.propTypes = {
  data: React.PropTypes.object,
  translations: React.PropTypes.object,
}

module.exports = NutritionFactsGeneralTable;
