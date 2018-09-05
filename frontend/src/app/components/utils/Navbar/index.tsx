import * as React from 'react';
import './style.scss';

export namespace Navbar {
    export interface Props {}
    export interface State {}
}

export class Navbar extends React.Component<Navbar.Props, Navbar.State> {
    render() {
        return (
            <nav className="navbar">
                <div className="navbar-brand mr-0">
                    <a href="#">Invenpro Project</a>
                </div>
                <ul className="navbar-nav">Sign out</ul>
            </nav>
        );
    }
}
