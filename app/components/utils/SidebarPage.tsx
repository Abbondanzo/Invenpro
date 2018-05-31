import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export type PageLink = {
    name: string;
    url: string;
    icon: string;
};

type PageLinkStatus = {
    page: PageLink;
    active: boolean;
};

let styles = require('./SidebarPage.scss');

export interface IProps extends RouteComponentProps<any> {
    pageLinks: Array<PageLink>;
}

export class SidebarPage extends React.Component<IProps, { pageLinks: Array<PageLinkStatus> }> {
    constructor(props: IProps) {
        super(props);
        this.goToPage = this.goToPage.bind(this);

        this.state = {
            pageLinks: this.props.pageLinks.map((page: PageLink) => {
                return {
                    page: page,
                    active: false
                };
            })
        };
    }

    componentDidMount() {
        this.checkForActiveUrl(this.props.location.pathname);
        this.props.history.listen((location, action) => {
            this.checkForActiveUrl(location.pathname);
        });
    }

    goToPage(url: string) {
        if (url !== this.props.location.pathname) {
            this.props.history.push(url);
        }
    }

    checkForActiveUrl(url: string) {
        let pageLinks = this.state.pageLinks.map((pageData: PageLinkStatus) => {
            let isActive = pageData.page.url === url;
            if (!isActive) {
                isActive = pageData.page.url.split('/')[1] === url.split('/')[1];
            }
            return Object.assign(pageData, {
                active: isActive
            });
        });
        this.setState({
            pageLinks: pageLinks
        });
    }

    render() {
        return (
            <div className={styles.sidebar}>
                <ul>
                    {this.state.pageLinks.map((pageData: PageLinkStatus) => {
                        return (
                            <li
                                key={pageData.page.name}
                                className={
                                    pageData.page.icon +
                                    (pageData.active ? ' ' + styles['active'] : '')
                                }
                                onClick={() => {
                                    this.goToPage(pageData.page.url);
                                }}
                            >
                                {pageData.page.name}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
