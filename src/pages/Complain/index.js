import React from "react";

// components
import PageHeaderWrapper from "../../components/PageHeaderWrapper";
import Can from "../../../src/utils/Can";
import Forbidden from "../Forbidden";
import {
  fetchComplain,
  putComplain,
  postComplain,
  deleteComplain
} from "../../actions/Complain";
import { connect } from "react-redux";
import ScrollTable from "../../components/InlineCustomTable/CustomScrollTable";
import { Table } from "antd";
const uuidv4 = require("uuid/v4");
const columns = require("./columns");

class Complain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getAllComplain();
  }

  getAllComplain() {
    this.props.fetchComplain();
  }

  // to delete complain
  deleteComplain = id => {
    this.props.deleteComplain(id);
  };

  render() {
    // const perform = {
    //   create: "complain:create",
    //   edit: "complain:edit"
    // };

    let data = this.props.complains;
    data.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    });

    return (
      <div>
        <Can
          role="Admin"
          perform="complain:list"
          no={() => {
            return <Forbidden />;
          }}
        >
          <PageHeaderWrapper
            title="Complain"
            subtitle="There are a lot of complain list received from everywhere. They are not still accept yer. You can choose whether to receive or reject. You can create new too."
            parent="Complain"
          />
          {/* <PageHeaderWrapper /> */}
          <ScrollTable
            dataSource={data}
            columns={columns}
            title="Complain"
            role="Admin"
            deleteData={id => this.deleteComplain(id)}
            module="complain"
          />

        </Can>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lang: state.locale.lang,
    isSignedIn: state.auth.isSignedIn,
    roleid: state.auth.roleid,
    isloaded: state.loading.isloaded,
    complains: state.complain.list
  };
}
export default connect(
  mapStateToProps,
  { fetchComplain, putComplain, postComplain, deleteComplain }
)(Complain);
