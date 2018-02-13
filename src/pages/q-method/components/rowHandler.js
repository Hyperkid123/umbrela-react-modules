import React from 'react';
import {Flex,AddPyramidTile} from '../../../common/styledComponents/containers';
import IconButton from 'material-ui/IconButton'
import Add from 'material-ui-icons/AddCircle';
import Remove from 'material-ui-icons/RemoveCircle';
import Tooltip from 'material-ui/Tooltip';

const RowHandler = ({addRow, removeRow, rows}) => (
  <Flex>
    <Flex horizontalCenter>
      <AddPyramidTile>
        <Tooltip title='Přidat řádedek'>
          <IconButton
            onClick={() => addRow()}
          >
            <Add/>
          </IconButton>
        </Tooltip>
        <Tooltip title='Odebrat poslední řádek'>
          <div>
            <IconButton
              disabled={rows === 1}
              onClick={() => removeRow()}
            >
              <Remove/>
            </IconButton>
          </div>
        </Tooltip>
      </AddPyramidTile>
    </Flex>
    <AddPyramidTile>
    </AddPyramidTile>
  </Flex>
)

export default RowHandler;
