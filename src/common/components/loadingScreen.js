import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import {Flex} from '../styledComponents/containers';

const LoadingScreen = () => (
    <Flex horizontalCenter grow verticalCenter>
      <CircularProgress size={80} thickness={5} />
    </Flex>
);

export default LoadingScreen;
