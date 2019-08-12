import React from "react";

// components
import PageHeaderWrapper from "../../components/PageHeaderWrapper";
import Can from "../../../src/utils/Can";
import Forbidden from "../Forbidden";
import {
  fetchEmployee,
  putEmployee,
  postEmployee,
  deleteEmployee
} from "../../actions/Employee";
import { connect } from "react-redux";
import ScrollTable from "../../components/InlineCustomTable/CustomScrollTable";
const uuidv4 = require("uuid/v4");
const columns = require("./columns");

class Employee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.props.fetchEmployee();
  }

  // to delete employee
  deleteEmployee = id => {
    this.props.deleteEmployee(id);
  };

  render() {
    let data = this.props.employees;
    data.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    });

    return (
      <div>
        <Can
          role="Admin"
          perform="employee:list"
          no={() => {
            return <Forbidden />;
          }}
        >
          <PageHeaderWrapper
            title="Employee"
            subtitle="You can add Employee basic data by entering one after clicking the New Employee button and can see the employee data in table."
            parent="Configuration"
            child="Employee"
          />
          {/* <PageHeaderWrapper /> */}
          <ScrollTable
            dataSource={data}
            columns={columns}
            title="Employee"
            role="Admin"
            getData={this.getAllEmployee}
            deleteData={id => this.deleteEmployee(id)}
            module="employee"
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
    employees: state.employee.list
  };
}
export default connect(
  mapStateToProps,
  { fetchEmployee, putEmployee, postEmployee, deleteEmployee }
)(Employee);
