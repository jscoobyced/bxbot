import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Constants } from '../Models';
import { HeaderProps } from './Models';

export class Header extends React.Component<HeaderProps> {

    public constructor(props: HeaderProps) {
        super(props);
    }

    public render() {
        const logoSrc = `${Constants.ImagePath}/star.png`;
        return <header>
            <img src={logoSrc} className='logo'
                alt={this.props.navigationMenuContent.websiteName + ' logo'}
                title={this.props.navigationMenuContent.websiteName} />
            <span>{this.props.navigationMenuContent.websiteName}</span>
            <nav>
                <ul>
                    <li><NavLink to={'/'}>
                        {this.props.navigationMenuContent.home}
                    </NavLink>
                    </li>
                    <li>
                        <a href='#' className='menu-space'>&nbsp;</a>
                    </li>
                    <li>
                        <a href='#' className='dropdown'>{this.props.navigationMenuContent.cryptoCurrency}</a>
                        <ul>
                            <li>
                                <NavLink to={'/candle'}>
                                    {this.props.navigationMenuContent.candleChart}
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <NavLink to={'/'}>
                            {this.props.navigationMenuContent.about}
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>;
    }
}
