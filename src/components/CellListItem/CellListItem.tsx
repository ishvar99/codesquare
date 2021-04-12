import React from 'react'
import {Cell} from '../../redux/cell'
import CodeCell from '../CodeCell/CodeCell'
import TextEditor from '../TextEditor/TextEditor'
interface CellListItemProps{
 cell:Cell
}
const CellListItem: React.FC<CellListItemProps> = ({cell}) => {
 return (
  <div>
   {cell.type==='code'?<CodeCell cell={cell}/>:<TextEditor/>}
  </div>
 )
}

export default CellListItem
