import fs from 'fs';

function readfiles(srcFiles, index, content, cb) {
  if (index === srcFiles.length) {
    return cb(null, content);
  }
  return fs.readFile(srcFiles[index], 'utf8', (err, data) => {
    if (err) {
      return cb(err);
    }
    console.log(`Reading content from ${srcFiles[index]}`);
    readfiles(srcFiles, index + 1, content + data, cb);
  });
}

function concatFiles(srcFiles, destFile, cb) {
  readfiles(srcFiles, 0, '', (err, content) => {
    if (err) {
      return cb(err);
    }
    fs.writeFile(destFile, content, () => {
      return cb(null, destFile);
    });
  });
}

concatFiles(
  ['foo.txt', 'life.txt', 'bar.txt'],
  'result.txt',
  (err, filename) => {
    if (err) {
      return console.error(`Error: ${err}`);
    }
    console.log(`Finished concatenation to ${filename}`);
  }
);
