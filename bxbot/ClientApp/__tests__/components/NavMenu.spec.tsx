import * as React from 'react';
import { shallow, mount, render } from 'enzyme';
import { NavMenu } from '../../components/NavMenu';
import { } from 'jest';

describe('Layout component', () => {
    it('should render without throwing an error', () => {
        expect(shallow(<NavMenu />)
            .exists())
            .toBe(true)
    })

    it('contains a button for screen reader', () => {
        expect(shallow(<NavMenu />)
            .find('button .sr-only').length)
            .toEqual(1)
    })

    it('contains 2 links', () => {
        expect(shallow(<NavMenu />)
            .find('.navbar-nav li').length)
            .toEqual(2)
    })
});