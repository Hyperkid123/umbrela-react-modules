import React from 'react';
import Routes from './routes';
import '../../common/globalStyles';
import DNDContext from '../../common/components/dndContext';

const FillModule = () => (
  <DNDContext>
    <Routes/>
  </DNDContext>
)

export default FillModule;
