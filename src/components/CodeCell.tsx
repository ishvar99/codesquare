import React, {useState} from 'react'
import CodeEditor from './CodeEditor'
import Preview from './Preview';
import bundle from '../bundler/bundle';
const CodeCell =()=> {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const onClick=async ()=>{
    setCode('')
    const output =await bundle(input);
    setCode(output);
  }
  return (
    <div>
      <CodeEditor initialValue="const a= 1;" onChange={(e)=>setInput(e)}/>
    <div>
      <button onClick={onClick}>Submit</button>
    </div>
    <Preview code={code}/>
    </div>
  );
}

export default CodeCell;
