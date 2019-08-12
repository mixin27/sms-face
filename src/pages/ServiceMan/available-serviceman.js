import React from "react";
import { Checkbox, Icon, Button, Card } from "antd";
import { fetchEmployee, fetchServiceManByStatus } from "../../actions/Employee";
import { postSchedule, putSchedule } from "../../actions/Schedule";
import { putComplain, putComplainByComplainNo } from "../../actions/Complain";
import { connect } from "react-redux";
import ScrollServiceManStatusTable from "./custom/CustomServiceManStatusTable";
import { Link } from "react-router-dom";

const uuidv4 = require("uuid/v4");

class AvailableServiceMan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceMenId: ""
    };
  }

  componentDidMount() {
    this.getAvailableServiceMan();
  }

  getAvailableServiceMan() {
    this.props.fetchServiceManByStatus("available");
    // this.props.fetchEmployee();
  }

  // Add
  handleAdd = emp_code => {
    this.setState({
      serviceMenId: emp_code
    });
    console.log(this.state.serviceMenId);
  };

  // Remove
  handleRemvoe = () => {
    this.setState({
      serviceMenId: ""
    });
    console.log(this.state.serviceMenId);
  };

  render() {
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
            {this.props.showAvail ? (
              <span>
                {this.state.serviceMenId == "" ? (
                  <Button onClick={id => this.handleAdd(record.emp_code)}>
                    +
                  </Button>
                ) : (
                  <Button onClick={id => this.handleRemvoe()}>-</Button>
                )}
              </span>
            ) : (
              <></>
            )}
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
        <ScrollServiceManStatusTable
          dataSource={data}
          columns={columns}
          showStatus={false}
        />
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
    putComplainByComplainNo
  }
)(AvailableServiceMan);
