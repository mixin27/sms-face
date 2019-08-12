import React from "react";
import PageHeaderWrapper from "../../../components/PageHeaderWrapper";
import Can from "../../../../src/utils/Can";
import Forbidden from "../../Forbidden";
import {
  Form,
} from "antd";
import {
  postModule,
  putModule,
  deleteModule,
  fetchModules
} from "../../../actions/Module";

import { connect } from "react-redux";

import ScrollMachineTable from "./moduleScrolltable";
const uuidv4 = require("uuid/v4");
const columns = require("./columns");

class Module extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getAllModule();
  }

  getAllModule() {
    this.props.fetchModules();
  }

  deleteModule = id => {
    this.props.deleteModule(id);
  };

  render() {
    let data = this.props.modules;
    data.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    });
    return (
      <React.Fragment>
        <Can
          role="Admin"
          perform="module:list"
          no={() => {
            return <Forbidden />;
          }}
        >
          <PageHeaderWrapper
            title="Module"
            subtitle="You can add Module data of company by entering New Model button."
            parent="User Management"
            child="Module"
          />

          <ScrollMachineTable
            dataSource={data}
            columns={columns}
            title="Module"
            role="Admin"
            getData={this.getAllModule}
            deleteData={id => this.deleteModule(id)}
            module="modules"
          />
        </Can>
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    modules: state.module.list
  };
}

export default connect(
  mapStateToProps,
  {postModule,putModule,deleteModule,fetchModules}
)(Form.create()(Module));
