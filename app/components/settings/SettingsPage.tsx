import * as React from 'react';
import { Link } from 'react-router-dom';

export interface IProps {
    deleteCache(): void;
}

export class SettingsPage extends React.Component<IProps> {
    render() {
        return (
            <div>
                <button onClick={this.props.deleteCache}>Delete Cache</button>
                <br />
                <Link to="/settings/firebase">Firebase Settings</Link>
            </div>
        );
    }
}
