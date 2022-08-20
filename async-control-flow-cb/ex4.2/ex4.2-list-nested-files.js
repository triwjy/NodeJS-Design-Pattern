import fs from 'fs';
import path from 'path';

function listNestedFiles(dir, cb) {
  console.log(dir);
  fs.readdir(dir, (err, files) => {
    if (err) return cb(err);
    files.forEach((file) => {
      let fullPath = path.join(dir, file);
      fs.stat(fullPath, (err, stats) => {
        if (err) return cb(err);
        if (stats.isDirectory()) {
          listNestedFiles(fullPath, cb);
        } else {
          console.log(fullPath);
        }
      });
    });
  });
}

const dir = path.join(process.cwd(), '..');
// console.log(dir);
listNestedFiles(dir, (err) => {
  console.error(err);
});
