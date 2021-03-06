import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

export default class CollapsibleSection extends Component {
  render() {
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{this.props.sectionTitle}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {this.props.children}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

CollapsibleSection.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  children: PropTypes.object,
};
