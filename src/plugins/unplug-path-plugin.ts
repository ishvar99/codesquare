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
        
        return {path:`https://unpkg.com/${args.path}`,namespace:'a'}
        
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import message from 'tiny-test-pkg';    
              console.log(message);
            `,
          };
        } 
        const {data}= await axios.get('https://unpkg.com/tiny-test-pkg@1.0.0/index.js');
        return {
         loader: 'jsx',
         contents: `
           import message from 'tiny-test-pkg';    
           console.log(message);
         `,
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
