import * as esbuild from 'esbuild-wasm'
import './App.css';
import React, {useState,useEffect,useRef} from 'react'
import {unpkgPathPlugin} from './plugins/unplug-path-plugin'
import { fetchPlugin } from './plugins/fetch-plugin';
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
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
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
      plugins: [unpkgPathPlugin(),fetchPlugin(input)],
      define:{
        'process.env.PRODUCTION':'"production"',
        global: 'window'
      }
    });
    setCode(result.outputFiles[0].text);
  }
  let html =`<script>${code}</script>`
  return (
    <div>
    <textarea value={input} onChange={(e)=>setInput(e.target.value)}>
    </textarea>
    <div>
      <button onClick={onClick}>Submit</button>
    </div>
    <pre>{code}</pre>
    <iframe title="output-frame" sandbox="allow-scripts" srcDoc={html}></iframe> 
    </div>
  );
}

export default App;
