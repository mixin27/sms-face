import React from "react";
import USER from "../../assets/img/lady.svg";
import { Row, Col, List, Card, Divider, Button, Icon, Popconfirm } from "antd";
import PageHeaderWrapper from "../../components/PageHeaderWrapper";
import api from "../../apis";
import { Link } from "react-router-dom";
import history from "../../router/history";
import moment from "moment";

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

class EmployeeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
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
    api
      .get(`employee/${this.state.id}`)
      .then(response => {
        this.setState({
          data: response.data.data
        });
      })
      .catch(e => console.log(e));
  }

  handleDeleteConfirm = () => {
    // Delete code here
    console.log("DELETE");
    api
      .delete(`employee/${this.state.data.id}`)
      .then(response => {
        this.setState({
          data: response.data.data
        });
      })
      .catch(e => console.log(e));
    history.push("/employees");
  };

  handleDeleteCancel = () => {
    console.log("Delete cancel");
  };

  render() {
    const { data } = this.state;
    return (
      <div style={{ background: "#ffffff", paddingLeft: "10px" }}>
        <PageHeaderWrapper
          title="Employee"
          subtitle="You can add Basic Employee data by entering one after click the Add New Button and can see the employee data in table"
          parent="Configuration"
          child="Employee"
          subchild="View Employee"
        />

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
                  <h3>Employee Code</h3>
                  <p style={{ color: "blue" }}>{this.state.data.emp_code}</p>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>NRIC</h3>
                  <p style={{ color: "blue" }}>{this.state.data.nrc}</p>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Department</h3>
                  <p style={{ color: "blue" }}>{this.state.data.department}</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>

        <Card
          style={{
            width: "90%",
            backgroundColor: '#eeeeee'
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
              <h3>Gender :</h3>
              <p style={{color: 'blue'}}>{this.state.data.gender}</p>
            </Col>

            <Col xs={24} sm={24} md={6} lg={6}>
              <h3>Date Of Birth :</h3>
              <p style={{color: 'blue'}}>{moment(this.state.data.dob).format("YYYY/MM/DD")}</p>
            </Col>

            <Col xs={24} sm={24} md={6} lg={6}>
              <h3>Job Starting Date :</h3>
              <p style={{color: 'blue'}}>
                {moment(this.state.data.job_start_date).format("YYYY/MM/DD")}
              </p>
            </Col>

            <Col xs={24} sm={24} md={6} lg={6}>
              <h3>Education :</h3>
              <p style={{color: 'blue'}}>{this.state.data.education}</p>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} sm={24} md={6} lg={6}>
              <h3>Father Name :</h3>
              <p style={{color: 'blue'}}>{this.state.data.father_name}</p>
            </Col>

            <Col xs={24} sm={24} md={6} lg={6}>
              <h3>Mother Name :</h3>
              <p style={{color: 'blue'}}>{this.state.data.mother_name}</p>
            </Col>

            <Col xs={24} sm={24} md={6} lg={6}>
              <h3>Temporary Address :</h3>
              <p style={{color: 'blue'}}>{this.state.data.temp_address}</p>
            </Col>

            <Col xs={24} sm={24} md={6} lg={6}>
              <h3>Permanent Address :</h3>
              <p style={{color: 'blue'}}>{this.state.data.permanent_address}</p>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} sm={24} md={6} lg={6}>
              <h3>Social Media Link :</h3>
              <p style={{color: 'blue'}}>{this.state.data.social_media_link}</p>
            </Col>
          </Row>
        </Card>
        <div style={{ padding: "20px" }}>
          <Row gutter={24}>
            <span
              style={{
                marginLeft: "30%"
              }}
            >
              <Link to={`/employees/employee/edit/${this.state.id}`}>
                <Button
                  type="primary"
                  style={{
                    background: "#0277BD",
                    color: "#ffffff",
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
                    width: "150px",
                    marginLeft: "20px",
                    borderRadius: "20px",
                    width: "150px",
                    marginLeft: "10%",
                    border: '0'
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
export default EmployeeDetail;
