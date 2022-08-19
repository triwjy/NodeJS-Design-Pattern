import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import { urlToFilename } from '../utils.js';

// refactor: early return on error, create named function on save file & download
function saveFile(filename, contents, cb) {
  mkdirp(path.dirname(filename))
    .then(() => fs.writeFile(filename, contents, cb))
    .catch((err) => cb(err));
}

function download(url, filename, cb) {
  console.log(`Downloading ${url} into ${filename}`);
  superagent.get(url).end((err, res) => {
    if (err) return cb(err);
    saveFile(filename, res.text, (err) => {
      if (err) return cb(err);
      console.log(`Downloaded and saved: ${url}`);
      cb(null, res.text);
    });
  });
}

// given a url, download that page
export function spider(url, cb) {
  const filename = urlToFilename(url);
  if (filename instanceof Error) return cb(filename);
  fs.access(filename, (err) => {
    if (!err || err.code !== 'ENOENT') {
      return cb(null, filename, false);
    }
    download(url, filename, (err) => {
      if (err) return cb(err);
      cb(null, filename, true);
    });
  });
}
