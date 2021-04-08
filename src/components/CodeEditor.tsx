import './CodeEditor.css'
import './syntax.css'
import React,{useRef} from 'react'
import Editor,{Monaco,OnMount} from '@monaco-editor/react'
import monaco from 'monaco-editor';
import prettier, { format } from 'prettier'
import parser from 'prettier/parser-babel'
import codeShift from 'jscodeshift'
import Highlighter from 'monaco-jsx-highlighter';

interface CodeEditorProps{
 initialValue:string,
 onChange:(e:string)=>void
}
const CodeEditor:React.FC<CodeEditorProps> = ({initialValue,onChange}) => {
 const editorRef =useRef<monaco.editor.IStandaloneCodeEditor>();
 const onEditorMount:OnMount=(editor)=>{
  editorRef.current=editor;
  editor.onDidChangeModelContent(()=>{
   // console.log(editor.getValue)
   onChange(editor.getValue());
  })
  editor.getModel()?.updateOptions({tabSize:2})
  const highlighter=new Highlighter(
   //@ts-ignore
   window.monaco,
   codeShift,
   editor
  )
  highlighter.highLightOnDidChangeModelContent(
   ()=>{},
   ()=>{},
   undefined,
   ()=>{}
  )
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
 }).replace(/\n$/,'');
 editorRef.current?.setValue(formatted);
 }
 return(
  <div className='editor-wrapper'>
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
