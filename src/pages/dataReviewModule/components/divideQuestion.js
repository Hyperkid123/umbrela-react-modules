import React,{Component} from 'react';
import EnhancedTable from './sortableTable/enhancedTable';
import Paper from 'material-ui/Paper';

export default class DivideQuestion extends Component {

  render() {
    const data = [];
    let answerNumber = 0;
    this.props.data.data.forEach((value) => {
      const item = {};
      item.name = value.title;
      item.avg = Math.round(value.avg * 100) / 100;
      item.med = Math.round(value.median * 100) / 100;
      item.mod = Math.round(value.modus * 100) / 100;
      answerNumber += value.values.length;
      data.push(item);
    });
    answerNumber = answerNumber / this.props.data.data.size;
    const columnData = [
      {id: 'name', numeric: false, label: 'Možnost'},
      {id: 'avg', numeric: true, label: 'Průměr'},
      {id: 'med', numeric: true, label: 'Medián'},
      {id: 'mod', numeric: true, label: 'Modus'}
    ]
    return (
      <Paper square>
        <EnhancedTable data={data} columnData={columnData} answerCount={answerNumber}/>
      </Paper>
    );
  }
}
