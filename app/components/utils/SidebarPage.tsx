import * as React from "react";
import { RouteComponentProps } from "react-router";

export type PageLink = {
    name: string,
    url: string,
    icon: string
}

let styles = require("./SidebarPage.scss");

export interface IProps extends RouteComponentProps<any> {
    pageLinks: Array<PageLink>
}

export class SidebarPage extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.goToPage = this.goToPage.bind(this);
    }

    goToPage(url: string) {
        if (url !== this.props.location.pathname) {
            this.props.history.push(url);
        }
    }

    render() {
        return (
            <div className={styles.sidebar}>
                <ul>
                    {
                        this.props.pageLinks.map((page: PageLink) => {
                            return (
                                <li key={page.name}
                                    className={page.icon}
                                    onClick={() => { this.goToPage(page.url) }}>
                                    {page.name}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}