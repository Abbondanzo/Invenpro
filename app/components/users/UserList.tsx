import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { User } from "reducers/user";

export interface IProps extends RouteComponentProps<any> {
  userList: User[];
  addUser(): void;
  editUser(user: User): void;
}

export class UserList extends React.Component<IProps> {
  render() {
    return (
      <div>
        <div data-tid="backButton">
          <Link to="/">Go back</Link>
        </div>
        <table>
          <th>
            <td>Name</td>
            <td>Edit</td>
          </th>
          {this.props.userList.map((user: User, i: number) => {
            return (
              <tr id="user">
                <td>{user.name}</td>
                <td>Edit</td>
              </tr>
            );
          })}
        </table>
        <div data-tid="addButton">
          <Link to="/new-user">Add user</Link>
        </div>
      </div>
    );
  }
}
