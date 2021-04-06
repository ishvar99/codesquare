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
   const result:esbuild.OnLoadResult = {
     loader: 'jsx',
     contents: data,
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