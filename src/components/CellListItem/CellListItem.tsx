import React from 'react'
import {Cell} from '../../redux/cell'
import './CellListItem.css';
import ActionBar from '../ActionBar/ActionBar'
import CodeCell from '../CodeCell/CodeCell'
import TextEditor from '../TextEditor/TextEditor'
interface CellListItemProps{
 cell:Cell
}
const CellListItem: React.FC<CellListItemProps> = ({cell}) => {
 return (
  <div className="cell-list-item">
   {
   cell.type==='code'?
   <>
   <div className='action-bar-wrapper'>
<ActionBar id={cell.id}/>    
</div>
   <CodeCell cell={cell}/>
 </>
   :<div>
    <ActionBar id={cell.id}/>    
    <TextEditor cell={cell}/>
   </div>
}
</div>
 )
}

export default CellListItem
