import React from 'react';
import {Flex, AddPyramidTile} from '../../../common/styledComponents/containers'
import PyramidBlock from './pyramidBlock';
import IconButton from 'material-ui/IconButton'
import Add from 'material-ui-icons/AddCircle';
import Remove from 'material-ui-icons/RemoveCircle';
import Tooltip from 'material-ui/Tooltip';

const PyramidRow = ({blocks, changeTiles, rowIndex}) => (
  <Flex>
    <Flex grow horizontalCenter>
      {Array(blocks).fill().map((block, iterator) => <PyramidBlock key={iterator}/>)}
    </Flex>
    <AddPyramidTile>
      <Tooltip title='Přidat blok'>
        <IconButton
          id={`increase-blocks-${rowIndex}`}
          onClick={() => changeTiles(blocks + 1, rowIndex)}
        >
          <Add/>
        </IconButton>
      </Tooltip>
      <Tooltip title='Odebrat blok'>
        <div>
          <IconButton
            id={`decrease-blocks-${rowIndex}`}
            disabled={blocks === 1}
            onClick={() => changeTiles(blocks - 1, rowIndex)}
          >
            <Remove/>
          </IconButton>
        </div>
      </Tooltip>
    </AddPyramidTile>
  </Flex>
)

export default PyramidRow;
