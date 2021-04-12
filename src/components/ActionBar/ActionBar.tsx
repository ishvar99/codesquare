import React from 'react'
import {useActions} from '../../hooks/useActions';
interface ActionBarProps{
 id:string
}
const ActionBar:React.FC<ActionBarProps> = ({id}) => {
 const {moveCell,deleteCell} =useActions();
 return (
  <div>
   <button onClick={(e)=>moveCell(id,'up')}>Up</button>
   <button onClick={(e)=>moveCell(id,'down')}>Down</button>
   <button onClick={(e)=>deleteCell(id)}>Delete</button>
  </div>
 )
}

export default ActionBar
