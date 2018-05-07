import * as React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { SidebarPage, IProps, PageLink } from "components/utils/SidebarPage";
import { IState } from "reducers";

const pageLinks: Array<PageLink> = [
    {
        name: 'Home',
        url: '/',
        icon: 'fa-home'
    },
    {
        name: 'Users',
        url: '/users',
        icon: 'fa-user'
    }
]

function mapStateToProps(state: IState): Partial<IProps> {
    console.log()
    return {
        pageLinks: pageLinks
    };
}

export default withRouter(connect(mapStateToProps)(SidebarPage) as any) as React.StatelessComponent<any>;
// export default (connect(mapStateToProps)(SidebarPage) as any) as React.StatelessComponent<any>;