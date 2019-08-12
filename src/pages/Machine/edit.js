import React from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  Col,
  Row,
  Select,
  Divider,
  DatePicker,
  AutoComplete
} from "antd";
import {
  fetchMachine,
  putMachine,
  postMachine,
  deleteMachine
} from "../../actions/Machine";
import { connect } from "react-redux";
import history from "../../router/history";
import api from "../../apis";

import { fetchModel } from "../../actions/Model";

import styles from "../../styles/custom.module.less";
import { numberPattern } from "../../utils/validate-pattern";

const FormItem = Form.Item;

class EditMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      visible: true,
      data: {
        id: 0,
        model_number: "",
        FUP_number: "",
        machine_serial_number: "",
        warranty_year: "",
        working_hour: "",
        location: "",
        created_by: ""
      }
    };
  }

  componentDidMount() {
    this.getMachine(this.state.id);
    this.getModels();
  }

  getModels() {
    this.props.fetchModel();
  }

  getMachine = id => {
    api
      .get(`machines/${id}`)
      .then(response => {
        this.setState({
          data: response.data.data
        });
      })
      .catch(e => console.log(e));
  };

  handleChange = name => event => {
    this.setState({
      data: {
        ...this.state.data,
        [name]: event.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { data } = this.state;
        const machine = {
          model_number: values.model_number,
          FUP_number: data.FUP_number,
          machine_serial_number: data.machine_serial_number,
          warranty_year: data.warranty_year,
          working_hour: data.working_hour,
          location: data.location,
          created_by: data.created_by,
          updated_by: "admin"
        };
        this.props.putMachine(machine, this.state.id);
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const { data } = this.state;

    let modelNo = [];
    let modelData = this.props.models;
    modelData.map(d => {
      modelNo.push(d.model_no);
    });
    return (
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
        >
          <Row gutter={24}>
            <FormItem label="Model Number">
              {getFieldDecorator("model_number", {
                initialValue: data.model_number,
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
                  placeholder="Model Number"
                  // onChange={this.handleChange("model_number")}
                />
              )}
            </FormItem>
          </Row>

          <Row gutter={24}>
            <FormItem label="FUP Number">
              {getFieldDecorator("FUP_number", {
                initialValue: data.FUP_number,
                rules: [
                  {
                    required: false,
                    message: "Enter FUP Number"
                  }
                ]
              })(
                <Input
                  style={{ width: "80%" }}
                  placeholder="FUP Number"
                  onChange={this.handleChange("FUP_number")}
                />
              )}
            </FormItem>
          </Row>

          <Row gutter={24}>
            <FormItem label="Machine Serial Number">
              {getFieldDecorator("machine_serial_number", {
                initialValue: data.machine_serial_number,
                rules: [
                  {
                    required: false,
                    message: "Enter Machine Serial Number"
                  }
                ]
              })(
                <Input
                  style={{ width: "80%" }}
                  placeholder="Serial Number"
                  onChange={this.handleChange("machine_serial_number")}
                />
              )}
            </FormItem>
          </Row>

          <Row gutter={24}>
            <FormItem label="Warranty Year">
              {getFieldDecorator("warranty_year", {
                initialValue: data.warranty_year,
                rules: [
                  {
                    required: false,
                    pattern: numberPattern,
                    message: "Enter Warranty Year"
                  }
                ]
              })(
                <Input
                  style={{ width: "80%" }}
                  placeholder="Warranty Year"
                  onChange={this.handleChange("warranty_year")}
                />
              )}
            </FormItem>
          </Row>

          <Row gutter={24}>
            <FormItem label="Working Hour">
              {getFieldDecorator("working_hour", {
                initialValue: data.working_hour,
                rules: [
                  {
                    required: false,
                    pattern: numberPattern,
                    message: "Enter Working Hour"
                  }
                ]
              })(
                <Input
                  style={{ width: "80%" }}
                  placeholder="Working Hour"
                  onChange={this.handleChange("working_hour")}
                />
              )}
            </FormItem>
          </Row>

          <Row gutter={24}>
            <FormItem label="Location">
              {getFieldDecorator("location", {
                initialValue: data.location,
                rules: [
                  {
                    required: false,
                    message: "Enter Location"
                  }
                ]
              })(
                <Input
                  style={{ width: "80%" }}
                  placeholder="Location"
                  onChange={this.handleChange("location")}
                />
              )}
            </FormItem>
          </Row>

          <Row
            gutter={24}
            style={{
              paddingLeft: "20%"
            }}
          >
            <Button type="primary" htmlType="submit">
              Update
            </Button>
            <span style={{ margin: "5%" }} />
            <Button type="add" onClick={this.handleCancel}>
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
  { fetchMachine, postMachine, putMachine, deleteMachine , fetchModel}
)(Form.create()(EditMachine));
