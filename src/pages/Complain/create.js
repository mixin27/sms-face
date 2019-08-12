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
  DatePicker,
  Icon
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
import moment from "moment";

import iconComplainInformation from "../../assets/img/menu/portfolio.svg";
import iconCustomerInformation from "../../assets/img/menu/couple.svg";

// RegExp
import {
  wordPattern,
  numberPattern,
  phoneNoPattern,
  amountPattern
} from "../../utils/validate-pattern";

import { fetchModel } from "../../actions/Model";

import styles from "../../styles/custom.module.less";

const FormItem = Form.Item;
const Option = { Select };
const { TextArea } = Input;

class NewComplain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        const complain = {
          complain_no: values.complain_no,
          model_no: values.model_no,
          fup_no: values.fup_no,
          warranty_year: values.warranty_year,
          working_hr: values.working_hour,
          warranty_description: values.warranty_description,
          customer_name: values.customer_name,
          // customer_phone_no: `${values.prefix}${values.customer_phone_no}`,
          customer_phone_no: values.customer_phone_no,
          date: moment(values.date).format("YYYY/MM/DD"),
          distance: values.distance,
          location: values.location,
          amount: values.amount,
          job_title: values.job_title,
          complain_job_title: values.complain_job_title,
          description: values.description,
          complain_status: -1,
          created_by: "admin",
          updated_by: "admin"
        };
        this.props.postComplain(complain);
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

  render() {
    let modelNo = [];
    let modelData = this.props.models;
    modelData.map(d => {
      modelNo.push(d.model_no);
    });
    // console.log("Models: " + modelNo);

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
          title="Create New Complain"
          subtitle="Fill below to add complain."
          parent="Complain"
          child="Create Complain"
        />

        <div style={{ padding: "20px", backgroundColor: "#ffffff" }}>
          {/* <div style={{ marginLeft: "80%" }}>
            <a onClick={this.handleBack}>
              <Icon type="arrow-left" style={{ marginRight: "10px" }} />
              Back
            </a>
          </div> */}

          <div>
            <Form
              onSubmit={this.handleSubmit}
              onReset={this.handleBack}
              className={styles.formstyle}
            >
              {/* Head */}
              <Row gutter={24}>
                <FormItem label="Complain No">
                  {getFieldDecorator("complain_no", {
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
                    />
                  )}
                </FormItem>
              </Row>

              <Row gutter={24}>
                <FormItem label="Model No">
                  {getFieldDecorator("model_no", {
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
                    />
                  )}
                </FormItem>
              </Row>

              <Row gutter={24}>
                <FormItem label="FUP No">
                  {getFieldDecorator("fup_no", {
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
                    />
                  )}
                </FormItem>
              </Row>

              {/* Waranty Information */}
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
                      rules: [
                        {
                          required: false,
                          pattern: numberPattern,
                          message: "Enter warranty "
                        }
                      ]
                    })(<Input placeholder="Enter Warranty" />)}
                  </FormItem>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <FormItem label="Working Hour :">
                    {getFieldDecorator("working_hour", {
                      rules: [
                        {
                          required: true,
                          pattern: numberPattern,
                          message: "Enter Number of Working hour "
                        }
                      ]
                    })(<Input placeholder="Enter Number of Working hour " />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <FormItem label="Warranty Description :">
                  {getFieldDecorator("warranty_description", {
                    rules: [
                      {
                        require: false,
                        message: "Warranty Description"
                      }
                    ]
                  })(<TextArea rows={4} style={{ width: "49%" }} />)}
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
                      rules: [
                        {
                          required: true,
                          pattern: wordPattern,
                          message: "Enter Customer Name "
                        }
                      ]
                    })(<Input placeholder="Enter Customer Name " />)}
                  </FormItem>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <FormItem label=" Customer Phone Number">
                    {getFieldDecorator("customer_phone_no", {
                      rules: [
                        {
                          required: true,
                          pattern: phoneNoPattern,
                          message: "Wrong phone no format"
                        }
                      ]
                    })(
                      <Input
                        // addonBefore={prefixSelector}
                        style={{ width: "100%" }}
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <FormItem label="Date">
                    {getFieldDecorator("date", {
                      required: true,
                      message: "Date required"
                    })(<DatePicker />)}
                  </FormItem>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <FormItem label="Distance">
                    {getFieldDecorator("distance", {
                      rules: [
                        {
                          required: true,
                          pattern: numberPattern,
                          message: "Enter Distance "
                        }
                      ]
                    })(<Input placeholder="Enter Distance " />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <FormItem label="Location">
                    {getFieldDecorator("location", {
                      rules: [
                        {
                          required: true,
                          message: "Enter location "
                        }
                      ]
                    })(<Input placeholder="Enter location " />)}
                  </FormItem>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <FormItem label="Amount">
                    {getFieldDecorator("amount", {
                      rules: [
                        {
                          required: true,
                          pattern: amountPattern,
                          message: "Wrong amount format "
                        }
                      ]
                    })(<Input placeholder="Enter amount " />)}
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
                      rules: [
                        {
                          required: true,
                          message: "Enter job title "
                        }
                      ]
                    })(<Input placeholder="Enter job title " />)}
                  </FormItem>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <FormItem label=" Complain Job Title">
                    {getFieldDecorator("complain_job_title", {
                      rules: [
                        {
                          required: true,
                          message: "Enter complain job title "
                        }
                      ]
                    })(<Input placeholder="Enter complain job title " />)}
                  </FormItem>
                </Col>
              </Row>
              <FormItem label="Description :">
                {getFieldDecorator("description", {
                  rules: [
                    {
                      require: false,
                      message: "Description"
                    }
                  ]
                })(<TextArea style={{ width: "49%" }} rows={6} />)}
              </FormItem>

              {/* Button */}
              <span style={{ marginLeft: "10%" }}>
                <Button
                  style={{ borderRadius: "20px", width: "150px" }}
                  type="primary"
                  htmlType="submit"
                >
                  Submit
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
)(Form.create()(NewComplain));
