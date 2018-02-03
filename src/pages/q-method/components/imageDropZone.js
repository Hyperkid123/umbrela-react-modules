import React,{Component} from 'react';
import {Flex} from '../../../common/styledComponents/containers';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import {grey600, grey200, grey300} from 'material-ui/styles/colors';
import Upload from 'material-ui/svg-icons/file/cloud-upload';
import StimulPreview from './stimulPreview';
import {dropImages} from '../../../redux/actions/'

const dropZoneStyle = {
  normal: {
    width: 'auto',
    minHeight: 200,
    borderRadius: 5,
    borderStyle: 'dashed',
    borderColor: grey600,
    padding: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    cursor: 'pointer'
  },
  active: {
    background: `repeating-linear-gradient(
      45deg,
      ${grey200},
      ${grey200} 10px,
      ${grey300} 10px,
      ${grey300} 20px
    )`
  }

}

class ImageDropZone extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        images: []
      };
    }

    onDrop = (files) => {
      this.setState({images: [...this.state.images, ...files]});
    }

    render() {
        return (
            <Flex column grow>
              <Dropzone
                onDrop={this.props.dropImages}
                accept="image/*"
                style={dropZoneStyle.normal}
                activeStyle={dropZoneStyle.active}
              >
                <h2>Přetáhněte soubor obrázku zde nebo klikněte.</h2>
                <Upload/>
              </Dropzone>
              <StimulPreview images={this.props.images}/>
            </Flex>
        );
    }
}

function mapStateToProps({qMethodBuilder}) {
  return {
    images: qMethodBuilder.present.images
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    dropImages
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageDropZone)
