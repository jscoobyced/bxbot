import * as React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Layout } from '../../components/Layout';
import { } from 'jest';

describe('Layout component', () => {
    it('should render without throwing an error', () => {
        expect(shallow(<Layout />)
            .exists())
            .toBe(true)
    })

    it('contains the menu', () => {
        expect(shallow(<Layout />)
            .find('.col-sm-1').length)
            .toEqual(1)
    })

    it('contains the children', () => {
        expect(shallow(<Layout />)
            .find('.col-sm-11').length)
            .toEqual(1)
    })
});