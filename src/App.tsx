import * as esbuild from 'esbuild-wasm'
import './App.css';
import React, {useState,useEffect,useRef} from 'react'
import {unpkgPathPlugin} from './plugins/unplug-path-plugin'
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/CodeEditor'
const App =()=> {
  const [input, setInput] = useState('');
  const ref= useRef<any>();
  const iframe = useRef<any>();
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
    iframe.current.srcdoc=html;
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
    //indirect communication from the parent to child
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text,'*')
    // * refers to all domains
  }
  let html =`<html>
  <head>
  </head>
  <body>
  <div id="root">
  </div>
  <script>
  window.addEventListener('message',(event)=>{
    try{
    eval(event.data)
    }catch(err){
      const root =document.querySelector('#root')
      root.innerHTML='<div style="color:red;"><h4>Runtime Error</h4>' +err+ '</div>'
    }
  },false)
  </script>
  </body>
  </html>`
  return (
    <div>
      <CodeEditor initialValue="const a= 1;" onChange={(e)=>setInput(e)}/>
    <div>
      <button onClick={onClick}>Submit</button>
    </div>
    <iframe ref={iframe} title="preview" sandbox="allow-scripts" srcDoc={html}></iframe> 
    </div>
  );
}

export default App;
