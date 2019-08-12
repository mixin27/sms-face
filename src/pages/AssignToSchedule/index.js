import React from "react";
import Can from "../../utils/Can";
import PageHeaderWrapper from "../../components/PageHeaderWrapper";
import Forbidden from "../Forbidden";
import { fetchComplain, putComplain } from "../../actions/Complain";
import { Table, Row, Col, Card, Divider } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ServiceMan from "../ServiceMan";
import AssignToScheduleScrollTable from "./custom/CustomAssignToScheduleTable";

// import "./index.css";

const uuidv4 = require("uuid/v4");
const columns = require("../Complain/columns");

class AssignToSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getComplainList();
  }

  getComplainList = () => {
    this.props.fetchComplain();
  };

  updateComplain = id => {
    this.props.putComplain({ complain_status: 0, updated_by: 'super-admin' }, id);
  };

  render() {
    let data = this.props.complains;
    data.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    });

    return (
      <div>
        <Can
          role="Admin"
          perform="assigntoschedule:list"
          no={() => {
            return <Forbidden />;
          }}
        >
          <PageHeaderWrapper
            title="To Assign Schedule"
            subtitle="There are a lot of complain list received from everywhere. They are not still accept yer. You can choose whether to receive or reject. You can create new too."
            parent="Assign To Schedule"
          />

          <Card bordered={false}>
            {/* Complain List Table */}
            <h3 style={{ color: "#0277BD" }}>Complain List</h3>
            <div>
              <AssignToScheduleScrollTable
                dataSource={data}
                columns={columns}
                rejectComplain={id => this.updateComplain(id)}
              />
            </div>

            {/* Service Man Table */}
            <h3 style={{ color: "#0277BD" }}>Service Man List</h3>
            <div>
              <ServiceMan />
            </div>
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
    complains: state.complain.list
  };
}
export default connect(
  mapStateToProps,
  { fetchComplain, putComplain }
)(AssignToSchedule);
