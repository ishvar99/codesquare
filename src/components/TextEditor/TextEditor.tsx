import React,{useState,useEffect,useRef} from 'react'
import './TextEditor.css'
import {useActions} from '../../hooks/useActions';
import MDEditor from '@uiw/react-md-editor';
import {Cell} from '../../redux/cell'
interface TextEditorProps{
 cell:Cell
}
const TextEditor:React.FC<TextEditorProps> = ({cell}) => {
 const ref= useRef<HTMLDivElement|null>(null);
 const {updateCell}=useActions();
 useEffect(() => {
  const listener = (event:MouseEvent)=>{
   if(ref.current && event.target && ref.current.contains(event.target as Node)){
    return;
   }
   setEditing(false);
  }
  window.addEventListener('click',listener,{capture:true})
  return () => {
   //event capturing
   window.removeEventListener('click',listener,{capture:true})
  }
 }, [])
 const [editing, setEditing] = useState(false)
 if(editing){
  return  <div className='text-editor' ref={ref}>
  <MDEditor onChange={(v)=>updateCell(cell.id,v||'')} value={cell.content}/>
 </div>
 }
 return (
 <div className='text-editor card' onClick={()=>setEditing(true)}>
  <div className='card-content'><MDEditor.Markdown source={cell.content||"Click to edit"}/>
  </div>
  </div>
 )
}

export default TextEditor
