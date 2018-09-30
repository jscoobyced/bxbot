import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as RoutesModule from './routes';
import './styles/main.scss';

const routes = RoutesModule.routes;

class Index {
  public renderApp() {
    if(document === null || typeof document === undefined) {
      return;
    }

    const bases = document.getElementsByTagName('base');
    if(bases === null || typeof bases === undefined || bases.length === 0) {
      return;
    }
    
    const baseUrl = bases[0].getAttribute('href')!;
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