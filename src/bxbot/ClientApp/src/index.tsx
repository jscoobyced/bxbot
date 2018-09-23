import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as RoutesModule from './routes';
import './styles/main.scss';

const routes = RoutesModule.routes;

class Index {
  public renderApp() {
    const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;
    ReactDOM.render(
      <BrowserRouter children={routes} basename={baseUrl} />,
      document.getElementById('app-root')
    );
  }

}

new Index().renderApp();