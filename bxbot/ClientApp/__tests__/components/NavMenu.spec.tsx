import * as React from 'react';
import { shallow, mount, render } from 'enzyme';
import { NavMenu } from '../../components/NavMenu';
import { } from 'jest';
import * as ShallowRenderer from 'react-test-renderer/shallow';

describe('Layout component', () => {
    it('should match snapshot', () => {
        const renderer = ShallowRenderer.createRenderer()
        const navMenu = renderer
            .render(<NavMenu />);
        expect(navMenu).toMatchSnapshot();
    })
});