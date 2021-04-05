import * as esbuild from 'esbuild-wasm'
import './App.css';
import React, {useState,useEffect,useRef} from 'react'
function App() {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  useEffect(() => {
    startService();
  }, []);
  const startService =async()=>{
    const service = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    })
    useRef.current= service;
  }
  const onClick=async ()=>{
    if(!useRef.current){
      return;
    }
    const result =await useRef.current.transform(input,{
      loader:"jsx",
      target:"es2015"
    })
    setCode(result.code);
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
