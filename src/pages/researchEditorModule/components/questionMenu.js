import React,{Component} from 'react';
import {
  MenuContainer,
  Flex,
  MenuList,
  FlexSection,
} from '../../../common/styledComponents/containers';
import {SmallHeading} from '../../../common/styledComponents/typography';
import {MenuListItem} from '../../../common/components/menuListIcons';
import SheetDraggableCard from '../../common/sheetDraggableCard';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getQuestions,
  selectEditorQuestion,
  getQuestionStructure,
  dragQuestionCard,
  remapQuestions,
} from '../../../redux/actions';

class QuestionMenu extends Component {

    componentDidMount() {
        this.props.getQuestions(this.props.activeSheetId);
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.activeSheetId !== this.props.activeSheetId) this.props.getQuestions(nextProps.activeSheetId);
    }

    moveCard = (dragIndex, hoverIndex) => {
      this.props.dragQuestionCard(dragIndex, hoverIndex);
    };

    renderQuestions = () => {
      return this.props.questions.map((question, i) => {
        return (
          <SheetDraggableCard
              index={i}
              key={question.questionId}
              moveCard={this.moveCard}
              onDragEnd={this.props.remapQuestions}
              researchId={this.props.activeSheetId}>
            <MenuListItem
              key={question.questionId}
              sheetId={question.questionId}
              onClick={this.props.getQuestionStructure}
              label={question.title}
              active={!this.props.draggingElement && this.props.activeQuestionId === question.questionId}
              dragging={this.props.draggingElement}
              tooltipLabel="Tažením můžete změnit pořadí otázky"
            />
          </SheetDraggableCard>
        )
      });
    }

    render() {
        if(!this.props.questions) {
          return <SmallHeading>Loading</SmallHeading>
        }
        return (
          <FlexSection autoHeight>
            <Flex column grow>
                <MenuContainer fullWidth>
                  <SmallHeading>Otázky</SmallHeading>
                  <MenuList>
                    {this.renderQuestions()}
                  </MenuList>
                </MenuContainer>
            </Flex>
          </FlexSection>
        );
    }
}



function mapStateToProps({editor, ui, questions}) {
  return {
    activeSheetId: editor.activeSheet ? editor.activeSheet.sheetId : null,
    draggingElement: ui.dragging,
    questions: questions.questions,
    activeQuestionId: questions.activeQuestion ? questions.activeQuestion.questionId : null,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getQuestions,
    selectEditorQuestion,
    getQuestionStructure,
    dragQuestionCard,
    remapQuestions,
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionMenu);
