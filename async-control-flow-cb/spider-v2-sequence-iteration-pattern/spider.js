// given a url, extract all the links from the page, and trigger the spider recursively

import { getPageLinks, urlToFilename } from '../utils.js';
import fs from 'fs';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import path from 'path';

function download(url, filename, cb) {
  console.log(`Downloading ${url}`);
  // fetch data from url
  superagent.get(url).end((err, res) => {
    if (err) {
      return cb(err);
    }
    // save file
    saveFile(filename, res.text, (err) => {
      if (err) {
        return cb(err);
      }
      console.log(`Downloaded and saved: ${url}`);
      cb(null, res.text);
    });
  });
}

function saveFile(filename, contents, cb) {
  // create folder structure
  mkdirp(path.dirname(filename))
    .then(() => fs.writeFile(filename, contents, cb))
    .catch((err) => cb(err));
}

function spiderLinks(currentUrl, body, nesting, cb) {
  if (nesting === 0) {
    return process.nextTick(cb);
  }

  const links = getPageLinks(currentUrl, body);
  if (links.length === 0) {
    return process.nextTick(cb);
  }

  // function to iterate from 0 to nesting level
  function iterate(index) {
    if (index === links.length) {
      return cb();
    }

    spider(links[index], nesting - 1, function (err) {
      if (err) {
        return cb(err);
      }
      iterate(index + 1);
    });
  }
  // bootstrap the iteration
  iterate(0);
}

export function spider(url, nesting, cb) {
  // try to convert url to folder path
  const filename = urlToFilename(url);
  if (filename instanceof Error) return cb(filename);

  fs.readFile(filename, 'utf8', (err, fileContent) => {
    if (err) {
      if (err.code !== 'ENOENT') {
        return cb(err);
      }
      // error type "ENOENT": file not exist yet then proceed to download the file
      return download(url, filename, (err, requestContent) => {
        if (err) {
          return cb(err);
        }
        spiderLinks(url, requestContent, nesting, cb);
      });
    }

    // file already exist, process the links
    spiderLinks(url, fileContent, nesting, cb);
  });
}
