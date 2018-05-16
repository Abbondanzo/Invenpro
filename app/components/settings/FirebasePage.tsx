import * as React from 'react';
import { FirebaseConfig } from "reducers/util"

export interface IProps {
    config: FirebaseConfig;
    initializeFirebase(config: FirebaseConfig): void;
}

export class FirebasePage extends React.Component<IProps, { config: FirebaseConfig }> {
    constructor(props: IProps) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)

        this.state = {
            config: this.props.config
        }
    }

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        event.preventDefault()
        let name = event.currentTarget.name
        let value = event.currentTarget.value
        let config = Object.assign(this.state.config, {
            [name]: value
        })
        this.setState({
            config: config
        })
    }

    handleSubmit() {
        this.props.initializeFirebase(this.state.config)
        // TODO: Save config, test config
    }

    render() {
        let stateMap = [
            {
                stateItemKey: "apiKey",
                desc: "API Key"
            },
            {
                stateItemKey: "projectId",
                desc: "Project ID"
            },
            {
                stateItemKey: "databaseName",
                desc: "Database Name"
            },
            {
                stateItemKey: "bucket",
                desc: "Storage Bucket"
            },

        ]
        return (
            <div>
                <form>
                    {
                        stateMap.map((item: { stateItemKey: string, desc: string }, index: number) => {
                            return (
                                <div key={index}>
                                    <label htmlFor={item.stateItemKey}>{item.desc}</label>
                                    <input type="text" name={item.stateItemKey} onChange={this.handleChange} placeholder={item.desc} defaultValue={(this.state.config as any)[item.stateItemKey]} />
                                </div>
                            )
                        })
                    }
                    <button type="button" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}