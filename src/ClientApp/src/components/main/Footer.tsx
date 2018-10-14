import * as React from 'react';

const version = process.env.VERSION;
const mode = process.env.mode;

export class Footer extends React.Component {
    public render() {
        return <footer>{version} - {mode}</footer>;
    }
}
