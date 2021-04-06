import * as esbuild from 'esbuild-wasm';
import localforage from 'localforage';
import axios from 'axios';
export const unpkgPathPlugin = (inputCode: string) => {
  const fileCache =localforage.createInstance({
    name:"fileCache"
  })
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
     // it hijacks esbuild default behaviour for looking a package in local file system
     // resolving index.js file
      build.onResolve({ filter: /(^index\.js$)/ }, async (args: any) => {
        return { path: args.path, namespace: 'a' };
      });
      // includes ./ or ../
      // handling relative paths in module
      build.onResolve({ filter: /^\.+\// }, async (args: any) => {
        return {
          path:new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href, 
          namespace:'a'
        }
      });
      //handling main file of a module
    build.onResolve({ filter: /.*/ }, async (args: any) => {
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
    },
  };
};
