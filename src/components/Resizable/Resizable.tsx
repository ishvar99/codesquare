import { ResizableBox } from 'react-resizable';
import React from 'react'
import './Resizable.css'
interface ResizableProps{
 direction: 'horizontal'|'vertical'
}
const Resizable:React.FC<ResizableProps> = ({direction, children}) => {
 return (
  <ResizableBox 
  width={Infinity} 
  height={200} 
  draggableOpts={{}}
  minConstraints={[100, 100]}
   maxConstraints={[300, 300]}
   resizeHandles={['s']}>
  
    {children}
  </ResizableBox>
);
}

export default Resizable
