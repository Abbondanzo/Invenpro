import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

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
    render() {
        return (
            <div className={styles.sidebar}>
                <ul>
                    {
                        this.props.pageLinks.map((page: PageLink) => {
                            return (
                                <Link to={page.url}>
                                    <li key={page.name}
                                        className={page.icon}>
                                        {page.name}
                                    </li>
                                </Link>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}