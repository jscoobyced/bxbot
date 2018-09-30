import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as RoutesModule from './routes';
import { HtmlUtils } from './utils/HtmlUtils';
import './styles/main.scss';

const routes = RoutesModule.routes;

export class Index {

  public renderApp() {
    ReactDOM.render(
      <BrowserRouter children={routes} basename={HtmlUtils.baseUrl()} />,
      document.getElementById('app-root')
    );
  }

}

new Index().renderApp();
