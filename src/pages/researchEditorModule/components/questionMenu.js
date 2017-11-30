import React,{Component} from 'react';
import {
  MenuContainer,
  Flex,
  MenuList,
  FlexSection,
} from '../../../common/styledComponents/containers';
import {SmallHeading} from '../../../common/styledComponents/typography';
import {MenuListItem} from '../../../common/components/menuListIcons';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import ActionAdd from 'material-ui/svg-icons/content/add';
import SheetDraggableCard from './sheetDraggableCard';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ReactTooltip from 'react-tooltip';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getQuestions,
  selectEditorQuestion,
  getQuestionStructure,
} from '../../../redux/actions';

class QuestionMenu extends Component {

    componentDidMount() {
        this.props.getQuestions(this.props.activeSheetId);
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.activeSheetId !== this.props.activeSheetId) this.props.getQuestions(nextProps.activeSheetId);
    }

    moveCard = (dragIndex, hoverIndex) => {
      console.log(`moving questions ${dragIndex}, ${hoverIndex}`);
    };

    renderQuestions = () => {
      return this.props.questions.map((question, i) => {
        return (
          <li key={question.questionId}>
            <MenuListItem
              key={question.questionId}
              sheetId={question.questionId}
              onClick={this.props.getQuestionStructure}
              label={question.title}
              active={!this.props.draggingElement && this.props.activeQuestionId === question.questionId}
              dragging={this.props.draggingElement}
              tooltipLabel="Tažením můžete změnit pořadí otázky"
            />
          </li>
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
              {!this.props.draggingElement ? <ReactTooltip place="right" effect="solid" type="info" delayShow={800}/> : null}
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
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionMenu);
