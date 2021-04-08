import 'bulmaswatch/superhero/bulmaswatch.min.css'

import './App.css';
import React, {useState,useEffect,useRef} from 'react'

import CodeEditor from './components/CodeEditor'
import Preview from './components/Preview';
import bundle from './bundler/bundle';
const App =()=> {
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

export default App;
