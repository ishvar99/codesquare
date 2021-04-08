import React from 'react'
import Editor from '@monaco-editor/react'
const CodeEditor = () => {
 return(
  <Editor theme="vs-dark" options={{
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
