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
  Button
} from "antd";
import {
  fetchSchedules,
  postSchedule,
  putSchedule
} from "../../actions/Schedule";
import { putComplain, putComplainByComplainNo } from "../../actions/Complain";
import { connect } from "react-redux";
import MachineHistory from "../MachineHistory";
import moment from "moment";

import { Link } from "react-router-dom";
import history from "../../router/history";

import iconPersonalInformation from "../../assets/img/menu/portfolio.svg";
import iconMachineHistory from "../../assets/img/menu/machine.svg";
import iconComplainInformation from "../../assets/img/menu/complain.svg";

class JobDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      complain_no: this.props.match.params.complain_no,
      data: {},
      complainData: {},
      start_date: "",
      end_date: "",
      watching_list: 0,
      inspection: 0
    };
  }

  componentDidMount() {
    this.getScheduleData();
    this.getComplainData();
  }

  async getScheduleData() {
    const response = await api.get(`schedules/${this.state.id}`);
    if (response && response.status == 200) {
      this.setState({ data: response.data.data });
    }
  }

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

  handleJobStart = id => {
    const schedule = {
      schedule_job_status: "On Going",
      updated_by: "service-man"
    };
    this.props.putSchedule(schedule, id);
    history.push("/job");
  };

  handleJobDone = id => {
    const schedule = {
      schedule_job_status: "Complete",
      updated_by: "service-man"
    };
    this.props.putSchedule(schedule, id);
    history.push("/job");
  };

  render() {
    const { data, complainData } = this.state;
    return (
      <div>
        <Can
          role="Admin"
          perform="schedule:list"
          no={() => {
            return <Forbidden />;
          }}
        >
          <PageHeaderWrapper title="Job" parent="Job" child="Full Detail" />

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
                src={iconPersonalInformation}
              />{" "}
              Customer Personal Information
            </h2>
            <Card bordered={true}>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <p>Customer Name :</p>
                  <p style={{ color: "#0277BD" }}>{complainData.customer_name}</p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <p>Customer Phone No :</p>
                  <p style={{ color: "#0277BD" }}>
                    {complainData.customer_phone_no}
                  </p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <p>Distance :</p>
                  <p style={{ color: "#0277BD" }}>{complainData.distance} miles</p>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <p>Date :</p>
                  <p style={{ color: "#0277BD" }}>
                    {moment(complainData.date).format("YYYY/MM/DD")}
                  </p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <p>Amount :</p>
                  <p style={{ color: "#0277BD" }}>{complainData.amount} kyat</p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <p>Location :</p>
                  <p style={{ color: "#0277BD" }}>{complainData.location}</p>
                </Col>
              </Row>
            </Card>

            <h2>
              <img
                style={{ margin: "5px", height: 20, width: 20 }}
                src={iconComplainInformation}
              />{" "}
              Complain Information
            </h2>
            <Card bordered={true}>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={8}>
                  <p>Warranty :</p>
                  <p style={{ color: "#0277BD" }}>
                    {complainData.warranty_year} years
                  </p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={8}>
                  <p>Working Hour :</p>
                  <p style={{ color: "#0277BD" }}>
                    {complainData.working_hr} hours
                  </p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={8}>
                  <p>Job Title :</p>
                  <p style={{ color: "#0277BD" }}>{complainData.job_title}</p>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={12}>
                  <p>Warranty Description :</p>
                  <p style={{ color: "#0277BD" }}>
                    {complainData.warranty_description}
                  </p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={12}>
                  <p>Job Description :</p>
                  <p style={{ color: "#0277BD" }}>{complainData.description}</p>
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
              Assign Schedule
            </h2>
            <Card bordered={true}>
              <h3>
                <img
                  style={{ margin: "5px", height: 20, width: 20 }}
                  src={iconPersonalInformation}
                />{" "}
                Service Information
              </h3>
              <div style={{ marginLeft: "10px", marginTop: "10px" }}>
                <Row gutter={24}>
                  <Col xs={24} sm={24} md={6} lg={6}>
                    <p>Interval :</p>
                    <p style={{ color: "#0277BD" }}>{data.interval} days</p>
                  </Col>

                  <Col xs={24} sm={24} md={6} lg={6}>
                    <p>Amount :</p>
                    <p style={{ color: "#0277BD" }}>{data.ammount} MMK</p>
                  </Col>

                  <Col xs={24} sm={24} md={6} lg={6}>
                    <p>Service Charge :</p>
                    <p style={{ color: "#0277BD" }}>{data.service_charge} MMK</p>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} sm={24} md={6} lg={6}>
                    <p>Inspection :</p>
                    <p style={{ color: "#0277BD" }}>{data.inspection}</p>
                  </Col>

                  <Col xs={24} sm={24} md={6} lg={6}>
                    <p>Watching List :</p>
                    <p style={{ color: "#0277BD" }}>{data.watching_list}</p>
                  </Col>
                </Row>
              </div>

              <h3>
                <img
                  style={{ margin: "5px", height: 20, width: 20 }}
                  src={iconPersonalInformation}
                />{" "}
                Job Information
              </h3>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <p>Job Code :</p>
                  <p style={{ color: "#0277BD" }}>{data.job_code}</p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <p>Job Status :</p>
                  <p style={{ color: "#0277BD" }}>{data.schedule_job_status}</p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <p>Job Title :</p>
                  <p style={{ color: "#0277BD" }}>{data.schedule_job_title}</p>
                </Col>
              </Row>
            </Card>
          </Card>

          <Card bordered={false}>
            <span style={{ marginLeft: "40%" }}> </span>
            {data.schedule_job_status === "Complete" ? (
              <>
                <Button type="primary">Complete</Button>
              </>
            ) : data.schedule_job_status === "On Going" ? (
              <>
                <Button
                  type="primary"
                  style={{
                    borderRadius: "20px",
                    width: "150px",
                    backgroundColor: "#0277BD",
                    color: "#ffffff"
                  }}
                  onClick={() => this.handleJobDone(data.id)}
                >
                  Job Done
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="primary"
                  style={{
                    borderRadius: "20px",
                    width: "150px",
                    backgroundColor: "#0277BD",
                    color: "#ffffff"
                  }}
                  onClick={() => this.handleJobStart(data.id)}
                >
                  Job Start
                </Button>
              </>
            )}
          </Card>
        </Can>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    schedules: state.schedule.list,
    complains: state.complain.list
  };
}

export default connect(
  mapStateToProps,
  { postSchedule, putSchedule, putComplain, putComplainByComplainNo }
)(JobDetail);
