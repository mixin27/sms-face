import React from "react";
import Can from "../../../utils/Can";
import PageHeaderWrapper from "../../../components/PageHeaderWrapper";

import Forbidden from "../../Forbidden";

import { putRole } from "../../../actions/Role";
import { connect } from "react-redux";

import { Form, Input, Card, Button, Row, Col, Checkbox, Modal } from "antd";
import styles from "../../../styles/custom.module.less";
//import { emailPattern } from "../../../utils/validate-pattern";
import history from "../../../router/history";

import api from "../../../apis";

const FormItem = Form.Item;

function onChange(checkedValues) {
  console.log("checked = ", checkedValues);
}
class RoleEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      visible: true,
      data: {
        id: 0,
        name: "",
        description: "",
        created_by: "super_admin"
      }
    };
  }

  componentDidMount() {
    this.getRole();
  }

  async getRole() {
    const response = await api.get(`roles/${this.state.id}`);
    if (response && response.status == 200) {
      let data = response.data.data;
      this.setState({ data: data });
      // this.setInitialValues();
      console.log(this.state.data);
    }
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
        this.props.putRole(role, this.state.id);
        history.push("/role");
      }
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });

    history.push("/role");
  };

  handleChange = name => event => {
    this.setState({
      data: {
        ...this.state.data,
        [name]: event.target.value
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { data } = this.state;
    // let data = this.props.roles;
    // data.map(d => {
    //   let uuid = uuidv4();
    //   d.key = uuid;
    //   console.log(d.key);
    // });
    return (
      <React.Fragment>
        <Can
          role="Admin"
          perform="role:list"
          no={() => {
            return <Forbidden />;
          }}
        >
          {/* <PageHeaderWrapper
            title="Role list"
            parent="User Management"
            child="Role"
          /> */}
          <Modal
            visible={this.state.visible}
            onCancel={this.handleCancel}
            // onOk={this.handleOk}
            footer={[null, null]}
          >
            <h3
              style={{
                textAlign: "center",
                color: "#0277BD"
              }}
            >
              Machine
            </h3>

            <Card bordered={false} style={{ height: "100%" }}>
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
                          onChange={this.handleChange("name")}
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
                          onChange={this.handleChange("description")}
                        />
                      )}
                    </FormItem>
                  </Row>
                  {/* {/* <Row gutter={24}>
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

                {/* Button */}
                <span style={{ marginLeft: "10%" }}>
                  <Button
                    style={{ borderRadius: "20px", width: "150px" }}
                    type="primary"
                    htmlType="submit"
                  >
                    Update
                  </Button>
                  <Button
                    style={{
                      borderRadius: "20px",
                      width: "150px",
                      marginLeft: "10%"
                    }}
                    type="add"
                    htmlType="reset"
                    onClick={this.handleCancel}
                  >
                    Cancel
                  </Button>
                </span>
              </Form>
            </Card>
          </Modal>
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
    isloaded: state.loading.isloaded
  };
}

export default connect(
  mapStateToProps,
  { putRole }
)(Form.create()(RoleEdit));
