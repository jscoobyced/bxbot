import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps> {
    public render() {
        return <div>
            <Header />
            <main>
                {this.props.children}
            </main>
            <Footer />
        </div>;
    }
}
