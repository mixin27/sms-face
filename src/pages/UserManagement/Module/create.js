import React from "react";
import {
  Button,
  Form,
  Input,
  Col,
  Row,
  Select,
  Divider,
  Icon,
  DatePicker,
  Radio
} from "antd";

import {
  fetchModules,
  postModule,
  putModule,
  deleteModule
} from "../../../actions/Module";

import { connect } from "react-redux";
import PageHeaderWrapper from "../../../components/PageHeaderWrapper";
import history from "../../../router/history";
import Can from "../../../../src/utils/Can";
import Forbidden from "../../Forbidden";
import "./style.css";

import { Checkbox } from "antd";

// import profilePlaceHolder from "../../assets/img/man.svg";

import styles from "../../../styles/custom.module.less";
// import btnStyles from "./index.module.less";

const FormItem = Form.Item;
const Option = { Select };

const plainOptions = ["View", "Edit", "Delete", "Insert"];
const options = [
  { label: "View", value: "View" },
  { label: "Edit", value: "Edit" },
  { label: "Delete", value: "Delete" },
  { label: "Insert", value: "Insert" }
];

const image = {
  width: "200px",
  height: "200px",
  border: "1px dashed blue",
  backgroundColor: "#fff",
  padding: "20px",
  marginLeft: "5%",
  marginBottom: "10px"
};

// let permission=[];
// function onChange(checkedValues) {
//   // console.log('checked = ', checkedValues);
//   permission = checkedValues;
//   console.log(permission)
// }

class NewModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    };
  }
  onChange(e) {
    const options = this.state.options;
    let index;

    if (e.target.checked) {
      options.push(+e.target.value);
    } else {
      index = options.indexOf(+e.target.value);
      options.splice(index, 1);
    }
    this.setState({ options: options });

    console.log(options);
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const myModule = {
          module_name: values.module_name,
          controller_name: values.controller_name,
          remark: values.remark,
          //action_name: values.options,
          created_by: "admin",
          updated_by: "admin"
        };
        this.props.postModule(myModule);
        history.push("/module");
      }
    });
  };

  handleBack = () => {
    history.push("/module");
  };

  handleClear = () => {};

  handleFormLayoutChange = e => {
    this.setState({ formLayout: e.target.value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    // console.log(permission);
    return (
      <div>
        <Can
          role="Admin"
          perform="account:list"
          no={() => {
            return <Forbidden />;
          }}
        >
          <PageHeaderWrapper
            title="Create New Module"
            subtitle="Module"
            parent="User Management"
            child="Module"
            subchild="Create New Module"
          />

          <div style={{ padding: "20px", backgroundColor: "#ffffff" }}>
            <div style={{ marginLeft: "80%" }}>
              <a onClick={this.handleBack}>
                <Icon type="arrow-left" style={{ marginRight: "10px" }} />
                Back
              </a>
            </div>

            <div style={{ marginLeft: "40px" }}>
              <Form
                onSubmit={this.handleSubmit}
                onReset={this.handleBack}
                className={styles.formstyle}
              >
                {/* Photo Upload */}

                <br />
                <br />
                {/* Head */}
                <div style={{ width: "600px", marginLeft: "80px" }}>
                  <Row>
                    <Col span={12}>
                      <h3>Module Name</h3>
                    </Col>

                    <Col span={12}>
                      {getFieldDecorator("module_name", {
                        rules: [
                          {
                            required: true,
                            message: "Enter Module Name"
                          }
                        ]
                      })(<Input placeholder="Enter Module Name" />)}
                    </Col>
                  </Row>
                  <br />
                  <br />
                  <br />

                  {/* <Row gutter={24}>
                <Col span={12}>
                <span>
                    <FormItem label="Employee_ID" />
                    {/* <Divider orientation="left">Job Information</Divider> */}
                  {/* <Select
                      style={{ width: 316, marginLeft: "30px" }}
                      placeholder=" "
                      onChange={this.onPositionChange}
                    >
                      {/* {posArr.map(pos => (
                        <Option key={pos.position_type}>
                          {pos.position_type}
                        </Option>
                      ))} */}
                  {/* </Select>
                  </span>
                </Col> */}
                  {/* </Row> */}

                  {/* Customer Information */}

                  <Row>
                    <Col span={12}>
                      <h3>Controller Name</h3>
                    </Col>

                    <Col span={12}>
                      {getFieldDecorator("controller_name", {
                        rules: [
                          {
                            required: true,
                            message: "Enter Controller Name"
                          }
                        ]
                      })(<Input placeholder="Enter Controller Name" />)}
                    </Col>
                  </Row>
                  <br />
                  <br />
                  <br />

                  <Row>
                    <Col span={12}>
                      <h3>Remark</h3>
                    </Col>
                    <Col span={12}>
                      {getFieldDecorator("remark", {
                        rules: [
                          {
                            required: true,
                            message: "Enter Remark"
                          }
                        ]
                      })(<Input placeholder="Enter Remark" />)}
                    </Col>
                  </Row>
                </div>
                <br />
                <br />
                <br />

                {/* Other information */}

                {/* Button */}
                <span style={{ marginLeft: "30%" }}>
                  <Button
                    style={{ borderRadius: "20px", width: "150px" }}
                    type="primary"
                    htmlType="submit"
                  >
                    Add New Module
                  </Button>
                </span>
              </Form>
            </div>
          </div>
        </Can>
      </div>
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
  { postModule, putModule, deleteModule, fetchModules }
)(Form.create()(NewModule));
