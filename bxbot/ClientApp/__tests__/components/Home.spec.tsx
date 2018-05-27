import * as React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Home } from '../../components/Home';
import { } from 'jest';
import { MockRouterProps } from '../../MockRouterProps';

describe('Home component', () => {
    var routerProps = MockRouterProps.getMockRouterProps<{}>({});
    routerProps.history.block();
    routerProps.history.createHref({});
    routerProps.history.listen(MockRouterProps.listener);
    
    it('should render without throwing an error', () => {
        expect(shallow(<Home match={routerProps.match} history={routerProps.history} location={routerProps.location} />)
            .exists())
            .toBe(true)
    })

    it('contains an <H1> tag', () => {
        expect(shallow(<Home match={routerProps.match} history={routerProps.history} location={routerProps.location} />)
            .find('h1').length)
            .toEqual(1)
    })
});