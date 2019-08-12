import React from "react";

// components
import PageHeaderWrapper from "../../components/PageHeaderWrapper";
import Can from "../../../src/utils/Can";
import Forbidden from "../Forbidden";
import {
  fetchMachine,
  putMachine,
  postMachine,
  deleteMachine
} from "../../actions/Machine";
import { connect } from "react-redux";
import ScrollMachineTable from "./custom/CustomMachineTable";
const uuidv4 = require("uuid/v4");
const columns = require("./columns");

class Machine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getAllMachine();
  }

  getAllMachine() {
    this.props.fetchMachine();
  }

  // to delete machine
  deleteMachine = id => {
    this.props.deleteMachine(id);
  };

  render() {

    let data = this.props.machines;
    data.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    });

    return (
      <div>
        <Can
          role="Admin"
          perform="machine:list"
          no={() => {
            return <Forbidden />;
          }}
        >
          <PageHeaderWrapper
            title="Machine Model"
            subtitle="You can add Machine data of company by entering New Machine button."
            parent="Machine"
          />
          {/* <PageHeaderWrapper /> */}
          <ScrollMachineTable
            dataSource={data}
            columns={columns}
            title="Machine"
            role="Admin"
            deleteData={id => this.deleteMachine(id)}
            module="machine"
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
    machines: state.machine.list
  };
}
export default connect(
  mapStateToProps,
  { fetchMachine, putMachine, postMachine, deleteMachine }
)(Machine);
