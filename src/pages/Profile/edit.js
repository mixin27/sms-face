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
  Radio,
  Icon
} from "antd";
import {
  fetchEmployee,
  postEmployee,
  putEmployee,
  deleteEmployee
} from "../../actions/Employee";
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

const FormItem = Form.Item;
const Option = { Select };

const image = {
  width: "200px",
  height: "200px",
  backgroundColor: "#fff",
  padding: "20px",
  marginLeft: "5%"
};

// const apiUrl = "http://localhost:9991/";
const apiUrl = "http://api.teamf.ucsy2019.internship.irrasoft.com/";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      positions: [],
      departments: [],
      file: null,
      preview: null,
      data: {
        id: 0,
        emp_code: "",
        emp_name: "",
        gender: "",
        dob: "",
        nrc: "",
        position: "",
        department: "",
        job_start_date: "",
        phone_no: "",
        email: "",
        permanent_address: "",
        temp_address: "",
        father_name: "",
        mother_name: "",
        education: "",
        social_media_link: "",
        image: "",
        created_by: ""
      }
    };
  }

  componentDidMount() {
    this.getEmployee();

    this.getPosition();
    this.getDepartment();
  }

  async getEmployee() {
    const response = await api.get(`employee/${this.state.id}`);
    if (response && response.status == 200) {
      let data = response.data.data;
      let imgUrl = data.image ? apiUrl + data.image : "";
      this.setState({ data: data, preview: imgUrl });
      // this.setInitialValues();
    }
  }

  onPhotoChange = e => {
    let preview = URL.createObjectURL(e.target.files[0]);
    this.getBase64(e.target.files[0], result => {
      this.setState({ preview: preview, file: result });
    });
  };

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

  // setInitialValues = () => {
  //   const { data } = this.state.data;
  //   const { form } = this.props;
  //   if (data)
  //     form.setFieldsValue({
  //       id: data.id,
  //       name: data.name
  //     });
  // };

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
        if (this.state.file === null) {
          const emp = {
            emp_code: data.emp_code,
            emp_name: data.emp_name,
            gender: values.gender == 1 ? "Male" : "Female",
            // dob: data.dob,
            dob: moment(values.dob).format("YYYY/MM/DD"),
            nrc: data.nrc,
            // position: data.position,
            // department: data.department,
            // job_start_date: data.job_start_date,
            job_start_date: moment(values.job_start_date).format("YYYY/MM/DD"),
            phone_no: data.phone_no,
            email: data.email,
            permanent_address: data.permanent_address,
            temp_address: data.temp_address,
            father_name: data.father_name,
            mother_name: data.mother_name,
            education: data.education,
            social_media_link: data.social_media_link,
            updated_by: "admin"
          };
          this.props.putEmployee(emp, this.state.id);
        } else {
          const emp = {
            emp_code: data.emp_code,
            emp_name: data.emp_name,
            gender: values.gender == 1 ? "Male" : "Female",
            // dob: data.dob,
            dob: moment(values.dob).format("YYYY/MM/DD"),
            nrc: data.nrc,
            // position: data.position,
            // department: data.department,
            // job_start_date: data.job_start_date,
            job_start_date: moment(values.job_start_date).format("YYYY/MM/DD"),
            phone_no: data.phone_no,
            email: data.email,
            permanent_address: data.permanent_address,
            temp_address: data.temp_address,
            father_name: data.father_name,
            mother_name: data.mother_name,
            education: data.education,
            social_media_link: data.social_media_link,
            image: this.state.file,
            updated_by: "admin"
          };
          this.props.putEmployee(emp, this.state.id);
        }
        history.push("/profile");
      } else {
        console.log("Error occurred");
      }
    });
  };

  handleBack = () => {
    history.push("/profile");
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
      data: {
        ...this.state.data,
        position: value
      }
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
      data: {
        ...this.state.data,
        department: value
      }
    });
  };

  onSearch = value => {
    console.log(value);
  };

  handleDobDateChange = value => {
    this.setState({
      data: {
        ...this.state.data,
        dob: moment(value).format("YYYY/MM/DD")
      }
    });
  };

  handleJsDateChange = value => {
    this.setState({
      data: {
        ...this.state.data,
        job_start_date: moment(value).format("YYYY/MM/DD")
      }
    });
  };

  disabledDobDate = current => {
    // Can not select days before today and today
    return current && current > moment().startOf("day");
  };

  disabledJsDate = current => {
    // Can not select days before today and today
    return current && current > moment().endOf("day");
  };

  render() {
    const posArr = [...this.state.positions];
    const deptArr = [...this.state.departments];
    const { data } = this.state;
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
          title="Update Employee"
          subtitle="You can add Employee basic data by entering one after CLicking the Add New button and can see  the employee data table"
          // parent="Complain"
          // child="Create Complain"
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
                      initialValue: data.emp_code,
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
                        onChange={this.handleChange("emp_code")}
                      />
                    )}
                  </FormItem>
                </Col>

                <Col span={12}>
                  <FormItem label="Name">
                    {getFieldDecorator("emp_name", {
                      initialValue: data.emp_name,
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
                        onChange={this.handleChange("emp_name")}
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <FormItem label="Gender">
                    {getFieldDecorator("gender", {
                      initialValue: data.gender == "Male" ? 1 : 2,
                      rules: [
                        {
                          required: true,
                          message: "Gender Required"
                        }
                      ]
                    })(
                      <Radio.Group style={{ marginLeft: "30px" }}>
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
                  <Col xs={24} sm={24} md={6} lg={6}>
                    <FormItem label="Date of Birth">
                      {getFieldDecorator("dob", {
                        initialValue:
                          data.dob == null ? moment() : moment(data.dob),
                        rules: [
                          {
                            required: true,
                            message: "Date required"
                          }
                        ]
                      })(
                        <DatePicker
                          onChange={this.handleDobDateChange}
                          disabledDate={this.disabledDobDate}
                        />
                      )}
                    </FormItem>
                  </Col>
                </Col>
              </Row>

              {/* NRC */}
              {/* <Divider orientation="left">Warranty Information</Divider> */}
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <FormItem label="NIRC :" style={{ marginLeft: "30px" }}>
                    {getFieldDecorator("nrc", {
                      initialValue: data.nrc,
                      rules: [
                        {
                          required: false,
                          pattern: nrcPattern,
                          message: "Wrong NRC format "
                        }
                      ]
                    })(
                      <Input
                        placeholder="Enter NRC"
                        onChange={this.handleChange("nrc")}
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Divider orientation="left">Job Information</Divider>
              <Row>
                <Col span={12}>
                  <span>
                    <FormItem label="Position" />
                    {this.state.data.position}
                    {/* <Select
                      style={{ width: 316, marginLeft: "30px" }}
                      placeholder="Select Position"
                      onChange={this.onPositionChange}
                      value={this.state.data.position}
                    >
                      {posArr.map(pos => (
                        <Option key={pos.position_type}>
                          {pos.position_type}
                        </Option>
                      ))}
                    </Select> */}
                  </span>
                </Col>

                {/**Select department */}
                <Col span={12}>
                  <span>
                    <FormItem label="Department" />
                    {this.state.data.department}
                    {/* <Divider orientation="left">Job Information</Divider> */}
                    {/* <Select
                      style={{ width: 316, marginLeft: "30px" }}
                      placeholder="Select Department"
                      onChange={this.onDepartmentChange}
                      value={this.state.data.department}
                    >
                      {deptArr.map(dept => (
                        <Option key={dept.dept_name}>{dept.dept_name}</Option>
                      ))}
                    </Select> */}
                  </span>
                </Col>
              </Row>

              {/* Customer Information */}

              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <FormItem
                    label="Job Starting Date"
                    style={{ marginLeft: "30px", marginTop: "16px" }}
                  >
                    {getFieldDecorator("job_start_date", {
                      initialValue:
                        data.job_start_date == null
                          ? moment()
                          : moment(data.job_start_date),
                      rules: [
                        {
                          required: true,
                          message: "Job Starting Date"
                        }
                      ]
                    })(
                      <DatePicker
                        onChange={this.handleJsDateChange}
                        disabledDate={this.disabledJsDate}
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <FormItem label="Phone Number">
                    {getFieldDecorator("phone_no", {
                      initialValue:
                        data.phone_no == undefined ? "" : data.phone_no,
                      rules: [
                        {
                          required: true,
                          pattern: phoneNoPattern,
                          message: "Please input your phone number!"
                        }
                      ]
                    })(
                      <Input
                        style={{ width: "100%" }}
                        onChange={this.handleChange("phone_no")}
                      />
                    )}
                  </FormItem>
                </Col>

                <Col span={12}>
                  <FormItem label="Email Address">
                    {getFieldDecorator("email", {
                      initialValue: data.email,
                      rules: [
                        {
                          required: true,
                          pattern: emailPattern,
                          message: "Enter Email address"
                        }
                      ]
                    })(
                      <Input
                        placeholder="Enter email address"
                        onChange={this.handleChange("email")}
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <FormItem label="Permanenet Address">
                    {getFieldDecorator("permanent_address", {
                      initialValue: data.permanent_address,
                      rules: [
                        {
                          required: true,
                          message: "Enter Permanent Address"
                        }
                      ]
                    })(
                      <Input
                        placeholder="Enter Permanent Address"
                        onChange={this.handleChange("permanent_address")}
                      />
                    )}
                  </FormItem>
                </Col>

                <Col span={12}>
                  <FormItem label="Temporary Address">
                    {getFieldDecorator("temp_address", {
                      initialValue: data.temp_address,
                      rules: [
                        {
                          required: true,
                          message: "Enter Temporary address"
                        }
                      ]
                    })(
                      <Input
                        placeholder="Enter temporary address"
                        onChange={this.handleChange("temp_address")}
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>

              <Divider orientation="left">Personal Information</Divider>
              <Row gutter={24}>
                <Col span={12}>
                  <FormItem label="Father">
                    {getFieldDecorator("father_name", {
                      initialValue: data.father_name,
                      rules: [
                        {
                          required: true,
                          pattern: wordPattern,
                          message: "Enter Father Name"
                        }
                      ]
                    })(
                      <Input
                        placeholder="Enter father name"
                        onChange={this.handleChange("father_name")}
                      />
                    )}
                  </FormItem>
                </Col>

                <Col span={12}>
                  <FormItem label="Mother">
                    {getFieldDecorator("mother_name", {
                      initialValue: data.mother_name,
                      rules: [
                        {
                          required: true,
                          pattern: wordPattern,
                          message: "Enter Mother Name"
                        }
                      ]
                    })(
                      <Input
                        placeholder="Enter Mother name"
                        onChange={this.handleChange("mother_name")}
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>

              <Divider orientation="left">Other Information</Divider>
              <Row gutter={24}>
                <Col span={12}>
                  <FormItem label="Education">
                    {getFieldDecorator("education", {
                      initialValue: data.education,
                      rules: [
                        {
                          required: true,
                          message: "Enter Education"
                        }
                      ]
                    })(
                      <Input
                        placeholder="Enter Education "
                        onChange={this.handleChange("education")}
                      />
                    )}
                  </FormItem>
                </Col>

                <Col span={12}>
                  <FormItem label="Social Media link">
                    {getFieldDecorator("social_media_link", {
                      initialValue: data.social_media_link,
                      rules: [
                        {
                          required: true,
                          message: "Enter social media link"
                        }
                      ]
                    })(
                      <Input
                        placeholder="Enter social media link "
                        onChange={this.handleChange("social_media_link")}
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>

              {/* Button */}
              <span style={{ marginLeft: "30%" }}>
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
    employees: state.employee.list
  };
}

export default connect(
  mapStateToProps,
  { fetchEmployee, postEmployee, putEmployee, deleteEmployee }
)(Form.create()(EditProfile));
