import React from "react";
import {
  Button,
  Form,
  Input,
  Col,
  Row,
  Select,
  Divider,
  DatePicker,
  Icon,
  Checkbox,
  Card
} from "antd";
import {
  fetchRoles,
  postRole,
  putRole,
  deleteRole
} from "../../../actions/Role";
import PageHeaderWrapper from "../../../components/PageHeaderWrapper";
import CustomRoleTable from "../Role/customTable";
import Can from "../../../../src/utils/Can";
import Forbidden from "../../Forbidden";
import moment from "moment";
import { connect } from "react-redux";
//import { putRole } from "../../../actions/Role";
import history from "../../../router/history";
import styles from "../../../styles/custom.module.less";
//import RoleEdit from "../Role/edit";

import api from "../../../apis";

const columns = require("./columns");
const FormItem = Form.Item;
const Option = { Select };
const { TextArea } = Input;
const uuidv4 = require("uuid/v4");

// function onChange(checkedValues) {
//   console.log('checked = ', checkedValues);
// };
class Role extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const role = {
          name: values.name,
          description: values.description,
          created_by: "super_admin",
          updated_by: "super_admin"
        };
        this.props.postRole(role);
        this.props.putRole(role, this.state.id);
        this.props.form.resetFields();
        history.push("/role");
      }
    });
  };
  handleBack = () => {
    history.push("/role");
  };

  handleClear = () => {};

  handleFormLayoutChange = e => {
    this.setState({ formLayout: e.target.value });
  };

  componentDidMount() {
    this.getAllRole();
  }

  // async getRole() {
  //   const response = await api.get(`roles/${this.state.id}`);
  //    if (response && response.status == 200) {
  //      let data = response.data.data;
  //      this.setState({ data: data });
  //      // this.setInitialValues();
  //      console.log(this.state.data);
  //  }
  // }
  getAllRole() {
    this.props.fetchRoles();
  }

  // to delete role
  deleteRole = id => {
    this.props.deleteRole(id);
  };

  // handleChange = name => event => {
  //   this.setState({
  //     data: {
  //       ...this.state.data,
  //       [name]: event.target.value
  //     }
  //   });
  // };

  render() {
    const { getFieldDecorator } = this.props.form;
    let data = this.props.roles;
    data.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
      console.log(d.key);
    });
    return (
      <React.Fragment>
        <Can
          role="Admin"
          perform="role:list"
          no={() => {
            return <Forbidden />;
          }}
        >
          <PageHeaderWrapper
            title="Role list"
            parent="User Management"
            child="Role"
          />

          <Card bordered={false}>
            <CustomRoleTable
              dataSource={data}
              columns={columns}
              title="Role"
              role="Admin"
              deleteData={id => this.deleteRole(id)}
              module="role"
            />
          </Card>
          <Form onSubmit={this.handleSubmit} className={styles.formstyle}>
            <div style={{ marginLeft: "20%" }}>
              <Row gutter={24}>
                <FormItem label="Role Name">
                  {getFieldDecorator("name", {
                    initialValue: data.name,
                    rules: [
                      {
                        required: true,
                        message: "Enter Role Name "
                      }
                    ]
                  })(
                    <Input
                      style={{ width: "70%" }}
                      placeholder="Enter Role Name"
                      //onChange={this.handleChange("name")}
                    />
                  )}
                </FormItem>
              </Row>
              <Row gutter={25}>
                <FormItem label="Description">
                  {getFieldDecorator("description", {
                    initialValue: data.description,
                    rules: [
                      {
                        required: true,
                        message: "Enter Description"
                      }
                    ]
                  })(
                    <Input
                      style={{ width: "70%" }}
                      placeholder="Enter Description"
                      //onChange={this.handleChange("description")}
                    />
                  )}
                </FormItem>
              </Row>
              {/* <Row gutter={24}>
                <FormItem label="Permission">
                {getFieldDecorator("permission", {
                  rules: [
                      {
                        required: true,
                        message: "Check Permission"
                      }
                    ]
                  })(
                  <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                    <Row>
                      <Col span={8}>
                        <Checkbox value="A">Configuration</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="B">Machine</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="C">Complain</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="D">Schedule</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="E">User Management</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="F">Quotation</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="G">Invoice</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="H">Finance</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="I">Service Report</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="J">Customer Payment List</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                  )}
                </FormItem>
              </Row> */}
            </div>

            <span style={{ marginLeft: "30%" }}>
              <Button
                style={{ borderRadius: "20px", width: "150px" }}
                type="primary"
                htmlType="submit"
              >
                Add New Role
              </Button>
            </span>
          </Form>
          {/*<RoleEdit/>*/}
        </Can>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    roles: state.role.list
  };
}
export default connect(
  mapStateToProps,
  { fetchRoles, putRole, postRole, deleteRole }
)(Form.create()(Role));
