import * as React from 'react';
import { AllContent } from '../../services/Models';
import { Footer } from './Footer';
import { Header } from './Header';

export interface LayoutProps {
    children?: React.ReactNode;
    allContent?: AllContent;
}

export class Layout extends React.Component<LayoutProps> {

    public constructor(props: LayoutProps) {
        super(props);
    }

    public render() {
        if (this.props.allContent == null) {
            return <div></div>;
        }

        return <div className='content'>
            <Header navigationMenuContent={this.props.allContent.navigationMenuContent} />
            <main>
                {this.props.children}
            </main>
            <Footer />
        </div>;
    }
}
