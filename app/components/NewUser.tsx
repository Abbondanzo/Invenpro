import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { UserState } from '../reducers/user'

export interface IProps extends RouteComponentProps<any> {
    save(): void,
    updateName(name: String): void
    user: UserState
}

export class NewUser extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        let name = event.currentTarget.value;
        this.props.updateName(name)
    }

    render() {
        const { save, user } = this.props;
        return (
            <div>
                <div data-tid="backButton">
                    <Link to="/">
                        <i className="fa fa-arrow-left fa-3x" />
                    </Link>
                </div>
                <span>
                    {user.name}
                </span>
                <div>
                    <input type="text" value={user.name} onChange={this.handleChange}></input>
                    <button onClick={save} data-tclass="btn">Save</button>
                </div>
            </div>
        )
    }
}