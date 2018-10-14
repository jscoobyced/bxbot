import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Page } from './Page';
import './styles/main.scss';

export class Index {

  public renderApp() {
    ReactDOM.render(
      <Page />,
      document.getElementById('app-root')
    );
  }

}
new Index().renderApp();
