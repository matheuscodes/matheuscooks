function convertUnit(value,originUnit,unit){
  switch([originUnit,unit].join('-')){
    case 'mg-g': return [(value/1000).toFixed(2),unit].join(' ');
    default: return [value.toFixed(2),originUnit].join(' ');
  }
}

module.exports = convertUnit;
