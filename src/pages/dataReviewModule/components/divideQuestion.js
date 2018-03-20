import React,{Component} from 'react';
import EnhancedTable from './sortableTable/enhancedTable';
import Paper from 'material-ui/Paper';
import { localize } from 'react-localize-redux';

export class DivideQuestion extends Component {

  render() {
    const {translate} = this.props;
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
      {id: 'name', numeric: false, label: translate('review.divideAttributes.option')},
      {id: 'avg', numeric: true, label: translate('review.divideAttributes.avg')},
      {id: 'med', numeric: true, label: translate('review.divideAttributes.median')},
      {id: 'mod', numeric: true, label: translate('review.divideAttributes.modus')}
    ]
    return (
      <Paper square>
        <EnhancedTable footerTitle={translate('review.numberOfResponses')} data={data} columnData={columnData} answerCount={answerNumber}/>
      </Paper>
    );
  }
}

export default localize(DivideQuestion, 'locale');
