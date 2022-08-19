import path from 'path';
import { URL } from 'url';
import slug from 'slug';
import { load as cheerioLoad } from 'cheerio';

// convert url to foler path on host machine
export function urlToFilename(url) {
  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch (error) {
    return error;
  }
  const urlPath = parsedUrl.pathname
    .split('/')
    .filter((component) => component !== '')
    .map((component) => slug(component, { remove: null }))
    .join('/');

  let filename = path.join(parsedUrl.hostname, urlPath);
  if (!path.extname(filename).match(/htm/)) {
    filename += '.html';
  }

  return filename;
}

// only return link pointing to internal destination
function getLinkUrl(currentUrl, element) {
  const parsedLink = new URL(element.attribs.href || '', currentUrl);
  const currentParsedUrl = new URL(currentUrl);
  if (parsedLink.hostname !== currentParsedUrl.hostname || !parsedLink.pathname)
    return null;
  return parsedLink.toString();
}

// function to get all links from anchor tag
export function getPageLinks(currentUrl, body) {
  return Array.from(cheerioLoad(body)('a'))
    .map((element) => getLinkUrl(currentUrl, element))
    .filter(Boolean);
}
