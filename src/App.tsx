import 'bulmaswatch/superhero/bulmaswatch.min.css'
import * as esbuild from 'esbuild-wasm'
import './App.css';
import React, {useState,useEffect,useRef} from 'react'
import {unpkgPathPlugin} from './plugins/unplug-path-plugin'
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/CodeEditor'
import Preview from './components/Preview';
const App =()=> {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const ref= useRef<any>();
  const editorRef = useRef<any>();

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
    setCode('')
    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(),fetchPlugin(input)],
      define:{
        'process.env.NODE_ENV':'"production"',
        global: 'window'
      }
    });
    setCode(result.outputFiles[0].text);
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
