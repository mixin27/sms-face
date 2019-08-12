import React from "react";
import Can from "../../utils/Can";
import PageHeaderWrapper from "../../components/PageHeaderWrapper";
import Forbidden from "../Forbidden";
import api from "apis";
import {
  Icon,
  Card,
  Row,
  Col,
  Form,
  DatePicker,
  Input,
  Radio,
  Button,
  Checkbox
} from "antd";
import { fetchEmployee, fetchServiceManByStatus } from "../../actions/Employee";
import { postSchedule, putSchedule } from "../../actions/Schedule";
import { putComplain, putComplainByComplainNo } from "../../actions/Complain";
import { connect } from "react-redux";
import MachineHistory from "../MachineHistory";
import AvailableServiceMan from "../ServiceMan/available-serviceman";
import moment from "moment";

import styles from "../../styles/custom.module.less";
import { amountPattern } from "../../utils/validate-pattern";
import { Link } from "react-router-dom";
import ScrollServiceManStatusTable from "../ServiceMan/custom/CustomServiceManStatusTable";
import history from "../../router/history";

import iconPersonalInformation from "../../assets/img/menu/portfolio.svg";
import iconMachineHistory from "../../assets/img/menu/machine.svg";
import iconComplainInformation from "../../assets/img/menu/complain.svg";
import iconServiceManInformation from "../../assets/img/menu/couple.svg";

const FormItem = Form.Item;
const { TextArea } = Input;
const uuidv4 = require("uuid/v4");

// Start Date ~ End date
const { MonthPicker, RangePicker } = DatePicker;

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
}

function disabledDateTime() {
  return {
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56]
  };
}

function disabledRangeTime(_, type) {
  if (type === "start") {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56]
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56]
  };
}

let serviceManList = [];
let serviceManCode = "";

class AcceptAssignSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      complain_no: this.props.match.params.complain_no,
      serviceMenId: "",
      complainData: {},
      start_date: "",
      end_date: "",
      watching_list: 0,
      inspection: 0
    };
  }

  componentDidMount() {
    // this.getScheduleData();
    this.getComplainData();

    this.getAvailableServiceMan();
  }

  getAvailableServiceMan() {
    this.props.fetchServiceManByStatus("available");
    // this.props.fetchEmployee();
  }

  // async getScheduleData() {
  //   const response = await api.get(`schedules/${this.state.id}`);
  //   if (response && response.status == 200) {
  //     this.setState({ data: response.data.data });
  //   }
  // }

  async getComplainData() {
    const response = await api.get(
      `complains/complain/${this.state.complain_no}`
    );
    if (response && response.status == 200) {
      this.setState({
        complainData: response.data.data
      });
    }
  }

  onStartEndDateChange = (value, dateString) => {
    console.log(dateString[0]);
    console.log(dateString[1]);
    this.setState({
      start_date: dateString[0],
      end_date: dateString[1]
    });
  };

  handleRowCheckChange = e => {
    if (e.target.checked) {
      console.log(e.target.checked);

      // serviceManList.push(e.target.value)

      // console.log(this.getServiceManList());

      serviceManCode = e.target.value;
      console.log(serviceManCode);
    } else {
      console.log(e.target.checked);
    }
  };

  getServiceManList() {
    let men = "";
    serviceManList.map(item => {
      men += item + " ";
    });
    return men;
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const schedule = {
          job_code: values.job_code,
          complain_no: this.state.complainData.complain_no,
          fup_no: this.state.complainData.fup_no,
          model_no: this.state.complainData.model_no,
          start_date: this.state.start_date,
          end_date: this.state.end_date,
          ammount: values.amount,
          service_charge: values.service_charge,
          inspection: values.inspection == 0 ? "No" : "Yes",
          watching_list: values.watching_list == 0 ? "No" : "Yes",
          schedule_job_title: values.schedule_job_title,
          schedule_job_status: "Assign",
          schedule_job_description: values.schedule_job_description,
          emp_code: serviceManCode,
          interval: moment
            .duration(
              moment(this.state.end_date).diff(moment(this.state.start_date))
            )
            .days(),
          created_by: "admin",
          updated_by: "admin"
        };

        const complain = {
          complain_status: 1,
          updated_by: "admin"
        };

        this.props.putComplainByComplainNo(
          complain,
          this.state.complainData.complain_no
        );
        this.props.postSchedule(schedule);

        history.push("/assigntoschedule");
      }
    });
  };

  render() {
    const { complainData } = this.state;
    const { getFieldDecorator } = this.props.form;

    let data = this.props.employees;
    data.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    });

    const columns = [
      {
        title: "",
        render: record => (
          <>
            <span>
              <Checkbox
                value={record.emp_code}
                onChange={this.handleRowCheckChange}
              />
            </span>
          </>
        )
      },
      {
        title: "Name",
        dataIndex: "emp_name",
        key: "emp_name",
        align: "center",
        editable: true,
        width: "15%",
        sorter: (a, b) => a.emp_name.length - b.emp_name.length,
        sortDirections: ["ascend", "descend"]
      },
      {
        title: "Position",
        dataIndex: "position",
        width: "15%",
        align: "center",
        key: "position",
        sorter: (a, b) => a.position.length - b.position.length,
        sortDirections: ["descend", "ascend"],
        editable: true
      },
      {
        title: "Department",
        dataIndex: "department",
        width: "15%",
        align: "center",
        key: "department",
        sorter: (a, b) => a.department.length - b.department.length,
        sortDirections: ["descend", "ascend"],
        editable: true
      },
      {
        title: "NRC",
        dataIndex: "nrc",
        key: "nrc",
        align: "center",
        editable: true,
        width: "15%",
        sortDirections: ["ascend", "descend"],
        sorter: (a, b) => a.nrc.length - b.nrc.length
      },
      {
        title: "Address",
        dataIndex: "temp_address",
        width: "15%",
        align: "center",
        key: "temp_address",
        sorter: (a, b) => a.temp_address.length - b.temp_address.length,
        sortDirections: ["descend", "ascend"],
        editable: true
      },
      {
        title: "Phone",
        dataIndex: "phone_no",
        width: "15%",
        align: "center",
        key: "phone_no",
        sorter: (a, b) => a.phone_no.length - b.phone_no.length,
        sortDirections: ["descend", "ascend"],
        editable: true
      },
      {
        title: "Email",
        dataIndex: "email",
        width: "15%",
        align: "center",
        key: "email",
        sorter: (a, b) => a.email.length - b.Email.length,
        sortDirections: ["descend", "ascend"],
        editable: true
      }
    ];

    return (
      <div>
        <Can
          role="Admin"
          perform="schedule:list"
          no={() => {
            return <Forbidden />;
          }}
        >
          <PageHeaderWrapper
            title="Accept Schedule"
            subtitle="Complain list here."
            parent="Schedule"
          />

          <Card bordered={false}>
            <Row gutter={24}>
              <Col xs={24} sm={24} md={6} lg={3}>
                <span style={{ color: "#222222" }}>Complain No : </span>
              </Col>
              <Col xs={24} sm={24} md={6} lg={6}>
                <span style={{ color: "#0277BD" }}>
                  {complainData.complain_no}
                </span>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24} sm={24} md={6} lg={3}>
                <span style={{ color: "#222222" }}>FUP No : </span>
              </Col>
              <Col xs={24} sm={24} md={6} lg={6}>
                <span style={{ color: "#0277BD" }}>{complainData.fup_no}</span>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24} sm={24} md={6} lg={3}>
                <span style={{ color: "#222222" }}>Model No : </span>
              </Col>
              <Col xs={24} sm={24} md={6} lg={6}>
                <span style={{ color: "#0277BD" }}>{complainData.model_no}</span>
              </Col>
            </Row>
          </Card>

          <Card bordered={false}>
            <h2>
              <img
                style={{ margin: "5px", height: 20, width: 20 }}
                src={iconComplainInformation}
              />{" "}
              Complain Information
            </h2>
            <Card bordered={true}>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Warranty :</h3>
                  <p style={{ color: "#0277BD" }}>{complainData.warranty_year} years</p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Working Hour :</h3>
                  <p style={{ color: "#0277BD" }}>{complainData.working_hr} hours</p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Job Title :</h3>
                  <p style={{ color: "#0277BD" }}>{complainData.job_title}</p>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={12}>
                  <h3>Warranty Description :</h3>
                  <p style={{ color: "#0277BD" }}>{complainData.warranty_description}</p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={12}>
                  <h3>Job Description :</h3>
                  <p style={{ color: "#0277BD" }}>{complainData.description}</p>
                </Col>
              </Row>
            </Card>

            <h2>
              <img
                style={{ margin: "5px", height: 20, width: 20 }}
                src={iconPersonalInformation}
              />{" "}
              Customer Information
            </h2>
            <Card bordered={true}>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Customer Name :</h3>
                  <p style={{ color: "#0277BD" }}>{complainData.customer_name}</p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Customer Phone No :</h3>
                  <p style={{ color: "#0277BD" }}>{complainData.customer_phone_no}</p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Distance :</h3>
                  <p style={{ color: "#0277BD" }}>{complainData.distance} miles</p>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Date :</h3>
                  <p style={{ color: "#0277BD" }}>{moment(complainData.date).format("YYYY/MM/DD")}</p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Amount :</h3>
                  <p style={{ color: "#0277BD" }}>{complainData.amount} kyat</p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Location :</h3>
                  <p style={{ color: "#0277BD" }}>{complainData.location}</p>
                </Col>
              </Row>
            </Card>
            <h2>
              <img
                style={{ margin: "5px", height: 20, width: 20 }}
                src={iconMachineHistory}
              />{" "}
              Machine History Information
            </h2>
            <MachineHistory />

            <h2 style={{ textAlign: "center", color: "#0277BD" }}>
              To Assign Schedule
            </h2>
            <Card bordered={true}>
              <Form onSubmit={this.handleSubmit} className={styles.formStyle}>
                <h4>
                  <img
                    style={{ margin: "5px", height: 20, width: 20 }}
                    src={iconPersonalInformation}
                  />{" "}
                  Service Information
                </h4>

                <Row gutter={24}>
                  <Col xs={24} sm={24} md={6} lg={8}>
                    <FormItem label="Date">
                      {getFieldDecorator("dob", {
                        rules: [
                          {
                            required: true,
                            message: "Date required"
                          }
                        ]
                      })(
                        <RangePicker
                          disabledDate={disabledDate}
                          // disabledTime={disabledRangeTime}
                          showTime={{
                            hideDisabledOptions: true
                            // defaultValue: [
                            //   moment("00:00:00", "HH:mm:ss"),
                            //   moment("11:59:59", "HH:mm:ss")
                            // ]
                          }}
                          format="YYYY/MM/DD"
                          onChange={this.onStartEndDateChange}
                          style={{ width: "80%" }}
                        />
                      )}
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

                  <Col xs={24} sm={24} md={6} lg={6}>
                    <FormItem label="Service Charge">
                      {getFieldDecorator("service_charge", {
                        rules: [
                          {
                            required: true,
                            message: "Required service charge "
                          }
                        ]
                      })(<Input placeholder="Enter service charge " />)}
                    </FormItem>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} sm={24} md={6} lg={6}>
                    <FormItem label="Inspection">
                      {getFieldDecorator("inspection", {
                        initialValue: 1,
                        rules: [
                          {
                            required: true,
                            message: "Inspection Required"
                          }
                        ]
                      })(
                        <Radio.Group style={{ marginLeft: "30px" }}>
                          <Radio value={1}>
                            <span style={{ fontSize: "10px" }}>Yes</span>
                          </Radio>
                          <Radio value={0}>
                            <span style={{ fontSize: "10px" }}>No</span>
                          </Radio>
                        </Radio.Group>
                      )}
                    </FormItem>
                  </Col>

                  <Col xs={24} sm={24} md={6} lg={6}>
                    <FormItem label="Watching List">
                      {getFieldDecorator("watching_list", {
                        initialValue: 1,
                        rules: [
                          {
                            required: true,
                            message: "Watching List Required"
                          }
                        ]
                      })(
                        <Radio.Group style={{ marginLeft: "30px" }}>
                          <Radio value={1}>
                            <span style={{ fontSize: "10px" }}>Yes</span>
                          </Radio>
                          <Radio value={0}>
                            <span style={{ fontSize: "10px" }}>No</span>
                          </Radio>
                        </Radio.Group>
                      )}
                    </FormItem>
                  </Col>
                </Row>

                <h3>
                  <img
                    style={{ margin: "5px", height: 20, width: 20 }}
                    src={iconPersonalInformation}
                  />{" "}
                  Job Information
                </h3>

                <Row gutter={24}>
                  <Col xs={24} sm={24} md={6} lg={6}>
                    <FormItem label="Job Code">
                      {getFieldDecorator("job_code", {
                        rules: [
                          {
                            required: true,
                            message: "Required Job Code "
                          }
                        ]
                      })(<Input placeholder="Enter Job Code " />)}
                    </FormItem>
                  </Col>

                  <Col xs={24} sm={24} md={6} lg={6}>
                    <FormItem label="Job Status">
                      {getFieldDecorator("job_status", {
                        initialValue: "Assign",
                        rules: [
                          {
                            required: true,
                            message: "Required Job Status "
                          }
                        ]
                      })(<Input disabled placeholder="Enter Job Status " />)}
                    </FormItem>
                  </Col>

                  <Col xs={24} sm={24} md={6} lg={6}>
                    <FormItem label="Job Title">
                      {getFieldDecorator("schedule_job_title", {
                        rules: [
                          {
                            required: true,
                            message: "Required Job Title "
                          }
                        ]
                      })(<Input placeholder="Enter Job Title " />)}
                    </FormItem>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} sm={24} md={6} lg={12}>
                    <FormItem label="Job Description :">
                      {getFieldDecorator("schedule_job_description", {
                        rules: [
                          {
                            require: false,
                            message: "Description"
                          }
                        ]
                      })(<TextArea rows={6} />)}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Card>

            <h2>
              <img
                style={{ margin: "5px", height: 20, width: 20 }}
                src={iconServiceManInformation}
              />{" "}
              Service Man Information
            </h2>
            {/* <AvailableServiceMan schedules={this.state} assignAccept={true} /> */}
            <ScrollServiceManStatusTable
              dataSource={data}
              columns={columns}
              showStatus={false}
            />
          </Card>

          <Card bordered={false}>
            <span style={{ marginLeft: "30%" }}> </span>
            <Button
              type="primary"
              style={{ borderRadius: "20px", width: "150px" }}
              onClick={this.handleSubmit}
            >
              Assign
            </Button>
            <span style={{ marginLeft: "30px" }}> </span>
            <Link to={`/assigntoschedule`}>
              <Button
                type="add"
                style={{ borderRadius: "20px", width: "150px" }}
              >
                Cancel
              </Button>
            </Link>
          </Card>
        </Can>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    employees: state.employee.list,
    schedules: state.schedule.list,
    complains: state.complain.list
  };
}

export default connect(
  mapStateToProps,
  {
    fetchEmployee,
    fetchServiceManByStatus,
    postSchedule,
    putSchedule,
    putComplain,
    putComplainByComplainNo
  }
)(Form.create()(AcceptAssignSchedule));
