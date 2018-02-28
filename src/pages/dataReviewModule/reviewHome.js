import React,{Component} from 'react';
import ResearchContainer from './researchContainer';
import OptionsBar from './optionsBar';
import Grid from 'material-ui/Grid';

export default class ReviewHome extends Component {

    render() {
        return (
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <OptionsBar/>
              </Grid>
              <Grid item xs={12}>
                <ResearchContainer/>
              </Grid>
            </Grid>
        );
    }
}
