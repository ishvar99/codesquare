import React,{useRef} from 'react'
import Editor,{Monaco,OnMount} from '@monaco-editor/react'
import monaco from 'monaco-editor';
import prettier, { format } from 'prettier'
import parser from 'prettier/parser-babel'
interface CodeEditorProps{
 initialValue:string,
 onChange:(e:string)=>void
}
const CodeEditor:React.FC<CodeEditorProps> = ({initialValue,onChange}) => {
 const editorRef =useRef<monaco.editor.IStandaloneCodeEditor>();
 const onEditorMount:OnMount=(editor)=>{
  editorRef.current=editor;
  editor.onDidChangeModelContent(()=>{
   console.log(editor.getValue)
   onChange(editor.getValue());
  })
  editor.getModel()?.updateOptions({tabSize:2})
 }
 const onFormat=()=>{
 const unformatted= editorRef.current?.getModel()?.getValue();
 if(!unformatted){
  return;
 }
 const formatted = prettier.format(unformatted,{
  parser:'babel',
  plugins:[parser],
  useTabs:false,
  semi:true,
  singleQuote:true
 })
 editorRef.current?.setValue(formatted);
 }
 return(
  <div>
   <button className='button button-format is-primary is-small' onClick={onFormat}>Format</button>
  <Editor theme="vs-dark" onMount={onEditorMount} value={initialValue} options={{
   wordWrap:'on',
   minimap:{enabled:false},
   showUnused:false,
   folding:false,
   lineNumbersMinChars:3,
   fontSize:16,
   scrollBeyondLastLine:false,
   automaticLayout:true,
  }} language="javascript" height="500px"/>
  </div>
 )
 
 }
export default CodeEditor
