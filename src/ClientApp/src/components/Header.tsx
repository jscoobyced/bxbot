import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { ContentKey } from '../services/ContentKey';
import { ContentService } from '../services/ContentService';

export class Header extends React.Component {

    public render() {
        const websiteName = ContentService.getContent(ContentKey.WebsiteName);
        return <header>
            <img src='/images/wings.svg' className='logo' alt={websiteName + ' logo'} title={websiteName} />
            <span>{websiteName}</span>
            <nav>
                <NavLink to={'/'}>
                    Home
                </NavLink>
                <a href='#' className='menu-space'>&nbsp;</a>
                <a href='#' className='dropdown'>Features</a>
                <div className="dropdown-content">
                <NavLink to={'/candle'}>
                        CandleChart
                    </NavLink>
                    <NavLink to={'/'}>
                        Stuff #1
                    </NavLink>
                    <NavLink to={'/candle'}>
                        Stuff #2
                    </NavLink>
                </div>
                <NavLink to={'/'}>
                    About
                </NavLink>
            </nav>
        </header>;
    }
}