import React from "react";
import Can from "../../utils/Can";
import PageHeaderWrapper from "../../components/PageHeaderWrapper";
import Forbidden from "../Forbidden";
import api from "apis";
import { Icon, Card, Row, Col, Button, Popconfirm, message } from "antd";
import MachineHistory from "../MachineHistory";
import moment from "moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchComplain, putComplain } from "../../actions/Complain";
import history from "../../router/history";

const uuidv4 = require("uuid/v4");

class DetailAssignSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      complain_no: this.props.match.params.complain_no,
      complainData: {}
    };
  }

  componentDidMount() {
    // this.getScheduleData();
    this.getComplainData();
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

  updateComplain = id => {
    this.props.putComplain(
      { complain_status: 0, updated_by: "super-admin" },
      id
    );

    history.push("/assigntoschedule");
  };

  cancel(e) {
    message.error("Click on No");
  }

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
            subtitle="Complain list here."
            parent="Assign To Schedule"
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
                <span style={{ color: "#0277BD" }}>{complainData.model_no}</span>
              </Col>
            </Row>
          </Card>

          <Card bordered={false}>
            <h2>
              <Icon type="user" /> Complain Information
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
              <Icon type="user" /> Customer Information
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
              <Icon type="user" /> Machine History Information
            </h2>
            <MachineHistory />

            <Card bordered={false}>
              <span style={{ marginLeft: "25%" }}> </span>
              <Button
                type="primary"
                style={{ borderRadius: "20px", width: "150px" }}
              >
                <Link
                  to={`/schedules/assign-accept/${this.state.id}/${
                    complainData.complain_no
                  }`}
                >
                  Accept
                </Link>
              </Button>
              <span style={{ marginLeft: "30px" }}> </span>
              <Popconfirm
                onConfirm={() => this.updateComplain(complainData.id)}
                onCancel={this.cancel}
                placement="left"
                title="Are you sure reject?"
                okText="Yes"
                cancelText="No"
                okType="danger"
                style={{ backgroundColor: "#33ff33" }}
              >
                <Button
                  type="add"
                  style={{
                    color: "white",
                    backgroundColor: "red",
                    borderRadius: "20px",
                    width: "150px",
                    marginLeft: "3%"
                  }}
                >
                  Reject
                </Button>
              </Popconfirm>
              <span style={{ marginLeft: "30px" }}> </span>

              <Link to={`/assigntoschedule`}>
                <Button
                  type="add"
                  style={{
                    borderRadius: "20px",
                    width: "150px",
                    marginLeft: "3%"
                  }}
                >
                  Cancel
                </Button>
              </Link>
            </Card>
          </Card>
        </Can>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lang: state.locale.lang,
    isSignedIn: state.auth.isSignedIn,
    roleid: state.auth.roleid,
    isloaded: state.loading.isloaded,
    complains: state.complain.list
  };
}

export default connect(
  mapStateToProps,
  { fetchComplain, putComplain }
)(DetailAssignSchedule);
