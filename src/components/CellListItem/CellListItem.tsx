import React from 'react'
import {Cell} from '../../redux/cell'
import ActionBar from '../ActionBar/ActionBar'
import CodeCell from '../CodeCell/CodeCell'
import TextEditor from '../TextEditor/TextEditor'
interface CellListItemProps{
 cell:Cell
}
const CellListItem: React.FC<CellListItemProps> = ({cell}) => {
 return (
  <div>
   <ActionBar id={cell.id}/>
   {cell.type==='code'?<CodeCell cell={cell}/>:<TextEditor cell={cell}/>}
  </div>
 )
}

export default CellListItem
