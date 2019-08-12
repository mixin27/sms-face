import React from "react";
import {
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
  fetchComplain,
  putComplain,
  postComplain,
  deleteComplain
} from "../../actions/Complain";
import { connect } from "react-redux";
import PageHeaderWrapper from "../../components/PageHeaderWrapper";
import history from "../../router/history";
import api from "../../apis";

import styles from "../../styles/custom.module.less";
import moment from "moment";
import {
  numberPattern,
  wordPattern,
  phoneNoPattern,
  amountPattern
} from "../../utils/validate-pattern";

import { fetchModel } from "../../actions/Model";

import iconComplainInformation from "../../assets/img/menu/portfolio.svg";
import iconCustomerInformation from "../../assets/img/menu/couple.svg";

const FormItem = Form.Item;
const Option = { Select };
const { TextArea } = Input;

class EditComplain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      data: {
        id: 0,
        complain_no: "",
        model_no: "",
        fup_no: "",
        warranty_year: "",
        working_hr: "",
        warranty_description: "",
        customer_name: "",
        customer_phone_no: "",
        date: "",
        distance: "",
        location: "",
        amount: "",
        job_title: "",
        complain_job_title: "",
        description: "",
        created_by: ""
      }
    };
  }

  componentDidMount() {
    this.getComplain(this.state.id);
    this.getModels();
  }

  getModels() {
    this.props.fetchModel();
  }

  getComplain = id => {
    api
      .get(`complains/${id}`)
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
        const complain = {
          complain_no: data.complain_no,
          model_no: values.model_no,
          fup_no: data.fup_no,
          warranty_year: data.warranty_year,
          working_hr: data.working_hr,
          warranty_description: data.warranty_description,
          customer_name: data.customer_name,
          customer_phone_no: data.customer_phone_no,
          date: moment(data.date).format("YYYY/MM/DD"),
          distance: data.distance,
          location: data.location,
          amount: data.amount,
          job_title: data.job_title,
          complain_job_title: data.complain_job_title,
          description: data.description,
          complain_status: data.complain_status,
          updated_by: "admin"
        };
        this.props.putComplain(complain, this.state.id);
        history.push("/complains");
      }
    });
  };

  handleBack = () => {
    history.push("/complains");
  };

  handleClear = () => {};

  handleFormLayoutChange = e => {
    this.setState({ formLayout: e.target.value });
  };

  handleDateChange = value => {
    this.setState({
      data: {
        ...this.state.data,
        date: moment(value).format("YYYY/MM/DD")
      }
    });
  };

  render() {
    const { data } = this.state;

    let modelNo = [];
    let modelData = this.props.models;
    modelData.map(d => {
      modelNo.push(d.model_no);
    });

    const { getFieldDecorator } = this.props.form;
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "95"
    })(
      <Select style={{ width: 70 }}>
        <Option value="95">+95</Option>
        <Option value="96">+96</Option>
      </Select>
    );
    return (
      <div>
        <PageHeaderWrapper
          title="Edit Complain"
          subtitle="Fill below to edit complain."
          parent="Complain"
          child="Edit Complain"
        />

        <div style={{ padding: "20px", backgroundColor: "#ffffff" }}>
          {/* <div>
            <Button
              type="primary"
              style={{
                border: "0",
                backgroundColor: "#ffffff",
                color: "blue",
                border: '0'
              }}
              onClick={this.handleBack}
            >
              Back to complain
            </Button>
          </div> */}

          <div>
            <Form
              layout="vertical-align: middle"
              onSubmit={this.handleSubmit}
              onReset={this.handleBack}
              className={styles.formstyle}
            >
              {/* Head */}
              <Row gutter={24}>
                <FormItem label="Complain No">
                  {getFieldDecorator("complain_no", {
                    initialValue: data.complain_no,
                    rules: [
                      {
                        required: true,
                        message: "Enter Complain Number"
                      }
                    ]
                  })(
                    <Input
                      style={{ width: "50%" }}
                      placeholder="Enter Complain Number"
                      onChange={this.handleChange("complain_no")}
                    />
                  )}
                </FormItem>
              </Row>

              <Row gutter={24}>
                <FormItem label="Model No">
                  {getFieldDecorator("model_no", {
                    initialValue: data.model_no,
                    rules: [
                      {
                        required: true,
                        message: "Enter Model Number "
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
                      style={{ width: "50%" }}
                      placeholder="Enter Model Number "
                      // onChange={this.handleChange("model_no")}
                    />
                  )}
                </FormItem>
              </Row>

              <Row gutter={24}>
                <FormItem label="FUP No">
                  {getFieldDecorator("fup_no", {
                    initialValue: data.fup_no,
                    rules: [
                      {
                        required: true,
                        message: "Enter FUP Number "
                      }
                    ]
                  })(
                    <Input
                      style={{ width: "50%" }}
                      placeholder="Enter FUP Number "
                      onChange={this.handleChange("fup_no")}
                    />
                  )}
                </FormItem>
              </Row>

              {/* Warranty Information */}
              {/* <Divider orientation="left">Warranty Information</Divider> */}
              <h3>
                <img
                  style={{ margin: "5px", height: 20, width: 20 }}
                  src={iconComplainInformation}
                />{" "}
                Warranty Information
              </h3>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <FormItem label="Warranty :">
                    {getFieldDecorator("warranty_year", {
                      initialValue: data.warranty_year,
                      rules: [
                        {
                          required: false,
                          pattern: numberPattern,
                          message: "Enter warranty "
                        }
                      ]
                    })(
                      <Input
                        placeholder="Enter Warranty"
                        onChange={this.handleChange("warranty_year")}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <FormItem label="Working Hour :">
                    {getFieldDecorator("working_hour", {
                      initialValue: data.working_hr,
                      rules: [
                        {
                          required: true,
                          pattern: numberPattern,
                          message: "Enter Number of Working hour "
                        }
                      ]
                    })(
                      <Input
                        placeholder="Enter Number of Working hour "
                        onChange={this.handleChange("working_hr")}
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <FormItem label="Warranty Description :">
                  {getFieldDecorator("warranty_description", {
                    initialValue: data.warranty_description,
                    rules: [
                      {
                        require: false,
                        message: "Warranty Description"
                      }
                    ]
                  })(
                    <TextArea
                      rows={4}
                      style={{ width: "49%" }}
                      onChange={this.handleChange("warranty_description")}
                    />
                  )}
                </FormItem>
              </Row>

              {/* Customer Information */}
              {/* <Divider orientation="left">Customer Information</Divider> */}
              <h3>
                <img
                  style={{ margin: "5px", height: 20, width: 20 }}
                  src={iconCustomerInformation}
                />{" "}
                Customer Information
              </h3>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <FormItem label="Customer Name">
                    {getFieldDecorator("customer_name", {
                      initialValue: data.customer_name,
                      rules: [
                        {
                          required: true,
                          pattern: wordPattern,
                          message: "Enter Customer Name "
                        }
                      ]
                    })(
                      <Input
                        placeholder="Enter Customer Name "
                        onChange={this.handleChange("customer_name")}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <FormItem label=" Customer Phone Number">
                    {getFieldDecorator("customer_phone_no", {
                      initialValue:
                        data.customer_phone_no == null
                          ? ""
                          : data.customer_phone_no,
                      rules: [
                        {
                          required: true,
                          pattern: phoneNoPattern,
                          message: "Please input your phone number!"
                        }
                      ]
                    })(
                      <Input
                        // addonBefore={prefixSelector}
                        style={{ width: "100%" }}
                        onChange={this.handleChange("customer_phone_no")}
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <FormItem label="Date">
                    {getFieldDecorator("date", {
                      initialValue: moment(data.date),
                      rules: [
                        {
                          required: true,
                          message: "Date required"
                        }
                      ]
                    })(<DatePicker onChange={this.handleDateChange} />)}
                  </FormItem>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <FormItem label="Distance">
                    {getFieldDecorator("distance", {
                      initialValue: data.distance,
                      rules: [
                        {
                          required: true,
                          pattern: numberPattern,
                          message: "Enter Distance "
                        }
                      ]
                    })(
                      <Input
                        placeholder="Enter Distance "
                        onChange={this.handleChange("distance")}
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <FormItem label="Location">
                    {getFieldDecorator("location", {
                      initialValue: data.location,
                      rules: [
                        {
                          required: true,
                          message: "Enter location "
                        }
                      ]
                    })(
                      <Input
                        placeholder="Enter location "
                        onChange={this.handleChange("location")}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <FormItem label="Amount">
                    {getFieldDecorator("amount", {
                      initialValue: data.amount,
                      rules: [
                        {
                          required: true,
                          pattern: amountPattern,
                          message: "Enter amount "
                        }
                      ]
                    })(
                      <Input
                        placeholder="Enter amount "
                        onChange={this.handleChange("amount")}
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>

              {/* Other information */}
              {/* <Divider orientation="left">Other Information</Divider> */}
              <h3>
                <img
                  style={{ margin: "5px", height: 20, width: 20 }}
                  src={iconComplainInformation}
                />{" "}
                Other Information
              </h3>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <FormItem label="Job Title">
                    {getFieldDecorator("job_title", {
                      initialValue: data.job_title,
                      rules: [
                        {
                          required: true,
                          message: "Enter job title "
                        }
                      ]
                    })(
                      <Input
                        placeholder="Enter job title "
                        onChange={this.handleChange("job_title")}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <FormItem label=" Complain Job Title">
                    {getFieldDecorator("complain_job_title", {
                      initialValue: data.complain_job_title,
                      rules: [
                        {
                          required: true,
                          message: "Enter complain job title "
                        }
                      ]
                    })(
                      <Input
                        placeholder="Enter complain job title "
                        onChange={this.handleChange("complain_job_title")}
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <FormItem label="Description :">
                {getFieldDecorator("description", {
                  initialValue: data.description,
                  rules: [
                    {
                      require: false,
                      message: "Description"
                    }
                  ]
                })(
                  <TextArea
                    rows={6}
                    style={{ width: "49%" }}
                    onChange={this.handleChange("description")}
                  />
                )}
              </FormItem>

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
                >
                  Cancel
                </Button>
              </span>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    complains: state.complain.list,
    models: state.model.list
  };
}

export default connect(
  mapStateToProps,
  { fetchComplain, putComplain, postComplain, deleteComplain, fetchModel }
)(Form.create()(EditComplain));
