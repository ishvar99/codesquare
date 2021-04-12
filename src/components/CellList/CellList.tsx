import React from 'react'
import {useTypedSelector} from '../../hooks/useTypedSelector';
const CellList: React.FC = () => {
 const cells = useTypedSelector(({ cells: { order, data } }) =>
 order.map((id) => data[id])
);
 return (
  <div>
   Cell List
  </div>
 )
}

export default CellList
