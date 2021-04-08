import * as esbuild from 'esbuild-wasm';
export const unpkgPathPlugin = () => {
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
    },
  };
};
