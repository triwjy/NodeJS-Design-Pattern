// example of API that behaves synchronously under certain conditions and asynchronously under others.
import { readFile } from 'fs';

const cache = new Map();

function inconsistentRead(filename, cb) {
  if (cache.has(filename)) {
    // invoked synchronously
    cb(cache.get(filename));
  } else {
    // async function
    readFile(filename, 'utf8', (err, data) => {
      cache.set(filename.data);
      cb(data);
    });
  }
}

function createFileReader(filename) {
  const listeners = [];
  inconsistentRead(filename, (value) => {
    listeners.forEach((listener) => listener(value));
  });
  return {
    onDataReady: (listener) => listeners.push(listener),
  };
}

const reader1 = createFileReader('data.txt');
reader1.onDataReady((data) => console.log(`First call data: ${data}`));

// setTimeout(() => console.log('pause a while'), 1);

const reader2 = createFileReader('data.txt');
reader2.onDataReady((data) => console.log(`Second call data: ${data}`));
