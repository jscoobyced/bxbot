import * as React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Home } from '../../components/Home';
import { } from 'jest';
import * as renderer from 'react-test-renderer';
import { MockRouterProps } from '../../MockRouterProps';

describe('Home component', () => {
    var routerProps = MockRouterProps.getMockRouterProps<{}>({});
    routerProps.history.block();
    routerProps.history.createHref({});
    routerProps.history.listen(MockRouterProps.listener);

    it('should match snapshot', () => {
        const home = renderer
            .create(<Home match={routerProps.match} history={routerProps.history} location={routerProps.location} />)
            .toJSON();
        expect(home).toMatchSnapshot();
    })
});