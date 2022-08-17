const myModule = (() => {
  const privateFoo = () => {};
  const privateBar = [];

  const exported = {
    publicFoo: () => {},
    publicBar: () => {},
  };

  return exported;
})();
console.log(myModule);
console.log(myModule.privateBar, myModule.privateFoo);
