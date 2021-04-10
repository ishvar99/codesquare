import React, {useState,useEffect} from 'react'
import CodeEditor from '../CodeEditor/CodeEditor'
import Preview from '../Preview/Preview';
import bundle from '../../bundler/bundle';
import Resizable from '../Resizable/Resizable';
const CodeCell =()=> {

  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  useEffect(() => {
    const timer = setTimeout(async()=>{
      const output =await bundle(input);
      setCode(output.code);
      setErr(output.err)
    },1000)
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction='vertical'>
    <div style={{height:'100%',display:'flex'}}>
      <Resizable direction='horizontal'>
      <CodeEditor initialValue="const a= 1;" onChange={(e)=>setInput(e)}/>
      </Resizable>
    <Preview code={code} error={err}/>
    </div>
    </Resizable>
  );
}

export default CodeCell;
