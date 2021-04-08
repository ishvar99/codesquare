import React from 'react'
import Editor,{Monaco} from '@monaco-editor/react'
import monaco from 'monaco-editor';
interface CodeEditorProps{
 initialValue:string,
 onChange(e:string):void
}
const CodeEditor:React.FC<CodeEditorProps> = ({initialValue,onChange}) => {
 const onEditorMount=(editor:monaco.editor.IStandaloneCodeEditor,monaco:Monaco)=>{
  editor.onDidChangeModelContent(()=>{
   console.log(editor.getValue());
   onChange(editor.getValue());
  })
 }
 return(
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
 )
}

export default CodeEditor
