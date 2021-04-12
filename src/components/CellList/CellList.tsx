import React, { Fragment } from 'react'
import {useTypedSelector} from '../../hooks/useTypedSelector';
import AddCell from '../AddCell/AddCell';
import CellListItem from '../CellListItem/CellListItem';
const CellList: React.FC = () => {
 const cells = useTypedSelector(({ cells: { order, data } }) =>
 order.map((id) => data[id])
);
const renderedCells= cells.map((cell)=>
<Fragment key={cell.id}>
 <CellListItem cell={cell} key={cell.id}/>
 <AddCell previousCellId={cell.id}/>
 </Fragment>)
 return ( 
    <div>
      <AddCell forceVisible={cells.length===0} previousCellId={null}/>
     {renderedCells}
    </div>
 )
}

export default CellList
