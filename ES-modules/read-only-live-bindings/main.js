import { count, increment } from './counter.js';
import { result } from './add.js';

console.log(count);
increment();
console.log(count);
// count++;

// count inside result reset back to zero
console.log(result);
