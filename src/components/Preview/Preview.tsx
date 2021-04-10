import React,{useRef,useEffect} from 'react'
import './Preview.css'
interface PreviewProps{
 code: string
}
let html =`<html>
<head>
<style>
html{background-color: white}
</style>
</head>
<body>
<div id="root">
</div>
<script>
const handleError=(err)=>{
  const root =document.querySelector('#root')
  root.innerHTML='<div style="color:red;"><h4>Runtime Error</h4>' +err+ '</div>'
  console.error(err);
}
window.addEventListener('error',(event)=>{
  event.preventDefault();
  handleError(event.error);
})
window.addEventListener('message',(event)=>{
  try{
  eval(event.data)
  }catch(err){
  handleError(err);
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
  setTimeout(()=>{
    iframe.current.contentWindow.postMessage(code,'*')
  },50)

 }, [code]);
 const iframe = useRef<any>();
 return (
   <div className='preview-wrapper'>
  <iframe ref={iframe} title="preview" sandbox="allow-scripts" srcDoc={html}></iframe>
  </div>
 )
}

export default Preview
