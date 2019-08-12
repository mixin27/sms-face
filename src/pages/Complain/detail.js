import React from "react";
import {
  Input,
  Icon,
  Button,
  Divider,
  Select,
  Row,
  Col,
  Popconfirm,
  Card
} from "antd";
import FormItem from "antd/es/form/FormItem";
import PageHeaderWrapper from "../../components/PageHeaderWrapper";
import api from "../../apis";
import moment from "moment";
import { Link } from "react-router-dom";
import history from "../../router/history";

import iconPersonalInformation from "../../assets/img/menu/portfolio.svg";
import iconMachineHistory from "../../assets/img/menu/machine.svg";
import iconComplainInformation from "../../assets/img/menu/complain.svg";
import iconServiceManInformation from "../../assets/img/menu/couple.svg";

const Option = { Select };
const { TextArea } = Input;
const uuidv4 = require("uuid/v4");

class DetailComplain extends React.Component {
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
        description: ""
      }
    };
  }

  componentDidMount() {
    this.getComplain(this.state.id);
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

  handleDeleteConfirm = () => {
    // Delete code here
    console.log("DELETE");
    api
      .delete(`complains/${this.state.data.id}`)
      .then(response => {
        this.setState({
          data: response.data.data
        });
      })
      .catch(e => console.log(e));
    history.push("/complains");
  };

  handleDeleteCancel = () => {
    console.log("Delete cancel");
  };

  render() {
    return (
      <div style={{ background: "#ffffff" }}>
        <PageHeaderWrapper
          title="Complain"
          subtitle="Full detail of complain."
          parent="Complain"
          child="View Complain"
        />

        <div style={{ background: "#ffffff", padding: "20px" }}>
          {/* <div style={{ marginLeft: "80%" }}>
            <Link to={`/complains`}>
              <Icon
                type="arrow-left"
                style={{ marginRight: "16px", marginBottom: "16px" }}
              />
              Back
            </Link>
          </div> */}
          <Card>
            <Row gutter={24} style={{ marginTop: "10px", marginLeft: "10px" }}>
              <Col xs={24} sm={24} md={6} lg={6}>
                <h3>Complain No : </h3>
                <div>
                  <span style={{ color: "#0277BD" }}>
                    {this.state.data.complain_no}
                  </span>
                </div>
              </Col>
              <Col xs={24} sm={24} md={6} lg={6}>
                <h3>Model No : </h3>
                <div>
                  <span style={{ color: "#0277BD" }}>
                    {this.state.data.model_no}
                  </span>
                </div>
              </Col>
              <Col xs={24} sm={24} md={6} lg={6}>
                <h3>FUP No : </h3>
                <div>
                  <span style={{ color: "#0277BD" }}>
                    {this.state.data.fup_no}
                  </span>
                </div>
              </Col>
            </Row>

            <div style={{ marginTop: "30px" }}>
              <img
                style={{ margin: "16px" }}
                src={iconPersonalInformation}
                width={20}
                height={20}
              />
              <span style={{ fontSize: 18 }}>Warranty Information</span>
            </div>

            <Row gutter={24} style={{ marginTop: "10px", marginLeft: "40px" }}>
              <Col xs={24} sm={24} md={6} lg={6}>
                <h3>Warranty : </h3>
                <div>
                  <span style={{ color: "#0277BD" }}>
                    {this.state.data.warranty_year} years
                  </span>
                </div>
              </Col>
              <Col xs={24} sm={24} md={6} lg={6}>
                <h3>Working Hour : </h3>
                <div>
                  <span style={{ color: "#0277BD" }}>
                    {this.state.data.working_hr}
                  </span>
                </div>
              </Col>
            </Row>

            <Row
              gutter={24}
              style={{
                background: "#ffffff",
                marginTop: "20px",
                marginLeft: "55px"
              }}
            >
              <h3>Warranty Description : </h3>
              <div>
                <span style={{ color: "#0277BD" }}>
                  {this.state.data.warranty_description}
                </span>
              </div>
            </Row>

            <div style={{ marginTop: "20px" }}>
              <img
                style={{ margin: "16px" }}
                src={iconPersonalInformation}
                width={20}
                height={20}
              />
              <span style={{ fontSize: 18 }}>
                Customer Personal Information
              </span>
            </div>

            <Row gutter={24} style={{ marginTop: "10px", marginLeft: "40px" }}>
              <Col xs={24} sm={24} md={6} lg={6}>
                <h3>Customer Name : </h3>
                <div>
                  <span style={{ color: "#0277BD" }}>
                    {this.state.data.customer_name}
                  </span>
                </div>
              </Col>
              <Col xs={24} sm={24} md={6} lg={6}>
                <h3>Customer Phone No : </h3>
                <div>
                  <span style={{ color: "#0277BD" }}>
                    {this.state.data.customer_phone_no}
                  </span>
                </div>
              </Col>
              <Col xs={24} sm={24} md={6} lg={6}>
                <h3>Distance : </h3>
                <div>
                  <span style={{ color: "#0277BD" }}>
                    {this.state.data.distance}
                  </span>
                </div>
              </Col>
            </Row>
            <span style={{ marginTop: "10px" }} />
            <Row gutter={24} style={{ marginTop: "10px", marginLeft: "40px" }}>
              <Col xs={24} sm={24} md={6} lg={6}>
                <h3>Date : </h3>
                <div>
                  <span style={{ color: "#0277BD" }}>
                    {this.state.data.date
                      ? moment(this.state.data.date).format("YYYY/MM/DD")
                      : "No data"}
                  </span>
                </div>
              </Col>
              <Col xs={24} sm={24} md={6} lg={6}>
                <h3>Location : </h3>
                <div>
                  <span style={{ color: "#0277BD" }}>
                    {this.state.data.location}
                  </span>
                </div>
              </Col>
            </Row>

            <div style={{ marginTop: "20px" }}>
              <img
                style={{ margin: "16px" }}
                src={iconPersonalInformation}
                width={20}
                height={20}
              />
              <span style={{ fontSize: 18 }}>Other Information</span>
            </div>

            <Row gutter={24} style={{ marginTop: "10px", marginLeft: "40px" }}>
              <Col xs={24} sm={24} md={6} lg={6}>
                <h3>Job Title : </h3>
                <div>
                  <span style={{ color: "#0277BD" }}>
                    {this.state.data.job_title
                      ? this.state.data.job_title
                      : "No data"}
                  </span>
                </div>
              </Col>
              <Col xs={24} sm={24} md={6} lg={6}>
                <h3>Complain Job Title : </h3>
                <div>
                  <span style={{ color: "#0277BD" }}>
                    {this.state.data.complain_job_title
                      ? this.state.data.complain_job_title
                      : "No data"}
                  </span>
                </div>
              </Col>
              <Col xs={24} sm={24} md={6} lg={6}>
                <h3>Amount : </h3>
                <div>
                  <span style={{ color: "#0277BD" }}>
                    {this.state.data.amount
                      ? this.state.data.amount
                      : "No data"}
                  </span>
                </div>
              </Col>
            </Row>
            <span style={{ marginTop: "10px" }} />
            <Row
              style={{ marginTop: "20px", color: "blue", marginLeft: "55px" }}
            >
              <h3>Description</h3>
              <span style={{ color: "#0277BD" }}>
                {this.state.data.description}
              </span>
            </Row>
          </Card>
        </div>

        <div style={{ padding: "20px" }}>
          <Row gutter={24}>
            <span
              style={{
                marginLeft: "30%"
              }}
            >
              <Link to={`/complains/complain/edit/${this.state.id}`}>
                <Button
                  type="primary"
                  style={{
                    borderRadius: "20px",
                    width: "150px"
                  }}
                >
                  Edit
                </Button>
              </Link>
              <Popconfirm
                title="Are you sure delete this task?"
                onConfirm={this.handleDeleteConfirm}
                onCancel={this.handleDeleteCancel}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="primary"
                  style={{
                    background: "red",
                    color: "#ffffff",
                    width: "100px",
                    marginLeft: "20px",
                    borderRadius: "20px",
                    width: "150px",
                    marginLeft: "10%",
                    border: "0"
                  }}
                >
                  Delete
                </Button>
              </Popconfirm>
            </span>
          </Row>
        </div>
      </div>
    );
  }
}

export default DetailComplain;
