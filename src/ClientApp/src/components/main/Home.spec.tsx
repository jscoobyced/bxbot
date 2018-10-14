import { shallow } from 'enzyme';
import * as React from 'react';
import { Home } from './Home';
import { ContentService } from '../../services/ContentService';

test('Home component is unchanged.', () => {
    const homeContent = new ContentService().defaultContent().homeContent;
    const home = shallow(<Home homeContent={homeContent} />);

    expect(home).toMatchSnapshot();
});