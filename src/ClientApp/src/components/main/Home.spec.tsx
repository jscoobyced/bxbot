import { shallow } from 'enzyme';
import * as React from 'react';
import { ContentService } from '../../services/ContentService';
import { Home } from './Home';

test('Home component is unchanged.', () => {
    const homeContent = new ContentService().defaultContent().homeContent;
    const home = shallow(<Home homeContent={homeContent} />);

    expect(home).toMatchSnapshot();
});