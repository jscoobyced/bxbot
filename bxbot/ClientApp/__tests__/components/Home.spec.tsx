import * as React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Home } from '../../components/Home';
import { } from 'jest';
import { RouteComponentProps } from 'react-router';
import { match } from 'react-router-dom';
import { UnregisterCallback, Href } from 'history';

function getMockRouterProps<P>(data: P) {

    let location = {
        hash: "",
        key: "",
        pathname: "",
        search: "",
        state: {}
    };

    let props: RouteComponentProps<P> = {
        match: {
            isExact: true,
            params: data,
            path: "",
            url: ""
        },
        location: location,
        history: {
            length: 2,
            action: "POP",
            location: location,
            push: () => { },
            replace: () => { },
            go: (num) => { },
            goBack: () => { },
            goForward: () => { },
            block: (t) => {
                let temp: UnregisterCallback = () => { };
                return temp;
            },
            createHref: (t) => {
                var temp: Href = "";
                return temp;
            },
            listen: (t) => {
                let temp: UnregisterCallback = () => { };
                return temp;
            }

        },
        staticContext: {
        }
    };

    return props;
}

describe('Home component', () => {
    var routerProps = getMockRouterProps<{}>({});
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