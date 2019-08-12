import React from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  AutoComplete,
  Col,
  Row,
  Select,
  Divider,
  DatePicker
} from "antd";
import {
  fetchMachine,
  putMachine,
  postMachine,
  deleteMachine
} from "../../actions/Machine";
import { connect } from "react-redux";
import history from "../../router/history";

import { fetchModel } from "../../actions/Model";

import styles from "../../styles/custom.module.less";
import { numberPattern } from "../../utils/validate-pattern";

const FormItem = Form.Item;
const Option = { Select };
const { TextArea } = Input;

class NewMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }

  componentDidMount() {
    this.getModels();
  }

  getModels() {
    this.props.fetchModel();
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const machine = {
          model_number: values.model_number,
          FUP_number: values.FUP_number,
          machine_serial_number: values.machine_serial_number,
          warranty_year: values.warranty_year,
          working_hour: values.working_hour,
          location: values.location,
          created_by: "admin",
          updated_by: "admin"
        };
        this.props.postMachine(machine);
        history.push("/machines");
      }
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });

    history.push("/machines");
  };

  handleReset = e => {
    // this.props.form.resetFields();
    this.setState({
      visible: false
    });

    history.push("/machines");
  };

  handleFormLayoutChange = e => {
    this.setState({ formLayout: e.target.value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    let modelNo = [];
    let modelData = this.props.models;
    modelData.map(d => {
      modelNo.push(d.model_no);
    });

    return (
      // </Modal>
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

        <Form
          className={styles.formstyle}
          style={{ paddingLeft: "10%" }}
          onSubmit={this.handleSubmit}
          onReset={this.handleReset}
        >
          <Row gutter={24}>
            <FormItem label="Model Number">
              {getFieldDecorator("model_number", {
                rules: [
                  {
                    required: false,
                    message: "Enter Model Number"
                  }
                ]
              })(
                <AutoComplete
                  dataSource={modelNo}
                  filterOption={(inputValue, option) =>
                    option.props.children
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  style={{ width: "80%" }}
                  placeholder="Model No"
                />
              )}
            </FormItem>
          </Row>

          <Row gutter={24}>
            <FormItem label="FUP Number">
              {getFieldDecorator("FUP_number", {
                rules: [
                  {
                    required: false,
                    message: "Enter FUP Number"
                  }
                ]
              })(<Input style={{ width: "80%" }} placeholder="FUP Number" />)}
            </FormItem>
          </Row>

          <Row gutter={24}>
            <FormItem label="Machine Serial Number">
              {getFieldDecorator("machine_serial_number", {
                rules: [
                  {
                    required: false,
                    message: "Enter Machine Serial Number"
                  }
                ]
              })(<Input style={{ width: "80%" }} placeholder="Serial Number" />)}
            </FormItem>
          </Row>

          <Row gutter={24}>
            <FormItem label="Warranty Year">
              {getFieldDecorator("warranty_year", {
                rules: [
                  {
                    required: false,
                    pattern: numberPattern,
                    message: "Enter Warranty Year"
                  }
                ]
              })(<Input style={{ width: "80%" }} placeholder="Warranty Year" />)}
            </FormItem>
          </Row>

          <Row gutter={24}>
            <FormItem label="Working Hour">
              {getFieldDecorator("working_hour", {
                rules: [
                  {
                    required: false,
                    pattern: numberPattern,
                    message: "Enter Working Hour"
                  }
                ]
              })(<Input style={{ width: "80%" }} placeholder="Working Hour" />)}
            </FormItem>
          </Row>

          <Row gutter={24}>
            <FormItem label="Location">
              {getFieldDecorator("location", {
                rules: [
                  {
                    required: false,
                    message: "Enter location"
                  }
                ]
              })(<Input style={{ width: "80%" }} placeholder="Location" />)}
            </FormItem>
          </Row>

          <Row
            gutter={24}
            style={{
              paddingLeft: "20%"
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <span style={{ margin: "5%" }} />
            <Button type="add" htmlType="reset">
              Cancel
            </Button>
          </Row>
        </Form>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    machines: state.machine.list,
    models: state.model.list
  };
}

export default connect(
  mapStateToProps,
  { fetchMachine, postMachine, putMachine, deleteMachine, fetchModel }
)(Form.create()(NewMachine));
