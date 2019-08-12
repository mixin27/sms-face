import React from "react";
//component
import PageHeaderWrapper from "../../components/PageHeaderWrapper";
import { Card } from "antd";
import { Pie } from "ant-design-pro/lib/Charts";

import { connect } from "react-redux";
import { fetchComplain } from "../../actions/Complain";
import { fetchSchedules } from "../../actions/Schedule";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getComplainData();
    this.getJobs();
  }

  getComplainData() {
    this.props.fetchComplain();
  }

  getJobs() {
    this.props.fetchSchedules();
  }

  render() {
    // Complain Status
    let accept = 0,
      reject = 0,
      neither = 0;
    let complainData = this.props.complains;
    complainData.map(d => {
      console.log(d.complain_status);
      if (d.complain_status == -1) {
        neither += 1;
        console.log(`Neither: ${neither}`);
      } else if (d.complain_status == 1) {
        accept += 1;
        console.log(`Accept: ${accept}`);
      } else if (d.complain_status == 0) {
        reject += 1;
        console.log(`Reject: ${reject}`);
      }
    });

    const complainPieData = [
      {
        x: "Accept",
        y: accept
      },
      {
        x: "Reject",
        y: reject
      },
      {
        x: "Neither",
        y: neither
      }
    ];

    // Job Status
    let assign = 0,
      ongoing = 0,
      complete = 0,
      extend = 0,
      expired = 0;
    let scheduleData = this.props.schedules;
    scheduleData.map(d => {
      console.log(d.schedule_job_status);
      if (d.schedule_job_status === "Assign") {
        assign += 1;
        console.log(`Neither: ${neither}`);
      } else if (d.schedule_job_status === "On Going") {
        ongoing += 1;
        console.log(`Accept: ${accept}`);
      } else if (d.schedule_job_status === "Complete") {
        complete += 1;
        console.log(`Reject: ${reject}`);
      }
    });

    const jobPieData = [
      {
        x: "Assign",
        y: assign
      },
      {
        x: "On Going",
        y: ongoing
      },
      {
        x: "Complete",
        y: complete
      },
      {
        x: "Extend",
        y: extend
      },
      {
        x: "Expired",
        y: expired
      }
    ];

    return (
      <div>
        <PageHeaderWrapper title="Dashboard" />

        <Card bordered={true} style={{ margin: "16px 16px 0 16px" }}>
          <h2>Service Information Status</h2>
        </Card>

        <Card bordered={true} style={{ margin: "16px" }}>
          <div
            style={{
              float: "left",
              width: "50%"
            }}
          >
            <h3 style={{ textAlign: "center" }}>Complain Status</h3>
            <Pie
              hasLegend
              title="Complain Status"
              subTitle="Complain"
              total={() => (
                <span
                  dangerouslySetInnerHTML={{
                    __html: complainPieData.reduce((pre, now) => now.y + pre, 0)
                  }}
                />
              )}
              data={complainPieData}
              valueFormat={val => (
                <span dangerouslySetInnerHTML={{ __html: `${val}` }} />
              )}
              height={200}
              colors={["#79C908", "#D00218", "#0277BD"]}
            />
          </div>

          <div
            style={{
              float: "right",
              width: "50%"
            }}
          >
            <h3 style={{ textAlign: "center" }}>Job Status</h3>
            <Pie
              hasLegend
              title="Job Status"
              subTitle="Job"
              total={() => (
                <span
                  dangerouslySetInnerHTML={{
                    __html: jobPieData.reduce((pre, now) => now.y + pre, 0)
                  }}
                />
              )}
              data={jobPieData}
              valueFormat={val => (
                <span dangerouslySetInnerHTML={{ __html: `${val}` }} />
              )}
              height={200}
              colors={["#0277BD", "#79C908", "#2680EB", "#F8910B", "#FF3818"]}
            />
          </div>
        </Card>
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
    complains: state.complain.list,
    schedules: state.schedule.list
  };
}

export default connect(
  mapStateToProps,
  { fetchComplain, fetchSchedules }
)(Dashboard);
