const dom = require('jsdom');
const documentHTML = '<!doctype html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0" /><base href="/" />"><title>Title</title></head><html><body><div id="root"></div></body></html>';
global.document = new dom.JSDOM(documentHTML);
global.window = dom.window;