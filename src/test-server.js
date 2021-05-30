import http from 'http';
import fs from 'fs';
import puppeteer from 'puppeteer';
import config from './config.js';

// ES Modules require a server, serve a page to allow tests to run.
const server = http.createServer((req, res) => {
  let type, path;

  if (req.url.endsWith('.js')) {
    type = 'application/javascript';
    path = `.${req.url}`;
  } else {
    type = 'text/html; charset=UTF-8';
    path = './src/test-loader.html';
  }

  res.writeHead(200, { 'content-type': type });
  fs.createReadStream(path).pipe(res);
});

server.listen(config.PORT);

async function runTests() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', (msg) => console.log(msg.text()));

  await page.goto(`http://localhost:${config.PORT}`);

  await browser.close();
  server.close();
}
runTests();
