import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as RoutesModule from './routes';
import { ContentService } from './services/ContentService';
import './styles/main.scss';
import { HtmlUtils } from './utils/HtmlUtils';

const routes = RoutesModule.routes;

export class Index {

  public renderApp() {
    ReactDOM.render(
      <BrowserRouter children={routes} basename={HtmlUtils.baseUrl()} />,
      document.getElementById('app-root')
    );
  }

}

ContentService.init();
new Index().renderApp();
