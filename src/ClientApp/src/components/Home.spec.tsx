import { shallow } from 'enzyme';
import * as React from 'react';
import { Home } from './Home';

test('Home component is unchanged.', () => {
    const home = shallow(<Home />);

    expect(home).toMatchSnapshot();
});