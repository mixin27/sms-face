import React from "react";
import { Row, Col, List, Card, Divider, Button, Icon, Popconfirm } from "antd";
import PageHeaderWrapper from "../../components/PageHeaderWrapper";
import api from "../../apis";
import { Link } from "react-router-dom";
import history from "../../router/history";
import moment from "moment";
import { connect } from "react-redux";

import { fetchEmployee } from "../../actions/Employee";

// const imgurl = "http://localhost:9991/";
const imgurl = "http://api.teamf.ucsy2019.internship.irrasoft.com/";
const { Meta } = Card;

const image = {
  width: "200px",
  height: "200px",
  // border: "1px dashed blue",
  backgroundColor: "#fff",
  padding: "20px",
  marginLeft: "30%",
  marginBottom: "10px"
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
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
        created_by: "",
        updated_by: ""
      }
    };
  }

  componentDidMount() {
    this.getAllEmployee();
  }

  async getAllEmployee() {

    
    // console.log(user);
    api
      .get(`/employee/employee/mail/${this.state.email}`)
      .then(response => {
        this.setState({
          data: response.data.data
        });
      })
      .catch(e => console.log(e));
  }

  render() {
    const { data } = this.state;
    console.log(this.state.data);
    return (
      <div style={{ background: "#ffffff", paddingLeft: "10px" }}>
        <PageHeaderWrapper title="Profile" parent="Profile" />

        <Card bordered={false}>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={6} lg={6}>
              <Card
                bordered={false}
                hoverable
                style={{ width: 240 }}
                cover={<img alt="employee image" src={imgurl + data.image} />}
              >
                {/* <Meta title={data.emp_name} /> */}
              </Card>
              {/* <img style={image} alt="employee image" src={imgurl + data.image} /> */}
            </Col>
            <Col xs={24} sm={24} md={6} lg={16}>
              <Row gutter={24}>
                <h2>{this.state.data.emp_name}</h2>
                <span>{this.state.data.position}</span>
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>
                  <Icon type="phone" />
                  &nbsp;&nbsp;{this.state.data.phone_no}
                </span>
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>
                  <Icon type="mail" />
                  &nbsp;&nbsp;{this.state.data.email}
                </span>
              </Row>
              <Divider type="horizontal" />
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <p style={{ fontWeight: 500, fontSize: "18px" }}>
                    Employee Code
                  </p>
                  <p style={{ color: "#0277BD" }}>{this.state.data.emp_code}</p>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <p style={{ fontWeight: 500, fontSize: "18px" }}>NRIC</p>
                  <p style={{ color: "#0277BD" }}>{this.state.data.nrc}</p>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <p style={{ fontWeight: 500, fontSize: "18px" }}>
                    Department
                  </p>
                  <p style={{ color: "#0277BD" }}>{this.state.data.department}</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>

        <Card
          style={{
            width: "90%",
            backgroundColor: "#eeeeee"
          }}
        >
          <h3>Employee Personal Information</h3>
        </Card>
        <Card
          style={{
            paddingTop: "10px",
            width: "90%",
            borderLeft: "1px solid #222222",
            borderRight: "1px solid #222222",
            borderBottom: "1px solid #222222"
          }}
        >
          <Row gutter={24}>
            <Col xs={24} sm={24} md={6} lg={6}>
              <p style={{ fontWeight: 500, fontSize: "18px" }}>Gender :</p>
              <p style={{ color: "#0277BD" }}>{this.state.data.gender}</p>
            </Col>

            <Col xs={24} sm={24} md={6} lg={6}>
              <p style={{ fontWeight: 500, fontSize: "18px" }}>
                Date Of Birth :
              </p>
              <p style={{ color: "#0277BD" }}>
                {moment(this.state.data.dob).format("YYYY/MM/DD")}
              </p>
            </Col>

            <Col xs={24} sm={24} md={6} lg={6}>
              <p style={{ fontWeight: 500, fontSize: "18px" }}>
                Job Starting Date :
              </p>
              <p style={{ color: "#0277BD" }}>
                {moment(this.state.data.job_start_date).format("YYYY/MM/DD")}
              </p>
            </Col>

            <Col xs={24} sm={24} md={6} lg={6}>
              <p style={{ fontWeight: 500, fontSize: "18px" }}>Education :</p>
              <p style={{ color: "#0277BD" }}>{this.state.data.education}</p>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} sm={24} md={6} lg={6}>
              <p style={{ fontWeight: 500, fontSize: "18px" }}>Father Name :</p>
              <p style={{ color: "#0277BD" }}>{this.state.data.father_name}</p>
            </Col>

            <Col xs={24} sm={24} md={6} lg={6}>
              <p style={{ fontWeight: 500, fontSize: "18px" }}>Mother Name :</p>
              <p style={{ color: "#0277BD" }}>{this.state.data.mother_name}</p>
            </Col>

            <Col xs={24} sm={24} md={6} lg={6}>
              <p style={{ fontWeight: 500, fontSize: "18px" }}>
                Temporary Address :
              </p>
              <p style={{ color: "#0277BD" }}>{this.state.data.temp_address}</p>
            </Col>

            <Col xs={24} sm={24} md={6} lg={6}>
              <p style={{ fontWeight: 500, fontSize: "18px" }}>
                Permanent Address :
              </p>
              <p style={{ color: "#0277BD" }}>
                {this.state.data.permanent_address}
              </p>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} sm={24} md={6} lg={6}>
              <p style={{ fontWeight: 500, fontSize: "18px" }}>
                Social Media Link :
              </p>
              <p style={{ color: "#0277BD" }}>
                {this.state.data.social_media_link}
              </p>
            </Col>
          </Row>
        </Card>
        <div style={{ padding: "20px" }}>
          <Row gutter={24}>
            <span
              style={{
                marginLeft: "40%"
              }}
            >
              <Link to={`/profile/edit/${this.state.data.id}`}>
                <Button
                  type="primary"
                  style={{
                    background: "#0277BD",
                    color: '#ffffff',
                    borderRadius: "20px",
                    width: "150px"
                  }}
                >
                  Edit
                </Button>
              </Link>
            </span>
          </Row>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.auth.useremail
  };
}

export default connect(
  mapStateToProps,
  { fetchEmployee }
)(Profile);
