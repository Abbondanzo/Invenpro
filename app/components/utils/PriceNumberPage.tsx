import * as React from 'react';

const MAX_ITEM_VALUE = 1000000;

export interface PriceNumberPageProps {
    onChange(amount: number): any;
    selected: number | null;
}

interface IState {
    amount: string;
}

export class PriceNumberPage extends React.Component<PriceNumberPageProps, IState> {
    constructor(props: PriceNumberPageProps) {
        super(props);

        console.log(this.props.selected);
        this.state = {
            amount: this.props.selected ? String(this.props.selected.toFixed(2)) : '0.00'
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        event.preventDefault();
        let value = event.currentTarget.value + '';
        // Check that there is a valid valid value and this value is a number
        if (value && !isNaN(+value)) {
            let splitByDecimal = value.split('.');
            let decimalValue = splitByDecimal[1];
            if (!decimalValue) {
                // Empty field given a new number
                value = (+value / 100).toFixed(2);
            } else if (value.length == this.state.amount.length - 1 && decimalValue.length < 2) {
                // Deleting number

                // Check if we are deleting from "fractional side" or "integer side" and scale this
                // change appropriately
                if (decimalValue.length < 2) {
                    value = (+value / 10).toFixed(2);
                } else {
                    value = (+value).toFixed(2);
                }
            } else if (decimalValue.length > 2) {
                // Adding number
                value = (+value * 10).toFixed(2);
            } else {
                value = (+value).toFixed(2);
            }
        }
        if (+value < MAX_ITEM_VALUE && value !== this.state.amount) {
            this.setState({
                amount: value
            });
        }
    }

    render() {
        return (
            <input type="text" value={this.state.amount} onChange={this.handleChange} required />
        );
    }
}