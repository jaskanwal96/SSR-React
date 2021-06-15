import { renderToString } from 'react-dom/server.js';
/*
  renderToString works similarly to the render we know, 
  but instead of rendering to the DOM,
  it renders the HTML as string.
*/

import express from 'express';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.set('view engine', 'pug');
app.use('/', express.static(path.join(__dirname, 'dist')));

/*
    We’re creating a new express server instance, and letting it know we want to use the pug template engine. 
    We could get away with reading the file and doing a search & replace, but that’s really ineffective and 
    can cause issues with multiple access to the file system or caching issues.
    In the last line, we’re instructing express to look for file in the dist folder, 
    and if a request (e.g. /bundle.js) matches a file, that is present in that folder, reply with it.
*/
import renderReact from './renderReact.js';
renderReact(app);
/*
    Now in turn we ask express to add a handler for any unmatched URL — this includes our 
    non-existing index.html file (remember, we renamed it to index.pug and also it’s not 
    available in the dist folder).
    Using renderToString we render our application. This code looks exactly like our entry point,
    but it does not have to.
    Once we have the rendered HTML, we tell express to respond by rendering the index.pug file,
    and replacing the app variable, with the HTML we received.
*/
app.listen(3000, () => console.log('listening on port 3000'));