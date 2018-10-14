import { shallow } from 'enzyme';
import * as React from 'react';
import { Page } from './Page';

test('Page content is preserved', () => {
    const page = shallow(<Page />);
    expect(page).toMatchSnapshot();
});
