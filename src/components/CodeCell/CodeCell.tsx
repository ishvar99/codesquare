import React, {useState} from 'react'
import CodeEditor from '../CodeEditor/CodeEditor'
import Preview from '../Preview/Preview';
import bundle from '../../bundler/bundle';
import Resizable from '../Resizable/Resizable';
const CodeCell =()=> {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const onClick=async ()=>{
    setCode('')
    const output =await bundle(input);
    setCode(output);
  }
  return (
    <Resizable direction='vertical'>
    <div style={{height:'100%',display:'flex'}}>
      <Resizable direction='horizontal'>
      <CodeEditor initialValue="const a= 1;" onChange={(e)=>setInput(e)}/>
      </Resizable>
    <Preview code={code}/>
    </div>
    </Resizable>
  );
}

export default CodeCell;
