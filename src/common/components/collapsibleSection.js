import React,{Component} from 'react';
import {SectionBody, Sectionhead} from '../styledComponents/containers';
import PropTypes from 'prop-types';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import NavigationExpandLessIcon from 'material-ui/svg-icons/navigation/expand-less';

export default class CollapsibleSection extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClick = () => {
    this.setState({open: !this.state.open});
  }

  render() {
    return (
            <div className="class-name">
                <Sectionhead onClick={this.handleClick}>
                  <Toolbar>
                    <ToolbarGroup>
                      <ToolbarTitle text={this.props.sectionTitle}/>
                    </ToolbarGroup>
                    <ToolbarGroup>
                      <IconButton tooltip={this.state.open ? 'close' : 'expand'}>
                        {this.state.open ? <NavigationExpandLessIcon/> : <NavigationExpandMoreIcon/>}
                      </IconButton>
                    </ToolbarGroup>
                  </Toolbar>
                </Sectionhead>
                <SectionBody open={this.state.open}>
                <div>
                  {this.props.children}
                </div>
                </SectionBody>
            </div>
    );
  }
}

CollapsibleSection.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  children: PropTypes.object,
};
