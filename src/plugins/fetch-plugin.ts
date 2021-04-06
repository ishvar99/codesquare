import esbuild from 'esbuild-wasm';
import localforage from 'localforage'
import axios from 'axios'
export const fetchPlugin=(inputCode:string)=>{
const fileCache= localforage.createInstance({
  name:'fileCache'
 })
 return {
  name:'fetch-plugin',
  setup(build:esbuild.PluginBuild){
  build.onLoad({ filter: /.*/ }, async (args: any) => {
   console.log('onLoad', args);

   if (args.path === 'index.js') {
     return {
       loader: 'jsx',
       contents:inputCode,
     };
   }
   const cachedResult =await fileCache.getItem<esbuild.OnLoadResult>(args.path);
   if(cachedResult)
   return cachedResult;
   const {data,request}= await axios.get(args.path);
   const fileType = args.path.match(/.css$/)? 'css':'jsx'
   const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
   const contents = 
   fileType==='css'?
   `const style =document.createElement('style');
   style.innerText='${escaped}'; 
   document.head.appendChild(style);`
   :data;
   const result:esbuild.OnLoadResult = {
     loader: 'jsx',  
     //loader: css ,will not work as it needs to store the outfile on the local device
     contents,
     resolveDir: new URL('./',request.responseURL).pathname
   }
   await fileCache.setItem(args.path,result);
   return result;
   // else {
   //   return {
   //     loader: 'jsx',
   //     contents: 'export default "hi there!"',
   //   };
   // }
 });
  }
 }
}