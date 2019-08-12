import React from "react";
import PageHeaderWrapper from "../../components/PageHeaderWrapper";
import { Card, Row, Col, Divider } from "antd";
import { fetchComplainByComplainNo } from "../../actions/Complain";
import { connect } from "react-redux";
import moment from "moment";
import api from "../../apis";

class JobItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      complain: {}
    };
  }

  componentDidMount() {
    // this.getComplainData();
    this.getComplain();
  }

  getComplainData() {
    this.props.fetchComplainByComplainNo(this.props.item.complain_no);
  }

  async getComplain() {
    api
      .get(`complains/complain/${this.props.item.complain_no}`)
      .then(response => {
        this.setState({
          complain: response.data.data
        });
      })
      .catch(e => console.log(e));
  }

  // Job Status
  getJobStatusColor = schedule_job_status => {
    if (schedule_job_status == "On Going") {
      return "#18FF46";
    } else if (schedule_job_status == "Extend") {
      return "#F8910B";
    } else if (schedule_job_status == "Assign") {
      return "#3A08D4";
    } else if (schedule_job_status == "Complete") {
      return "#2680EB";
    } else if (schedule_job_status == "Expire") {
      return "#FF3818";
    } else if (schedule_job_status == "Job Done") {
      return "#C5AF22";
    } else {
      return "#222222";
    }
  };

  render() {
    return (
      <React.Fragment>
        <Card
          bordered={false}
          style={{
            borderRadius: "10px",
            marginTop: "20px",
            backgroundColor: "#eeeeee"
          }}
        >
          <h3 style={{ color: "#0277BD" }}>{this.props.item.schedule_job_title}</h3>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={6} lg={6}>
              {/* <Divider type="horizontal">Customer Information</Divider> */}
              <h4>Customer Information</h4>

              <p>
                <Col xs={24} sm={24} md={6} lg={12}>
                  Name:{" "}
                </Col>
                <Col xs={24} sm={24} md={6} lg={12}>
                  <span style={{ color: "#0277BD" }}>
                    {this.state.complain.customer_name}
                  </span>{" "}
                </Col>
              </p>
              <p>
                <Col xs={24} sm={24} md={6} lg={12}>
                  Phone No:{" "}
                </Col>
                <Col xs={24} sm={24} md={6} lg={12}>
                  <span style={{ color: "#0277BD" }}>
                    {this.state.complain.customer_phone_no}
                  </span>{" "}
                </Col>
              </p>
              <p>
                <Col xs={24} sm={24} md={6} lg={12}>
                  Date Created:{" "}
                </Col>
                <Col xs={24} sm={24} md={6} lg={12}>
                  <span style={{ color: "#0277BD" }}>
                    {moment(this.state.complain.created_at).format(
                      "DD/MM/YYYY"
                    )}
                  </span>{" "}
                </Col>
              </p>
              <p>
                <Col xs={24} sm={24} md={6} lg={12}>
                  Location:{" "}
                </Col>
                <Col xs={24} sm={24} md={6} lg={12}>
                  <span style={{ color: "#0277BD" }}>
                    {this.state.complain.location}
                  </span>{" "}
                </Col>
              </p>
            </Col>

            <Col lg={1}>
              <Divider
                type="vertical"
                style={{ border: "1px dashed gray", height: "170px" }}
              />
            </Col>

            <Col xs={24} sm={24} md={6} lg={8}>
              {/* <Divider type="horizontal">Customer Information</Divider> */}
              <h4>Schedule Information</h4>

              <p>
                <Col xs={24} sm={24} md={6} lg={12}>
                  Job Code:{" "}
                </Col>
                <Col xs={24} sm={24} md={6} lg={12}>
                  <span style={{ color: "#0277BD" }}>
                    {this.props.item.job_code}
                  </span>{" "}
                </Col>
              </p>
              <p>
                <Col xs={24} sm={24} md={6} lg={12}>
                  Interval:{" "}
                </Col>
                <Col xs={24} sm={24} md={6} lg={12}>
                  <span style={{ color: "#0277BD" }}>
                    {moment(this.props.item.start_date).format("DD/MM/YYYY")} -{" "}
                    {moment(this.props.item.end_date).format("DD/MM/YYYY")}{" "}
                  </span>{" "}
                </Col>
              </p>
              <p>
                <Col xs={24} sm={24} md={6} lg={12}>
                  Inspection:{" "}
                </Col>
                <Col xs={24} sm={24} md={6} lg={12}>
                  <span style={{ color: "#0277BD" }}>
                    {this.props.item.inspection}
                  </span>{" "}
                </Col>
              </p>
              <p>
                <Col xs={24} sm={24} md={6} lg={12}>
                  Job Status:{" "}
                </Col>
                <Col xs={24} sm={24} md={6} lg={12}>
                  <span
                    style={{
                      color: this.getJobStatusColor(
                        this.props.item.schedule_job_status
                      )
                    }}
                  >
                    {this.props.item.schedule_job_status}
                  </span>{" "}
                </Col>
              </p>
            </Col>

            <Col lg={1}>
              <Divider
                type="vertical"
                style={{ border: "1px dashed gray", height: "170px" }}
              />
            </Col>

            <Col xs={24} sm={24} md={6} lg={6}>
              {/* <Divider type="horizontal">Customer Information</Divider> */}
              <h4>Complain Information</h4>

              <p>
                <Col xs={24} sm={24} md={6} lg={12}>
                  Complain No:{" "}
                </Col>
                <Col xs={24} sm={24} md={6} lg={12}>
                  <span style={{ color: "#0277BD" }}>
                    {this.props.item.complain_no}
                  </span>{" "}
                </Col>
              </p>
              <p>
                <Col xs={24} sm={24} md={6} lg={12}>
                  Model No:{" "}
                </Col>
                <Col xs={24} sm={24} md={6} lg={12}>
                  <span style={{ color: "#0277BD" }}>
                    {this.props.item.model_no}
                  </span>{" "}
                </Col>
              </p>
              <p>
                <Col xs={24} sm={24} md={6} lg={12}>
                  FUP No:{" "}
                </Col>
                <Col xs={24} sm={24} md={6} lg={12}>
                  <span style={{ color: "#0277BD" }}>
                    {this.props.item.fup_no}
                  </span>{" "}
                </Col>
              </p>
              <p>
                <Col xs={24} sm={24} md={6} lg={12}>
                  Working Hour:{" "}
                </Col>
                <Col xs={24} sm={24} md={6} lg={12}>
                  <span style={{ color: "#0277BD" }}>
                    {this.state.complain.working_hr} hours
                  </span>{" "}
                </Col>
              </p>
            </Col>
          </Row>
        </Card>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    complains: state.complain.list
  };
}

export default connect(
  mapStateToProps,
  { fetchComplainByComplainNo }
)(JobItem);
