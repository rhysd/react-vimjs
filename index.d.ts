import * as React from 'react';
export interface Props {
    vimjsPath: string;
    memPath: string;
    vimrc?: string;
    children?: JSX.Element[];
    args?: string[];
    onStart?: () => void;
    defaultFiles?: {
        [path: string]: string;
    };
    syntax?: {
        [ft: string]: string;
    };
}
export default class Vim extends React.Component<Props, {}> {
    constructor(props: Props);
    componentDidMount(): void;
    render(): JSX.Element;
}
