import * as React from 'react';
import { HomeContent } from '../../services/Models';

export interface HomeProps {
    homeContent: HomeContent;
}

export class Home extends React.Component<HomeProps> {

    public constructor(props: HomeProps) {
        super(props);
    }

    public render() {
        return <article>
            <h1>{this.props.homeContent.articleTitle}</h1>
            <section>{this.props.homeContent.article}</section>
        </article>;
    }
}
