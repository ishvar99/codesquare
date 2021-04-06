import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
     // it hijacks esbuild default behaviour for looking a package in local file system
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);
        if(args.path==='index.js'){
        return { path: args.path, namespace: 'a' };
        }
        if(args.path.includes('./')||args.path.includes('../'))
        {
          console.log("Debug" +new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href)
        return {
        path:new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href, 
        namespace:'a'
      }
        }
        return {
          namespace:'a',
          path:`https://unpkg.com/${args.path}`
        }
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              const message =require('nested-test-pkg');    
              console.log(message);
            `,
          };
        }
        console.log('test' + args.path)
        const {data,request}= await axios.get(args.path);
        return {
         loader: 'jsx',
         contents: data,
         resolveDir: new URL('./',request.responseURL).pathname
       };
        // else {
        //   return {
        //     loader: 'jsx',
        //     contents: 'export default "hi there!"',
        //   };
        // }
      });
    },
  };
};
