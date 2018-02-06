import React from 'react';
import {Flex, AddPyramidTile} from '../../../common/styledComponents/containers'

const PyramidDescription = () => (
  <Flex>
    <Flex grow horizintalCenter verticalCenter>
      <span>
        Náhled rozdělení stimulů
      </span>
    </Flex>
    <AddPyramidTile>
      <span>
        Přidat nebo odebrat pole
      </span>
    </AddPyramidTile>
  </Flex>
)

export default PyramidDescription;
