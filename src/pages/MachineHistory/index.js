import React from "react";
import { fetchScheduleByStatus } from "../../actions/Schedule";
import { connect } from "react-redux";
import ScrollMachineHistoryTable from "./custom/CustomMachineHistoryTable";

const uuidv4 = require("uuid/v4");

class MachineHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getMachineHistory();
  }

  getMachineHistory() {
    this.props.fetchScheduleByStatus("Complete");
  }

  render() {
    let data = this.props.schedules;
    data.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    });

    const columns = [
      {
        title: "Complain No",
        dataIndex: "complain_no",
        key: "complain_no",
        align: "left",
        editable: true,
        sortDirections: ["ascend", "descend"],
        sorter: (a, b) => a.complain_no.length - b.complain_no.length
      },
      {
        title: "Date",
        dataIndex: "end_date",
        align: "left",
        key: "end_date",
        sorter: (a, b) => a.end_date.length - b.end_date.length,
        sortDirections: ["descend", "ascend"],
        editable: true
      },
      {
        title: "Job Title",
        dataIndex: "schedule_job_title",
        align: "left",
        key: "schedule_job_title",
        sorter: (a, b) =>
          a.schedule_job_title.length - b.schedule_job_title.length,
        sortDirections: ["descend", "ascend"],
        editable: true
      },
      {
        title: "Service Man ID",
        dataIndex: "emp_code",
        align: "left",
        key: "emp_code",
        sorter: (a, b) => a.emp_code.length - b.emp_code.length,
        sortDirections: ["descend", "ascend"],
        editable: true
      },
      {
        title: "Job Status",
        align: "left",
        render: record => (
          <>
            <span style={{ color: "blue" }}>{record.schedule_job_status}</span>
          </>
        )
      },
      {
        title: "Interval",
        dataIndex: "interval",
        align: "left",
        key: "interval",
        sorter: (a, b) => a.interval.length - b.interval.length,
        sortDirections: ["descend", "ascend"],
        editable: true
      },
      {
        title: "Service Charge",
        dataIndex: "service_charge",
        align: "left",
        key: "service_charge",
        sorter: (a, b) => a.service_charge.length - b.service_charge.length,
        sortDirections: ["descend", "ascend"],
        editable: true
      },
      {
        title: "Inspection",
        dataIndex: "inspection",
        align: "left",
        key: "inspection",
        sorter: (a, b) => a.inspection.length - b.inspection.length,
        sortDirections: ["descend", "ascend"],
        editable: true
      },
      {
        title: "Watching List",
        dataIndex: "watching_list",
        align: "left",
        key: "watching_list",
        sorter: (a, b) => a.watching_list.length - b.watching_list.length,
        sortDirections: ["descend", "ascend"],
        editable: true
      },
      {
        title: "Amount",
        dataIndex: "amount",
        align: "left",
        key: "amount",
        sorter: (a, b) => a.amount.length - b.amount.length,
        sortDirections: ["descend", "ascend"],
        editable: true
      }
    ];
    return (
      <div>
        <ScrollMachineHistoryTable dataSource={data} columns={columns} />
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
    schedules: state.schedule.list
  };
}
export default connect(
  mapStateToProps,
  { fetchScheduleByStatus }
)(MachineHistory);
