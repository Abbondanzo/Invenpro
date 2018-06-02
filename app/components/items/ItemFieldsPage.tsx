import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Item } from 'reducers/item';
import { UserMap } from 'reducers/user';

export interface IProps extends RouteComponentProps<any> {
    currentItem: Item | null;
    isBatchAdd: boolean;
    userMap: UserMap;
}

interface IState {
    isEditing: boolean;
    isBatch: boolean;
    currentItem: Item;
    currentItems: Array<Item>;
}

export class ItemFieldsPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        let isAddItem = !this.props.currentItem;
        let isBatchAdd = this.props.isBatchAdd;

        let emptyItem: Item = {
            owner: '', // User UUID
            name: '',
            id: '', // Identifying UUID (name is not an ID)
            price: 0, // Floating point
            upc: null,
            users: [] // A list of UUID who pay for that item. Can include owner
        };

        let currentItem: Item = this.props.currentItem ? this.props.currentItem : emptyItem;

        this.state = {
            isEditing: !isAddItem,
            isBatch: isBatchAdd,
            currentItem: currentItem,
            currentItems: []
        };
    }

    render() {
        return (
            <div>
                Test
                {this.state.isBatch ? <div>BATCH</div> : <div>Not batch</div>}
                <div data-tid="addButton">
                    <Link to="/items">Back</Link>
                </div>
            </div>
        );
    }
}
