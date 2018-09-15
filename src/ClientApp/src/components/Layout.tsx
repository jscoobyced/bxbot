import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div>
            <div>
                <NavLink to={'/'}>
                    Home
                </NavLink> |&nbsp;
                <NavLink to={'/candle'}>
                    CandleChart
                </NavLink>
            </div>
            {this.props.children}
        </div>;
    }
}
