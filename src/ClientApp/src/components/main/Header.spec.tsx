import { shallow } from 'enzyme';
import * as React from 'react';
import { Header } from './Header';
import { ContentService } from '../../services/ContentService';

test('Header component is unchanged.', () => {
    const navigationMenuContent = new ContentService().defaultContent().navigationMenuContent;
    const header = shallow(<Header navigationMenuContent={navigationMenuContent} />);

    expect(header).toMatchSnapshot();
});