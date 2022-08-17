// example of API that behaves synchronously under certain conditions and asynchronously under others.
import { readFileSync } from 'fs';

const cache = new Map();

function consistentRead(filename) {
  if (cache.has(filename)) {
    // invoked synchronously
    return cache.get(filename);
  } else {
    // async function
    const data = readFileSync(filename, 'utf8');
    cache.set(filename, data);
    return data;
  }
}

function createFileReader(filename, listener) {
  const data = consistentRead(filename);
  listener(data);
}

const reader1 = (value) => console.log(`Reader 1: ${value}`);
createFileReader('data.txt', reader1);
