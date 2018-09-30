import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Footer } from './Footer';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps> {
    public render() {
        return <div>
            <main>
                <NavLink to={'/'}>
                    Home
                </NavLink> |&nbsp;
                <NavLink to={'/candle'}>
                    CandleChart
                </NavLink>
            </main>
            {this.props.children}
            <Footer />
        </div>;
    }
}
