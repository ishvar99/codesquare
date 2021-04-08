import React from 'react'
import Editor from '@monaco-editor/react'
const CodeEditor = () => {
 return(
  <Editor theme="vs-dark" options={{
   wordWrap:'on',
  }} language="javascript" height="500px"/>
 )
}

export default CodeEditor
