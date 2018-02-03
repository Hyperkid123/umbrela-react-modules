import React,{Component} from 'react';
import {Flex, OptionsFillListWrapper, OrderQuestionItem, OrderQuestionList} from '../../../../common/styledComponents/containers';
import DragHandle from 'material-ui-icons/DragHandle';

export default class OrderPreview extends Component {

    renderOptions = () => {
      return this.props.options.map((option) => {
        return (
          <OrderQuestionItem key={option.optionId}>
            <DragHandle/>
            <span>{option.title}</span>
          </OrderQuestionItem>
        )
      });
    }

    render() {
        return (
          <Flex>
            <OptionsFillListWrapper>
              <OrderQuestionList>
                {this.renderOptions()}
              </OrderQuestionList>
            </OptionsFillListWrapper>
          </Flex>
        );
    }
}
