import fs from 'fs';
import { mockEnable, mockDisable } from './mock-read-file.js';

mockEnable(Buffer.from('this is mocked response'));

fs.readFile('fake-path', (err, data) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(data.toString());
});

mockDisable();
