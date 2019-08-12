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
import AvailableServiceMan from "../ServiceMan/available-serviceman";
import moment from "moment";

import styles from "../../styles/custom.module.less";
import { amountPattern } from "../../utils/validate-pattern";
import { stat } from "fs";
import { Link } from "react-router-dom";

import iconPersonalInformation from "../../assets/img/menu/portfolio.svg";
import iconMachineHistory from "../../assets/img/menu/machine.svg";
import iconComplainInformation from "../../assets/img/menu/complain.svg";
import iconServiceManInformation from "../../assets/img/menu/couple.svg";

const FormItem = Form.Item;
const { TextArea } = Input;

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

class DetailSchedule extends React.Component {
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

  // Job Status
  getJobStatusColor = status => {
    if (status === "On Going") {
      return "#18FF46";
    } else if (status === "Extend") {
      return "#F8910B";
    } else if (status === "Assign") {
      return "#3A08D4";
    } else if (status === "Complete") {
      return "#2680EB";
    } else if (status === "Expire") {
      return "#FF3818";
    } else if (status === "Job Done") {
      return "#C5AF22";
    } else {
      return "#222222";
    }
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
          <PageHeaderWrapper
            title="View Schedule"
            subtitle="There are a lot of complain list retrieved from everywhere. They are not still accept yer. You can choose whether to receive or reject. You can create new too."
            parent="Schedule"
            child="View Schedule"
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
                <span style={{ color: "#0277BD" }}>
                  {complainData.model_no}
                </span>
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
                  <p style={{ color: "#0277BD" }}>
                    {complainData.warranty_year} years
                  </p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Working Hour :</h3>
                  <p style={{ color: "#0277BD" }}>
                    {complainData.working_hr} hours
                  </p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Job Title :</h3>
                  <p style={{ color: "#0277BD" }}>{complainData.job_title}</p>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={12}>
                  <h3>Warranty Description :</h3>
                  <p style={{ color: "#0277BD" }}>
                    {complainData.warranty_description}
                  </p>
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
              Customer Personal Information
            </h2>
            <Card bordered={true}>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Customer Name :</h3>
                  <p style={{ color: "#0277BD" }}>
                    {complainData.customer_name}
                  </p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Customer Phone No :</h3>
                  <p style={{ color: "#0277BD" }}>
                    {complainData.customer_phone_no}
                  </p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Distance :</h3>
                  <p style={{ color: "#0277BD" }}>
                    {complainData.distance} miles
                  </p>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Date :</h3>
                  <p style={{ color: "#0277BD" }}>
                    {moment(complainData.date).format("YYYY/MM/DD")}
                  </p>
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
                    <h3>Interval :</h3>
                    <p style={{ color: "#0277BD" }}>{data.interval}</p>
                  </Col>

                  <Col xs={24} sm={24} md={6} lg={6}>
                    <h3>Amount :</h3>
                    <p style={{ color: "#0277BD" }}>{data.ammount} MMK</p>
                  </Col>

                  <Col xs={24} sm={24} md={6} lg={6}>
                    <h3>Service Charge :</h3>
                    <p style={{ color: "#0277BD" }}>
                      {data.service_charge} MMK
                    </p>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} sm={24} md={6} lg={6}>
                    <h3>Inspection :</h3>
                    <p style={{ color: "#0277BD" }}>{data.inspection}</p>
                  </Col>

                  <Col xs={24} sm={24} md={6} lg={6}>
                    <h3>Watching List :</h3>
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
                  <h3>Job Code :</h3>
                  <p style={{ color: "#0277BD" }}>{data.job_code}</p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Job Status :</h3>
                  <p
                    style={{
                      color: this.getJobStatusColor(data.schedule_job_status)
                    }}
                  >
                    {data.schedule_job_status}
                  </p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Job Title :</h3>
                  <p style={{ color: "#0277BD" }}>{data.schedule_job_title}</p>
                </Col>
              </Row>
            </Card>

            <h2>
              <img
                style={{ margin: "5px", height: 20, width: 20 }}
                src={iconServiceManInformation}
              />{" "}
              Service Man Information
            </h2>
            <AvailableServiceMan showAvail={false} />
          </Card>

          <Card bordered={false}>
            <span style={{ marginLeft: "30%" }}> </span>
            {/* <Button
              type="primary"
              style={{
                borderRadius: "20px",
                width: "150px",
                backgroundColor: "yellow",
                color: "#222222"
              }}
            >
              Payment Done
            </Button>
            <span style={{ marginLeft: "30px" }}> </span> */}
            <Link
              to={`/schedules/schedule/edit/${data.id}/${
                complainData.complain_no
              }`}
            >
              <Button
                type="primary"
                style={{ borderRadius: "20px", width: "150px" }}
              >
                Edit
              </Button>
            </Link>
            <span style={{ marginLeft: "30px" }}> </span>
            <Link to={`/schedule`}>
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
    schedules: state.schedule.list,
    complains: state.complain.list
  };
}

export default connect(
  mapStateToProps,
  { postSchedule, putSchedule, putComplain, putComplainByComplainNo }
)(DetailSchedule);
