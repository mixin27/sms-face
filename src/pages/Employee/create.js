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
  fetchEmployee,
  postEmployee,
  putEmployee,
  deleteEmployee
} from "../../actions/Employee";
import { postUser } from "../../actions/UserAccount";
import { connect } from "react-redux";
import PageHeaderWrapper from "../../components/PageHeaderWrapper";
import history from "../../router/history";
import api from "../../apis";
import moment from "moment";

// RegExp
import {
  emailPattern,
  phoneNoPattern,
  wordPattern,
  nrcPattern
} from "../../utils/validate-pattern";

import profilePlaceHolder from "../../assets/img/man.svg";

import styles from "../../styles/custom.module.less";
// import btnStyles from "./index.module.less";

const FormItem = Form.Item;
const Option = { Select };

const image = {
  width: "200px",
  height: "200px",
  border: "1px dashed blue",
  backgroundColor: "#fff",
  padding: "20px",
  marginLeft: "5%",
  marginBottom: "10px"
};

class NewEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPosition: "",
      selectedDepartment: "",
      positions: [],
      departments: [],
      file: null,
      preview: null
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const employee = {
          emp_code: values.emp_code,
          emp_name: values.emp_name,
          gender: values.gender == 1 ? "Male" : "Female",
          dob:
            values.dob == null ? moment().format("YYYY/MM/DD") : moment(values.dob).format("YYYY/MM/DD"),
          nrc: values.nrc,
          position: this.state.selectedPosition,
          department: this.state.selectedDepartment,
          job_start_date:
            values.job_start_date == null
              ? moment().format("YYYY/MM/DD")
              : moment(values.job_start_date).format("YYYY/MM/DD"),
          phone_no: values.phone_no,
          email: values.email,
          permanent_address: values.permanent_address,
          temp_address: values.temp_address,
          father_name: values.father_name,
          mother_name: values.mother_name,
          education: values.education,
          social_media_link: values.social_media_link,
          image: this.state.file,
          job_status: "available",
          created_by: "admin",
          updated_by: "admin"
        };

        const user = {
          user_name: values.emp_name,
          password_hash: "test",
          phone_no: values.phone_no,
          email: values.email,
          role:
            this.state.selectedPosition === "Service Man"
              ? "service-man"
              : "employee",
          created_by: "admin",
          updated_by: "admin"
        };

        this.props.postEmployee(employee);
        this.props.postUser(user);
        history.push("/employees");
      }
    });
  };

  handleBack = () => {
    history.push("/employees");
  };

  handleClear = () => {};

  handleFormLayoutChange = e => {
    this.setState({ formLayout: e.target.value });
  };

  // Positions
  getPosition = () => {
    api
      .get(`positions`)
      .then(response => {
        this.setState({
          positions: response.data.data
        });
      })
      .catch(e => console.log(e));
  };

  onPositionChange = value => {
    console.log(value);
    this.setState({
      selectedPosition: value
    });
  };

  // Department
  getDepartment = () => {
    api
      .get(`departments`)
      .then(response => {
        this.setState({
          departments: response.data.data
        });
      })
      .catch(e => console.log(e));
  };

  onDepartmentChange = value => {
    console.log(value);
    this.setState({
      selectedDepartment: value
    });
  };

  onSearch = value => {
    console.log(value);
  };

  onDobDateChange = value => {
    console.log(moment(value).format("DD/MM/YYYY"));
    this.setState({
      data: {
        ...this.state.data,
        dob: moment(value).format("DD/MM/YYYY")
      }
    });
  };

  onJSDateChange = value => {
    console.log(moment(value).format("DD/MM/YYYY"));
    this.setState({
      data: {
        ...this.state.data,
        job_start_date: moment(value).format("DD/MM/YYYY")
      }
    });
  };

  // Disabled Date
  disabledDobDate = current => {
    // Can not select days before today and today
    return current && current > moment().startOf("day");
  };

  disabledJsDate = current => {
    // Can not select days before today and today
    return current && current > moment().endOf("day");
  };

  // Photo Upload
  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      cb(reader.result);
    };
    reader.onerror = function(error) {
      console.log("Error: ", error);
    };
  }

  onPhotoChange = e => {
    let preview = URL.createObjectURL(e.target.files[0]);
    this.getBase64(e.target.files[0], result => {
      this.setState({ preview: preview, file: result });
    });
  };

  onPhotoClose = () => {
    this.setState({ preview: null });
  };

  onPhotoCrop = preview => {
    this.setState({ preview });
  };

  componentDidMount() {
    this.getPosition();
    this.getDepartment();
  }

  render() {
    const posArr = [...this.state.positions];
    const deptArr = [...this.state.departments];
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
          title="Create Employee"
          subtitle="You can add Employee basic data by entering one after CLicking the Add New button and can see  the employee data table"
          parent="Configuration"
          child="Employee"
          subchild="Create Employee"
        />

        <div style={{ padding: "20px", backgroundColor: "#ffffff" }}>
          <div style={{ marginLeft: "80%" }}>
            <a onClick={this.handleBack}>
              <Icon type="arrow-left" style={{ marginRight: "10px" }} />
              Back
            </a>
          </div>

          <div>
            <Form
              onSubmit={this.handleSubmit}
              onReset={this.handleBack}
              className={styles.formstyle}
            >
              {/* Photo Upload */}
              <Row gutter={24}>
                <img
                  src={
                    this.state.preview == null
                      ? profilePlaceHolder
                      : this.state.preview
                  }
                  style={image}
                />
                <FormItem style={{ marginLeft: "5%" }}>
                  {getFieldDecorator("image", {
                    rules: [
                      {
                        required: false,
                        message: "Please upload your image"
                      }
                    ]
                  })(
                    <input
                      type="file"
                      name="image"
                      onChange={this.onPhotoChange}
                    />
                    // <div className={btnStyles.uploadBtnWrapper}>
                    //   <button className={btnStyles.btn}>Upload Photo</button>
                    //   <input
                    //     type="file"
                    //     name="image"
                    //     onChange={this.onPhotoChange}
                    //   />
                    // </div>
                  )}
                </FormItem>
              </Row>

              {/* Head */}
              <Row gutter={24}>
                <Col span={12}>
                  <FormItem label="Employee Code">
                    {getFieldDecorator("emp_code", {
                      rules: [
                        {
                          required: true,
                          message: "Enter Employee code"
                        }
                      ]
                    })(
                      <Input
                        style={{ width: "50%" }}
                        placeholder="Enter Employee code"
                      />
                    )}
                  </FormItem>
                </Col>

                <Col span={12}>
                  <FormItem label="Name">
                    {getFieldDecorator("emp_name", {
                      rules: [
                        {
                          required: true,
                          pattern: wordPattern,
                          message: "Enter Name "
                        }
                      ]
                    })(
                      <Input
                        style={{ width: "50%" }}
                        placeholder="Enter Name"
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <FormItem label="Gender">
                    {getFieldDecorator("gender", {
                      initialValue: 1,
                      rules: [
                        {
                          required: true,
                          message: "Gender Required"
                        }
                      ]
                    })(
                      <Radio.Group style={{ marginLeft: "30px" }} value={1}>
                        <Radio value={1}>
                          <span style={{ fontSize: "10px" }}>Male</span>
                        </Radio>
                        <Radio value={2}>
                          <span style={{ fontSize: "10px" }}>Female</span>
                        </Radio>
                      </Radio.Group>
                    )}
                  </FormItem>
                </Col>

                <Col span={12}>
                  <Col xs={24} sm={24} md={6} lg={8}>
                    <FormItem label="Date of Birth">
                      {getFieldDecorator("dob", {
                        required: true,
                        message: "Date required"
                      })(<DatePicker disabledDate={this.disabledDobDate} />)}
                    </FormItem>
                  </Col>
                </Col>
              </Row>

              {/* NRC */}
              {/* <Divider orientation="left">Warranty Information</Divider> */}
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <FormItem label="NRIC :" style={{ marginLeft: "30px" }}>
                    {getFieldDecorator("nrc", {
                      rules: [
                        {
                          required: true,
                          pattern: nrcPattern,
                          message: "Wrong NRIC format "
                        }
                      ]
                    })(<Input placeholder="Enter NRC" />)}
                  </FormItem>
                </Col>
              </Row>
              <Divider orientation="left">Job Information</Divider>
              <Row>
                <Col span={12}>
                  <span>
                    <FormItem label="Select Position" />
                    {/* <Divider orientation="left">Job Information</Divider> */}
                    <Select
                      style={{ width: 316, marginLeft: "30px" }}
                      placeholder="Select Position"
                      onChange={this.onPositionChange}
                    >
                      {posArr.map(pos => (
                        <Option key={pos.position_type}>
                          {pos.position_type}
                        </Option>
                      ))}
                    </Select>
                  </span>
                </Col>

                {/**Select department */}
                <Col span={12}>
                  <span>
                    <FormItem label="Selcct Department" />
                    {/* <Divider orientation="left">Job Information</Divider> */}
                    <Select
                      style={{ width: 316, marginLeft: "30px" }}
                      placeholder="Select Department"
                      onChange={this.onDepartmentChange}
                    >
                      {deptArr.map(dept => (
                        <Option key={dept.dept_name}>{dept.dept_name}</Option>
                      ))}
                    </Select>
                  </span>
                </Col>
              </Row>

              {/* Customer Information */}

              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <FormItem
                    label="Job Starting Date"
                    style={{ marginLeft: "30px" }}
                  >
                    {getFieldDecorator("job_start_date", {
                      required: true,
                      message: "Job Starting Date"
                    })(<DatePicker disabledDate={this.disabledJsDate} />)}
                  </FormItem>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <FormItem label="Phone Number">
                    {getFieldDecorator("phone_no", {
                      rules: [
                        {
                          required: true,
                          pattern: phoneNoPattern,
                          message: "Wrong phone no format"
                        }
                      ]
                    })(<Input style={{ width: "100%" }} />)}
                  </FormItem>
                </Col>

                <Col span={12}>
                  <FormItem label="Email Address">
                    {getFieldDecorator("email", {
                      rules: [
                        {
                          required: true,
                          pattern: emailPattern,
                          message: "Enter Email address"
                        }
                      ]
                    })(<Input placeholder="Enter email address" />)}
                  </FormItem>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <FormItem label="Permanenet Address">
                    {getFieldDecorator("permanent_address", {
                      rules: [
                        {
                          required: true,
                          message: "Enter Permanent Address"
                        }
                      ]
                    })(<Input placeholder="Enter Permanent Address" />)}
                  </FormItem>
                </Col>

                <Col span={12}>
                  <FormItem label="Temporary Address">
                    {getFieldDecorator("temp_address", {
                      rules: [
                        {
                          required: true,
                          message: "Enter Temporary address"
                        }
                      ]
                    })(<Input placeholder="Enter temporary address" />)}
                  </FormItem>
                </Col>
              </Row>

              <Divider orientation="left">Personal Information</Divider>
              <Row gutter={24}>
                <Col span={12}>
                  <FormItem label="Father">
                    {getFieldDecorator("father_name", {
                      rules: [
                        {
                          required: true,
                          pattern: wordPattern,
                          message: "Enter Father Name"
                        }
                      ]
                    })(<Input placeholder="Enter father name" />)}
                  </FormItem>
                </Col>

                <Col span={12}>
                  <FormItem label="Mother">
                    {getFieldDecorator("mother_name", {
                      rules: [
                        {
                          required: true,
                          pattern: wordPattern,
                          message: "Enter Mother Name"
                        }
                      ]
                    })(<Input placeholder="Enter Mother name" />)}
                  </FormItem>
                </Col>
              </Row>

              <Divider orientation="left">Other Information</Divider>
              <Row gutter={24}>
                <Col span={12}>
                  <FormItem label="Education">
                    {getFieldDecorator("education", {
                      rules: [
                        {
                          required: true,
                          message: "Enter Education"
                        }
                      ]
                    })(<Input placeholder="Enter Education " />)}
                  </FormItem>
                </Col>

                <Col span={12}>
                  <FormItem label="Social Media link">
                    {getFieldDecorator("social_media_link", {
                      rules: [
                        {
                          required: true,
                          message: "Enter social media link"
                        }
                      ]
                    })(<Input placeholder="Enter social media link " />)}
                  </FormItem>
                </Col>
              </Row>

              {/* Other information */}

              {/* Button */}
              <span style={{ marginLeft: "30%" }}>
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
    employees: state.employee.list
  };
}

export default connect(
  mapStateToProps,
  { fetchEmployee, postEmployee, putEmployee, deleteEmployee, postUser }
)(Form.create()(NewEmployee));
