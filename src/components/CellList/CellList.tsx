import React from 'react'
import {useTypedSelector} from '../../hooks/useTypedSelector';
import CellListItem from '../CellListItem/CellListItem';
const CellList: React.FC = () => {
 const cells = useTypedSelector(({ cells: { order, data } }) =>
 order.map((id) => data[id])
);

 return (
  <div>
   {cells.map(cell=><CellListItem cell={cell} key={cell.id}/>)}
  </div>
 )
}

export default CellList
