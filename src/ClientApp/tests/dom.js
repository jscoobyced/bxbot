const dom = require('jsdom');
const documentHTML = '<!doctype html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0" /><base href="/" />"><title>Title</title></head><html><body><div id="root"></div></body></html>';
global.document = new dom.JSDOM(documentHTML);
global.window = dom.window;
const dataTable = {
    addColumn: jest.fn(),
    addRow: jest.fn()
}

const comboChart = {
    draw: jest.fn()
}

global.window.google = {
    visualization: {
        DataTable: jest.fn().mockImplementation(() => dataTable),
        ComboChart: jest.fn().mockImplementation(() => comboChart)
    }
};