// a function that loads the content of a module, wraps it into a private scope, and evaluates it
function loadModule(filename, module, require) {
  const wrappedSrc = `(function (module, exports, require) {
    ${fs.readFileSync(filename, 'utf8')}
  })(module, module.exports, require)`;
  eval(wrappedSrc);
}

function require(moduleName) {
  console.log(`Require invoked for module: ${moduleName}`);
  const id = require.resolve(moduleName);
  if (require.cache[id]) {
    return require.cache[id].exports;
  }
  // module metadata
  const module = {
    exports: {},
    id,
  };
  // update cache
  require.cache[id] = module;
  // load the module
  loadModule(id, module, require);
  // return the exported variables
  return module.exports;
}
require.cache = {};
require.resolve = (moduleName) => {
  // resolve a full module id from the moduleName
  // 1. file modules
  // 2. core modules
  // 3. package modules
};
