import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import { Item } from 'reducers/item';
import { UserMap } from 'reducers/user';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export interface IProps extends RouteComponentProps<any> {
    currentItem: Item | null;
    isBatchAdd: boolean;
    userMap: UserMap;
}

interface IState {
    isEditing: boolean;
    isBatch: boolean;
    currentItem: Item;
}

export class ItemFieldsPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        let isAddItem = !this.props.currentItem;
        let isBatchAdd = this.props.isBatchAdd;

        let emptyItem: Item = {
            name: '',
            owner: '', // User UUID
            date: moment(),
            id: '', // Identifying UUID (name is not an ID)
            price: 0, // Floating point
            upc: null,
            users: [] // A list of UUID who pay for that item. Can include owner
        };

        let currentItem: Item = this.props.currentItem ? this.props.currentItem : emptyItem;

        this.state = {
            isEditing: !isAddItem,
            isBatch: isBatchAdd,
            currentItem: currentItem
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        event.preventDefault();
        let name = event.currentTarget.name;
        let value = event.currentTarget.value;
        let currentItem = Object.assign(this.state.currentItem, {
            [name]: value
        });
        this.setState({
            currentItem: currentItem
        });
    }

    handleDateChange(date: moment.Moment | null) {
        if (date) {
            this.setState({
                currentItem: Object.assign(this.state.currentItem, {
                    date: date
                })
            });
        }
    }

    render() {
        return (
            <div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        name="name"
                        id="name"
                        type="text"
                        value={this.state.currentItem.name}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="itemDate">Date</label>
                    <DatePicker
                        todayButton={'Today'}
                        placeholderText="Set a datefor when this transaction occurred"
                        selected={this.state.currentItem.date}
                        maxDate={moment()}
                        onChange={this.handleDateChange}
                    />
                </div>
                Test
                {this.state.isBatch ? <div>BATCH</div> : <div>Not batch</div>}
                Date: {this.state.currentItem.date.format('MM/DD/YYYY')}
                <div data-tid="addButton">
                    <Link to="/items">Back</Link>
                </div>
            </div>
        );
    }
}
