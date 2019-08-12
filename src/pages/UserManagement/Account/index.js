import React from "react";
import PageHeaderWrapper from "../../../components/PageHeaderWrapper";
import Can from "../../../../src/utils/Can";
import Forbidden from "../../Forbidden";

import {
  fetchUsers,
  postUser,
  putUser,
  deleteUser
} from "../../../actions/UserAccount";
import { connect } from "react-redux";
import AccountScrollTable from "./custom/CustomScrollTable";

const uuidv4 = require("uuid/v4");
const columns = require("./columns");

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getAllUserAccount();
  }

  getAllUserAccount() {
    this.props.fetchUsers();
  }

  // to delete user
  deleteUser = id => {
    this.props.deleteUser(id);
  };

  render() {
    let data = this.props.users;
    data.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
      console.log(d.key);
    });

    return (
      <React.Fragment>
        <Can
          role="Admin"
          perform="account:list"
          no={() => {
            return <Forbidden />;
          }}
        >
          <PageHeaderWrapper
            title="Account"
            subtitle="List of all account."
            parent="User Management"
            child="Account"
          />

          <AccountScrollTable
            dataSource={data}
            columns={columns}
            title="Account"
            role="Admin"
            getData={this.getAllUserAccount}
            deleteData={id => this.deleteUser(id)}
            module="account"
          />
        </Can>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    lang: state.locale.lang,
    isSignedIn: state.auth.isSignedIn,
    roleid: state.auth.roleid,
    isloaded: state.loading.isloaded,
    users: state.user.list
  };
}
export default connect(
  mapStateToProps,
  { fetchUsers, putUser, postUser, deleteUser }
)(Account);
