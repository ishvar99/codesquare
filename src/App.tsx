import * as esbuild from 'esbuild-wasm'
import './App.css';
import React, {useState,useEffect,useRef} from 'react'
import {unpkgPathPlugin} from './plugins/unplug-path-plugin'
const App =()=> {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const ref= useRef<any>();
  useEffect(() => {
    startService();
  }, []);
  const startService =async()=>{
    const service = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    })
    ref.current= service;
  }
  const onClick=async ()=>{
    if(!ref.current){
      return;
    }
    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()],
    });
    setCode(result.outputFiles[0].text);
  }
  return (
    <div>
    <textarea value={input} onChange={(e)=>setInput(e.target.value)}>
    </textarea>
    <div>
      <button onClick={onClick}>Submit</button>
    </div>
    <pre>{code}</pre>
    </div>
  );
}

export default App;
