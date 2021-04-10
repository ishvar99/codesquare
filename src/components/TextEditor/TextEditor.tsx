import React,{useState,useEffect,useRef} from 'react'
import './TextEditor.css'
import MDEditor from '@uiw/react-md-editor';
const TextEditor = () => {
 const ref= useRef<HTMLDivElement|null>(null);
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
  <MDEditor/>
 </div>
 }
 return (
 <div className='text-editor' onClick={()=>setEditing(true)}><MDEditor.Markdown source={'# Header'}/></div>
 )
}

export default TextEditor
