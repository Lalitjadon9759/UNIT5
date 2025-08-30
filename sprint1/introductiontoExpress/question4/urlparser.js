const url = require("url");

function parseUrl(fullUrl) {
  const parsedUrl = url.parse(fullUrl, true); 
  return {
    hostname: parsedUrl.hostname,
    pathname: parsedUrl.pathname,
    query: parsedUrl.query,
  };
}

module.exports = parseUrl;
