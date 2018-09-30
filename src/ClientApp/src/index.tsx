import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as RoutesModule from './routes';
import './styles/main.scss';

const routes = RoutesModule.routes;

class Index {
  public renderApp() {
    if(!document) {
      return;
    }

    const bases = document.getElementsByTagName('base');
    if(!bases || bases.length === 0 || !bases[0]) {
      return;
    }
    
    const baseUrl = bases[0].getAttribute('href');
    if(baseUrl === null || typeof baseUrl === undefined) {
      return;
    }

    ReactDOM.render(
      <BrowserRouter children={routes} basename={baseUrl} />,
      document.getElementById('app-root')
    );
  }

}

new Index().renderApp();