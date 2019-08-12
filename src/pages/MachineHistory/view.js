import React from "react";
import Can from "../../utils/Can";
import PageHeaderWrapper from "../../components/PageHeaderWrapper";
import Forbidden from "../Forbidden";
import api from "apis";
import { Icon, Card, Button, Row, Col } from "antd";
import ScrollServiceManStatusTable from "../ServiceMan/custom/CustomServiceManStatusTable";
import { fetchEmployeeByEmpCode } from "../../actions/Employee";
import { connect } from "react-redux";

import moment from "moment";
import history from "../../router/history";
import { Link } from "react-router-dom";

const uuidv4 = require("uuid/v4");

class DetailMachineHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      emp_code: this.props.match.params.emp_code,
      complain_no: this.props.match.params.complain_no,
      data: {},
      complainData: {}
    };
  }

  componentDidMount() {
    this.getData();
    this.getEmployee();
    this.getComplainData();
  }

  async getData() {
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
      this.setState({ complainData: response.data.data });
    }
  }

  getEmployee() {
    this.props.fetchEmployeeByEmpCode(this.state.emp_code);
  }

  render() {
    const { data, complainData } = this.state;

    let empData = this.props.employees;
    empData.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    });

    const columns = [
      // {
      //   title: "",
      //   render: record => (
      //     <>
      //       <span>
      //         <Button onClick={id => this.handleAdd(record.id)}>+</Button>
      //       </span>
      //     </>
      //   )
      // },
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
            <Card bordered={false}>
              <Row gutter={24}>
                <p>
                  <span>Complain No : </span>
                  <span style={{ color: "blue", marginLeft: "10px" }}>
                    {complainData.complain_no}
                  </span>
                </p>
                <p>
                  <sapn>FUP No : </sapn>
                  <span style={{ color: "blue", marginLeft: "10px" }}>
                    {complainData.fup_no}
                  </span>
                </p>
                <p>
                  <span>Model No : </span>
                  <span style={{ color: "blue", marginLeft: "10px" }}>
                    {complainData.model_no}
                  </span>
                </p>
                <p>
                  <span>Date : </span>
                  <span style={{ color: "blue", marginLeft: "10px" }}>
                    {moment(complainData.date).format("YYYY/MM/DD")}
                  </span>
                </p>
                <p>
                  <sapn>Warranty : </sapn>
                  <span style={{ color: "blue", marginLeft: "10px" }}>
                    {complainData.warranty_year} years
                  </span>
                </p>
                <p>
                  <span>Working Hour : </span>
                  <span style={{ color: "blue", marginLeft: "10px" }}>
                    {complainData.working_hr} hours
                  </span>
                </p>
                <p>
                  <span>Job Title : </span>
                  <span style={{ color: "blue", marginLeft: "10px" }}>
                    {complainData.complain_job_title}
                  </span>
                </p>
                <p>
                  <span>Warranty Description : </span>
                </p>
                <p>
                  <span style={{ color: "blue", marginLeft: "10px" }}>
                    {complainData.warranty_description}
                  </span>
                </p>
              </Row>
            </Card>

            <h2 style={{ textAlign: "center", color: "yellow" }}>
              Schedule Information
            </h2>
            <Card bordered={true}>
              <div>
                <h3>
                  <Icon type="setting" style={{ marginRight: "10px" }} />
                  Service Information
                </h3>

                <Row gutter={24}>
                  <Col xs={24} sm={24} md={6} lg={6}>
                    <p>Interval :</p>
                    <span style={{ marginLeft: "10px", color: "blue" }}>
                      {moment(data.start_date).format("YYYY/MM/DD")}{" "}
                      <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                        ~
                      </span>{" "}
                      {moment(data.end_date).format("YYYY/MM/DD")}
                    </span>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6}>
                    <p>Amount :</p>
                    <span style={{ marginLeft: "10px", color: "blue" }}>
                      {data.ammount} MMK
                    </span>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6}>
                    <p>Service Charge :</p>
                    <span style={{ marginLeft: "10px", color: "blue" }}>
                      {data.service_charge} MMK
                    </span>
                  </Col>
                </Row>
                <Row gutter={24} style={{ marginTop: "20px" }}>
                  <Col xs={24} sm={24} md={6} lg={6}>
                    <p>Inspection :</p>
                    <span style={{ marginLeft: "10px", color: "blue" }}>
                      {data.inspection}
                    </span>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6}>
                    <p>Watching List :</p>
                    <span style={{ marginLeft: "10px", color: "blue" }}>
                      {data.watching_list}
                    </span>
                  </Col>
                </Row>
              </div>

              <div style={{ marginTop: "20px" }}>
                <h3>
                  <Icon type="setting" style={{ marginRight: "10px" }} />
                  Job Information
                </h3>

                <Row gutter={24}>
                  <Col xs={24} sm={24} md={6} lg={6}>
                    <p>Job Code :</p>
                    <span style={{ marginLeft: "10px", color: "blue" }}>
                      {data.job_code}
                    </span>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6}>
                    <p>Job Status :</p>
                    <span style={{ marginLeft: "10px", color: "blue" }}>
                      {data.schedule_job_status}
                    </span>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6}>
                    <p>Job Description :</p>
                    <span style={{ marginLeft: "10px", color: "blue" }}>
                      {data.schedule_job_description}
                    </span>
                  </Col>
                </Row>
              </div>
            </Card>

            <h2>
              <Icon type="user" /> Service Man Information
            </h2>
            <ScrollServiceManStatusTable
              dataSource={empData}
              columns={columns}
              showStatus={true}
            />
          </Card>

          <Card bordered={false}>
            <span style={{ marginLeft: "45%" }}>
              <Link to={`/schedules/schedule/view/${this.state.id}/${this.state.complain_no}`}>
                <Button
                  type="primary"
                  style={{
                    borderRadius: "20px",
                    border: "0",
                    width: "150px",
                    backgroundColor: "yellow",
                    color: "#222222"
                  }}
                  onClick={this.handleBack}
                >
                  Back
                </Button>
              </Link>
            </span>
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
    employees: state.employee.list
  };
}
export default connect(
  mapStateToProps,
  { fetchEmployeeByEmpCode }
)(DetailMachineHistory);
