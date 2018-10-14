import { shallow } from 'enzyme';
import * as React from 'react';
import { Footer } from './Footer';

test('Footer component is unchanged.', () => {
    const footer = shallow(<Footer />);

    expect(footer).toMatchSnapshot();
});