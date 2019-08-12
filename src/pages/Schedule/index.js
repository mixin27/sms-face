import React from "react";
import Can from "../../utils/Can";
import PageHeaderWrapper from "../../components/PageHeaderWrapper";
import Forbidden from "../Forbidden";

import {
  fetchSchedules,
  putSchedule,
  postSchedule,
  deleteSchedule
} from "../../actions/Schedule";
import { connect } from "react-redux";
import ScrollScheduleTable from "./custom/CustomScheduleTable";

const uuidv4 = require("uuid/v4");

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.getAllSchedules();
  }

  getAllSchedules() {
    this.props.fetchSchedules();
  }

  // to delete complain
  deleteSchedule = id => {
    this.props.deleteSchedule(id);
  };

  // Job Status
  getJobStatusColor = record => {
    if (record.schedule_job_status == "On Going") {
      return "#18FF46";
    } else if (record.schedule_job_status == "Extend") {
      return "#F8910B";
    } else if (record.schedule_job_status == "Assign") {
      return "#3A08D4";
    } else if (record.schedule_job_status == "Complete") {
      return "#2680EB";
    } else if (record.schedule_job_status == "Expire") {
      return "#FF3818";
    } else if (record.schedule_job_status == "Job Done") {
      return "#C5AF22";
    } else {
      return "#222222";
    }
  };

 

  render() {
    let data = this.props.schedules;
    data.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    });

    const columns = [
      {
        title: "FUP Number",
        dataIndex: "fup_no",
        key: "fup_no",
        align: "center",
        fixed: "left",
        editable: true,
        sortDirections: ["ascend", "descend"],
        sorter: (a, b) => a.fup_no.length - b.fup_no.length
      },
      {
        title: "Complain No",
        dataIndex: "complain_no",
        align: "center",
        key: "complain_no",
        fixed: "left",
        sorter: (a, b) => a.complain_no.length - b.complain_no.length,
        sortDirections: ["descend", "ascend"],
        editable: true
      },
      {
        title: "Job Code",
        dataIndex: "job_code",
        align: "center",
        key: "job_code",
        fixed: "left",
        sorter: (a, b) => a.job_code.length - b.job_code.length,
        sortDirections: ["descend", "ascend"],
        editable: true
      },
      {
        title: "Job Status",
        fixed: "left",
        render: record => (
          <>
            <div style={{ color: this.getJobStatusColor(record) }}>
              {record.schedule_job_status}
            </div>
          </>
        )
      },
      {
        title: "Service Charge",
        dataIndex: "service_charge",
        align: "center",
        // key: "service_charge",
        // sorter: (a, b) => a.service_charge.length - b.service_charge.length,
        // sortDirections: ["descend", "ascend"],
        editable: true
      },
      {
        title: "Inspection",
        dataIndex: "inspection",
        align: "center",
        // key: "inspection",
        // sorter: (a, b) => a.inspection.length - b.inspection.length,
        // sortDirections: ["descend", "ascend"],
        editable: true
      },
      {
        title: "Watching List",
        dataIndex: "watching_list",
        align: "center",
        // key: "watching_list",
        // sorter: (a, b) => a.watching_list.length - b.watching_list.length,
        // sortDirections: ["descend", "ascend"],
        editable: true
      },
      {
        title: "Job Title",
        dataIndex: "schedule_job_title",
        align: "center",
        key: "schedule_job_title",
        sorter: (a, b) => a.schedule_job_title.length - b.schedule_job_title.length,
        sortDirections: ["descend", "ascend"],
        editable: true
      },
      {
        title: "Job Description",
        dataIndex: "schedule_job_description",
        align: "center",
        width: "30%",
        key: "schedule_job_description",
        sorter: (a, b) => a.schedule_job_description.length - b.schedule_job_description.length,
        sortDirections: ["descend", "ascend"],
        editable: true
      },
      {
        title: "Service Man Id",
        dataIndex: "emp_code",
        align: "center",
        width: "30%",
        key: "emp_code",
        sorter: (a, b) => a.emp_code.length - b.emp_code.length,
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
            title="Schedule List"
            subtitle="There are a lot of complain list retrieved from everywhere. They are not still accept yer. You can choose whether to receive or reject. You can create new too."
            parent="Schedule"
          />

          <ScrollScheduleTable
            dataSource={data}
            columns={columns}
            title="Schedule List"
            role="Admin"
            deleteData={id => this.deleteSchedule(id)}
          />
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
    schedules: state.schedule.list
  };
}
export default connect(
  mapStateToProps,
  { fetchSchedules, putSchedule, postSchedule, deleteSchedule }
)(Schedule);
