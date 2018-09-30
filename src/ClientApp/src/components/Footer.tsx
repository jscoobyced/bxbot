import * as React from 'react';

const version = process.env.VERSION;

export class Footer extends React.Component {
    public render() {
        return <footer>${version}</footer>;
    }
}
