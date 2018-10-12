import * as React from 'react';
import { Route } from 'react-router-dom';
import { CandleChartPageHoc } from './components/charts/CandleChartPageHoc';
import { Home } from './components/Home';
import { Layout } from './components/Layout';

export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/candle' component={CandleChartPageHoc} />
</Layout>;
