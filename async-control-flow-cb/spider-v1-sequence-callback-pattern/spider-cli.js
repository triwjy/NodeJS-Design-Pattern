// given a url, download that page

import { spider } from './spider-refactor.js';

spider(process.argv[2], (err, filename, downloaded) => {
  if (err) return console.error(`Error occured: ${err}`);
  if (downloaded) {
    console.log(`Completed the download of "${filename}"`);
  } else {
    console.log(`"${filename}" was already downloaded`);
  }
});
