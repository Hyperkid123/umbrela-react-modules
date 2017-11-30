import React from 'react';
import {
  Flex,
  LabelContainer,
} from '../styledComponents/containers';

export const TextFieldComent = ({label, alignRight, error}) => (
  <LabelContainer alignRight error={error}>
    {label}
  </LabelContainer>
);
