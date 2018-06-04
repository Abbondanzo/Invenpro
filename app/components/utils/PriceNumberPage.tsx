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
        let value = event.currentTarget.value;
        console.log(value.slice(value.length - 1) === '.');
        // Check that there is a valid valid value and number
        if (value && +value) {
            if (value.length + 1 == this.state.amount.length) {
                // Deleting number
                value = (+value / 10).toFixed(2);
            } else {
                // Adding number
                value = (+value * 10).toFixed(2);
            }
        } else if (!isNaN(+value)) {
            // Check that the value is a valid number
            value = '0.00';
        }
        if (+value < MAX_ITEM_VALUE) {
            this.setState({
                amount: value
            });
        }
    }

    render() {
        return <input type="text" value={this.state.amount} onChange={this.handleChange} />;
    }
}
