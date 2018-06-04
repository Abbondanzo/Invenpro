import * as React from 'react';
import { FirebaseConfig, KeylessFirebaseConfig } from 'reducers/util';

export interface IProps {
    keylessConfig: KeylessFirebaseConfig;
    apiKey: Promise<string> | null;
    initializeFirebase(config: FirebaseConfig): void;
}

export class FirebasePage extends React.Component<IProps, { config: FirebaseConfig }> {
    constructor(props: IProps) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        let configWithBlankKey: FirebaseConfig = Object.assign({}, this.props.keylessConfig, {
            apiKey: ''
        });
        this.state = {
            config: configWithBlankKey
        };
    }

    componentDidMount() {
        // If there is a promise, execute
        if (this.props.apiKey) {
            this.props.apiKey
                .then((apiKey: string) => {
                    let newConfig = Object.assign({}, this.state.config, {
                        apiKey: apiKey
                    });
                    this.setState({
                        config: newConfig
                    });
                })
                .catch((error: any) => {
                    console.error(error);
                });
        }
    }

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        event.preventDefault();
        let name = event.currentTarget.name;
        let value = event.currentTarget.value;
        let config = Object.assign(this.state.config, {
            [name]: value
        });
        this.setState({
            config: config
        });
    }

    handleSubmit() {
        this.props.initializeFirebase(this.state.config);
    }

    render() {
        let stateMap = [
            {
                stateItemKey: 'apiKey',
                desc: 'API Key',
                example: 'AIza....'
            },
            {
                stateItemKey: 'projectId',
                desc: 'Project ID',
                example: 'YOUR_APP'
            },
            {
                stateItemKey: 'databaseURL',
                desc: 'Database URL',
                example: 'https://YOUR_APP.firebaseio.com'
            },
            {
                stateItemKey: 'bucket',
                desc: 'Storage Bucket',
                example: 'YOUR_APP.appspot.com'
            }
        ];
        return (
            <div>
                <form>
                    {stateMap.map(
                        (
                            item: { stateItemKey: string; desc: string; example: string },
                            index: number
                        ) => {
                            return (
                                <div className="form-row" key={index}>
                                    <input
                                        type="text"
                                        name={item.stateItemKey}
                                        onChange={this.handleChange}
                                        placeholder={item.example}
                                        value={(this.state.config as any)[item.stateItemKey]}
                                    />
                                    <label htmlFor={item.stateItemKey}>{item.desc}</label>
                                </div>
                            );
                        }
                    )}
                    <button type="button" onClick={this.handleSubmit}>
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}
