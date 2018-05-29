import { CandleChartPage } from '../../../components/charts/CandleChartPage';
import { MockRouterProps } from '../../../MockRouterProps';
import { } from 'jest';
import * as renderer from 'react-test-renderer';
import * as React from 'react';
import "isomorphic-fetch";

describe('CandleChartPage', () => {
    var routerProps = MockRouterProps.getMockRouterProps<{}>({});
    routerProps.history.block();
    routerProps.history.createHref({});
    routerProps.history.listen(MockRouterProps.listener);

    it('should match snapshot', () => {
        const home = renderer
            .create(<CandleChartPage match={routerProps.match} history={routerProps.history} location={routerProps.location} />)
            .toJSON();
        expect(home).toMatchSnapshot();
    });

    (window as any).JSGoogleChart = (window as any).JSGoogleChart || true;
    it('should draw chart', () => {
        const home = renderer
            .create(<CandleChartPage match={routerProps.match} history={routerProps.history} location={routerProps.location} />)
            .toJSON();
        expect(home).toMatchSnapshot();
    });
});