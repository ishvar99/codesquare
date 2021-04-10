import React,{useState,useEffect} from 'react'
import MDEditor from '@uiw/react-md-editor';
const TextEditor = () => {
 useEffect(() => {
  const listener = ()=>{
   setEditing(false);
  }
  window.addEventListener('click',listener,{capture:true})
  return () => {
   //event bubbling
   window.removeEventListener('click',listener,{capture:true})
  }
 }, [])
 const [editing, setEditing] = useState(false)
 if(editing){
  return  <div>
  <MDEditor/>
 </div>
 }
 return (
 <div onClick={()=>setEditing(true)}><MDEditor.Markdown source={'# Header'}/></div>
 )
}

export default TextEditor
