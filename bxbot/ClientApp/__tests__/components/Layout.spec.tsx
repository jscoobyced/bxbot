import * as React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Layout } from '../../components/Layout';
import { } from 'jest';
import * as ShallowRenderer from 'react-test-renderer/shallow';

describe('Layout component', () => {
    it('should match snapshot', () => {
        const renderer = ShallowRenderer.createRenderer()
        const layout = renderer
            .render(<Layout />);
        expect(layout).toMatchSnapshot();
    })
});