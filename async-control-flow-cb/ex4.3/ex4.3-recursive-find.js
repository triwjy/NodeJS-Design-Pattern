import fs from 'fs';
import path from 'path';

function getAllFiles(dir, cb) {
  let result = [];
  fs.readdir(dir, (err, files) => {
    if (err) return cb(err);
    if (files.length === 0) return process.nextTick(cb(null, result));

    let progress = 0;
    files.forEach((file) => {
      let fullPath = path.join(dir, file);
      fs.stat(fullPath, (err, stats) => {
        if (err) return cb(err);
        if (stats.isFile()) {
          result.push(fullPath);
          if (++progress === files.length) return cb(null, result);
        }
        if (stats.isDirectory()) {
          getAllFiles(fullPath, (err, res) => {
            if (err) return cb(err);
            result = result.concat(res);
            if (++progress === files.length) {
              return cb(null, result);
            }
          });
        }
      });
    });
  });
}

function recursiveFind(dir, keyword, cb) {
  let result = [];
  let progress = 0;
  getAllFiles(dir, (err, files) => {
    if (err) return cb(err);
    files.forEach((file) => {
      fs.readFile(file, 'utf-8', (err, data) => {
        if (err) return cb(err);
        if (data.includes(keyword)) {
          result.push(file);
        }
        if (++progress === files.length) {
          return cb(null, result);
        }
      });
    });
  });
}

const dir = path.join(process.cwd(), '..');
// getAllFiles(dir, (err, result) => {
//   if (err) console.error(err);
//   console.log(result);
// });

recursiveFind(dir, 'foo', (err, result) => {
  if (err) console.error(err);
  console.log(result);
});
