import React, {useState,useEffect} from 'react'
import CodeEditor from '../CodeEditor/CodeEditor'
import Preview from '../Preview/Preview';
import bundle from '../../bundler/bundle';
import {useActions} from '../../hooks/useActions'
import Resizable from '../Resizable/Resizable';
import {Cell} from '../../redux/cell'
interface CodeCellProps{
  cell: Cell
}
const CodeCell:React.FC<CodeCellProps> =({cell})=> {
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const {updateCell} = useActions();
  useEffect(() => {
    const timer = setTimeout(async()=>{
      const output =await bundle(cell.content);
      setCode(output.code);
      setErr(output.err)
    },1000)
    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction='vertical'>
    <div style={{height:'100%',display:'flex'}}>
      <Resizable direction='horizontal'>
      <CodeEditor initialValue={cell.content} onChange={(e)=>updateCell(cell.id,e)}/>
      </Resizable>
    <Preview code={code} error={err}/>
    </div>
    </Resizable>
  );
}

export default CodeCell;
