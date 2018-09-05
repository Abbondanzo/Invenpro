import { Menu } from 'antd';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import './style.scss';

export class Sidebar extends React.Component<Sidebar.Props, Sidebar.State> {
    constructor(props: Sidebar.Props) {
        super(props);
        this.goToPage = this.goToPage.bind(this);

        this.state = {
            pageLinks: Sidebar.pageLinks.map((page: Sidebar.PageLink) => {
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
        let pageLinks = this.state.pageLinks.map((pageData: Sidebar.PageLinkStatus) => {
            let isActive = pageData.page.url === url;
            if (!isActive) {
                isActive = pageData.page.url.split('/')[1] === url.split('/')[1];
            }
            return Object.assign(pageData, {
                active: isActive
            });
        });
        this.setState({
            pageLinks
        });
    }

    render() {
        return (
            <div className="sidebar">
                <Menu>
                    {this.state.pageLinks.map((pageData: Sidebar.PageLinkStatus) => {
                        return (
                            <Menu.Item
                                key={pageData.page.name}
                                className={pageData.page.icon + (pageData.active ? ' active' : '')}
                                onClick={() => {
                                    this.goToPage(pageData.page.url);
                                }}
                            >
                                {pageData.page.name}
                            </Menu.Item>
                        );
                    })}
                </Menu>
            </div>
        );
    }
}

export namespace Sidebar {
    export type PageLink = {
        name: string;
        url: string;
        icon: string;
    };
    export type PageLinkStatus = {
        page: PageLink;
        active: boolean;
    };
    export const pageLinks: Array<PageLink> = [
        {
            name: 'Home',
            url: '/',
            icon: 'fa-home'
        },
        {
            name: 'Items',
            url: '/items',
            icon: 'fa-item'
        },
        {
            name: 'Users',
            url: '/users',
            icon: 'fa-user'
        },
        {
            name: 'Payments',
            url: '/payments',
            icon: 'fa-money'
        },
        {
            name: 'Settings',
            url: '/settings',
            icon: 'fa-settings'
        }
    ];
    export interface Props
        extends Pick<RouteComponentProps<void>, 'history'>,
            Pick<RouteComponentProps<void>, 'location'> {}
    export interface State {
        pageLinks: Array<PageLinkStatus>;
    }
}
