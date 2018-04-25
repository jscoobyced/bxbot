import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { CandleChartPage } from './components/charts/CandleChartPage';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/candle' component={ CandleChartPage } />
</Layout>;
