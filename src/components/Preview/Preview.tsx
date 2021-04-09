import React,{useRef,useEffect} from 'react'
import './Preview.css'
interface PreviewProps{
 code: string
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
const Preview: React.FC<PreviewProps> = ({code}) => {
 useEffect(() => {
  iframe.current.srcdoc=html;
  //indirect communication from the parent to child
  // * refers to all domains
  iframe.current.contentWindow.postMessage(code,'*')
 }, [code]);
 const iframe = useRef<any>();
 return (
   <div className='preview-wrapper'>
  <iframe ref={iframe} title="preview" sandbox="allow-scripts" srcDoc={html}></iframe>
  </div>
 )
}

export default Preview
