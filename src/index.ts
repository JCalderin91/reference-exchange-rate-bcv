// index.js
const axios = require('axios');
const path = require('path');
const https = require('https');
const rootCas = require('ssl-root-cas').create();
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

rootCas.addFile(path.resolve(__dirname, './intermediate.pem'));
const httpsAgent = new https.Agent({ ca: rootCas });

export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('dev only output');
  }
  return a + b;
};

export const getDollar = (): Promise<number> => {
  return axios
    .get('https://www.bcv.org.ve/', { httpsAgent })
    .then(function ({ data }: { data: string }) {
      var page = new JSDOM(data);
      const pageItem = page.window.document.querySelector(
        '#dolar .centrado'
      ) as HTMLElement;
      const dollar = pageItem?.textContent?.trim().replace(',', '.');
      return Number(dollar);
    })
    .catch(function () {
      return 0;
    });
};
