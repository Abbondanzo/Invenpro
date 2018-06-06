import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import { Item } from 'reducers/item';
import { UserMap } from 'reducers/user';
import { PriceNumberPage } from 'components/utils/PriceNumberPage';
import UserSelection from 'containers/utils/UserSelection';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './ItemFieldsPage.scss';

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
            receipt: '',
            date: moment(),
            id: '', // Identifying UUID (name is not an ID)
            price: 0,
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
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleUsersChange = this.handleUsersChange.bind(this);
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

    handlePriceChange(amount: number) {
        let currentItem = Object.assign(this.state.currentItem, {
            price: amount
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

    handleUsersChange(users: Array<string>) {
        this.setState({
            currentItem: Object.assign(this.state.currentItem, {
                users: users
            })
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 form-row">
                        <input
                            name="name"
                            id="name"
                            type="text"
                            value={this.state.currentItem.name}
                            onChange={this.handleChange}
                            required
                        />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="col-md-3 form-row">
                        <DatePicker
                            todayButton={'Today'}
                            placeholderText="Set a date for when this transaction occurred"
                            selected={this.state.currentItem.date}
                            maxDate={moment()}
                            onChange={this.handleDateChange}
                            className="col-12"
                        />
                        <label htmlFor="itemDate">Date</label>
                    </div>
                    <div className="col-md-3 form-row">
                        <PriceNumberPage
                            selected={this.state.currentItem.price}
                            onChange={this.handlePriceChange}
                        />
                        <label htmlFor="price">Price</label>
                    </div>
                </div>
                <UserSelection
                    selected={this.state.currentItem.users}
                    handleChange={this.handleUsersChange}
                />
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
