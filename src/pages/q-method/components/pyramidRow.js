import React from 'react';
import {Flex, AddPyramidTile} from '../../../common/styledComponents/containers'
import PyramidBlock from './pyramidBlock';
import IconButton from 'material-ui/IconButton'
import Add from 'material-ui/svg-icons/content/add-circle';
import Remove from 'material-ui/svg-icons/content/remove-circle';
import {grey600} from 'material-ui/styles/colors';

const PyramidRow = ({blocks, changeTiles, rowIndex}) => (
  <Flex>
    <Flex grow horizintalCenter>
      {Array(blocks).fill().map((block, iterator) => <PyramidBlock key={iterator}/>)}
    </Flex>
    <AddPyramidTile>
      <IconButton
        tooltip='Přidat blok'
        tooltipPosition="bottom-center"
        onClick={() => changeTiles(blocks + 1, rowIndex)}
      >
        <Add color={grey600}/>
      </IconButton>
      <IconButton
        tooltip='Odebrat blok'
        tooltipPosition="bottom-center"
        disabled={blocks === 1}
        onClick={() => changeTiles(blocks - 1, rowIndex)}
      >
        <Remove color={grey600}/>
      </IconButton>
    </AddPyramidTile>
  </Flex>
)

export default PyramidRow;
