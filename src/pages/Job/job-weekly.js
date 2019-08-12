import React from "react";
import PageHeaderWrapper from "../../components/PageHeaderWrapper";
import { Button } from "antd";
import JobItem from "./job-item";
import { Link } from "react-router-dom";
import { fetchSchedules } from "../../actions/Schedule";
import { connect } from "react-redux";
import api from "../../apis";

class JobWeekly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      complainData: {}
    };
  }

  componentDidMount() {
    this.getJob();
  }

  getJob() {
    this.props.fetchSchedules();
  }

  async getComplain(complainNo) {
    api
      .get(`complains/complain/${complainNo}`)
      .then(response => {
        
      })
      .catch(e => console.log(e));
  }

  getItems() {
    const items = [];
    const complains = [];
    let data = this.props.schedules;
    data.map(item => {
      this.getComplain(item.complain_no)
      items.push(
        <Link to={`/job-detail/${item.id}/${item.complain_no}`}>
          <JobItem item={item} />
        </Link>
      );
    });
    return items;
  }

  render() {
    return (
      <React.Fragment>
        <PageHeaderWrapper title="Assign To Job List" parent="Job /" />
        <div
          style={{
            background: "#ffffff",
            paddingTop: "10px",
            paddingLeft: "10px",
            paddingBottom: "20px"
          }}
        >
          <Link to={`/job-weekly`}>
            <Button type="primary" style={{ width: "100px" }}>
              Weekly
            </Button>
          </Link>
          <span style={{ marginLeft: "10px" }} />
          <Link to={`/job-all`}>
            <Button type="add" style={{ width: "100px" }}>
              All
            </Button>
          </Link>

          <div style={{ margin: "10px" }}>{this.getItems()}</div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    schedules: state.schedule.list
  };
}

export default connect(
  mapStateToProps,
  { fetchSchedules }
)(JobWeekly);
