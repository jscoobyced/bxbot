import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { HeaderProps } from './Models';

export class Header extends React.Component<HeaderProps> {

    public constructor(props: HeaderProps) {
        super(props);
    }

    public render() {
        return <header>
            <img src='/images/wings.svg' className='logo'
                alt={this.props.navigationMenuContent.websiteName + ' logo'}
                title={this.props.navigationMenuContent.websiteName} />
            <span>{this.props.navigationMenuContent.websiteName}</span>
            <nav>
                <NavLink to={'/'}>
                    {this.props.navigationMenuContent.home}
                </NavLink>
                <a href='#' className='menu-space'>&nbsp;</a>
                <a href='#' className='dropdown'>{this.props.navigationMenuContent.cryptoCurrency}</a>
                <div className="dropdown-content">
                    <NavLink to={'/candle'}>
                        {this.props.navigationMenuContent.candleChart}
                    </NavLink>
                </div>
                <NavLink to={'/'}>
                    {this.props.navigationMenuContent.about}
                </NavLink>
            </nav>
        </header>;
    }
}