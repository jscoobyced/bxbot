import { shallow } from 'enzyme';
import * as React from 'react';
import { Header } from './Header';

test('Header component is unchanged.', () => {
    const header = shallow(<Header />);

    expect(header).toMatchSnapshot();
});