import * as RoutesModule from '../routes';
import { } from 'jest';
import * as ShallowRenderer from 'react-test-renderer/shallow';

describe('routes', () => {
    const routes = RoutesModule.routes;
    it('should match snapshot', () => {
        const renderer = ShallowRenderer.createRenderer()
        expect(renderer.render(routes)).toMatchSnapshot();
    })
});