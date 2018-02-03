import React from 'react';
import {Flex,AddPyramidTile} from '../../../common/styledComponents/containers';
import IconButton from 'material-ui/IconButton'
import Add from 'material-ui/svg-icons/content/add-circle';
import Remove from 'material-ui/svg-icons/content/remove-circle';
import {grey600} from 'material-ui/styles/colors';

const RowHandler = ({addRow, removeRow, rows}) => (
  <Flex>
    <Flex horizintalCenter>
      <AddPyramidTile>
        <IconButton
          tooltip='Přidat řádedk'
          tooltipPosition="bottom-center"
          onClick={() => addRow()}
        >
          <Add color={grey600}/>
        </IconButton>
        <IconButton
          tooltip='Odebrat poslední řádek'
          tooltipPosition="bottom-center"
          disabled={rows === 1}
          onClick={() => removeRow()}
        >
          <Remove color={grey600}/>
        </IconButton>
      </AddPyramidTile>
    </Flex>
    <AddPyramidTile>
    </AddPyramidTile>
  </Flex>
)

export default RowHandler;
