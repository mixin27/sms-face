import React from "react";
//component
import PageHeaderWrapper from "../../components/PageHeaderWrapper";
import EditableTable from "../../components/InlineCustomTable/CustomTable";
import { getUserInfo, getUserToken } from "../../utils";
import Can from "../../../src/utils/Can";
import Forbidden from "../Forbidden";
import {
  fetchDepartment,
  putDepartment,
  postDepartment,
  deleteDepartment
} from "../../actions/Department";
import { connect } from "react-redux";
const uuidv4 = require("uuid/v4");
const columns = require('./columns');

class Department extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getAllDepartment();
  }

  getAllDepartment() {
    console.log(this.props.fetchDepartment());
  }

  //update department
  editDepartment = (data, id) => {
    this.props.putDepartment(data, id);
  };

  // to create new department
  createNewDepartment = data => {
    let userInfo = getUserInfo();
    data.created_by = "admin";
    data.updated_by = "";
    this.props.postDepartment(data);
  };

  // to delete department
  deleteDepartment = id => {
    this.props.deleteDepartment(id);
  };

  render() {
    const perform = {
      create: "department:create",
      edit: "department:edit"
    };
    const newData = {
      dept_name: "",
      dept_code_no: "",
      description: ""
    };

    let data = this.props.departments;
    data.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    });

    return (
      <div>
        <Can
          role="Admin"
          perform="department:list"
          no={() => {
            return <Forbidden />;
          }}
        >
          <PageHeaderWrapper
            title="Department"
            subtitle="You can add Department data of company by entering add New Department button."
            parent="Configuration"
            child="Department"
          />
          {/* <PageHeaderWrapper /> */}
          <EditableTable
            dataSource={data}
            columns={columns}
            title="Department List"
            role="Admin"
            perform={perform}
            newData={newData}
            getData={this.getAllDepartment}
            editData={(data, id) => this.editDepartment(data, id)}
            createNewData={data => this.createNewDepartment(data)}
            deleteData={id => this.deleteDepartment(id)}
            actionBtnName="Department"
            iconEdit="edit"
            iconDelete="delete"
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
    departments: state.department.list
  };
}
export default connect(
  mapStateToProps,
  { fetchDepartment, putDepartment, postDepartment, deleteDepartment }
)(Department);
