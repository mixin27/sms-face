import React from "react";
//component
import PageHeaderWrapper from "../../components/PageHeaderWrapper";
import EditableTable from "../../components/InlineCustomTable/CustomTable";
import { getUserInfo, getUserToken } from "../../utils";
import Can from "../../../src/utils/Can";
import Forbidden from "../Forbidden";
import {
  fetchPosition,
  putPosition,
  postPosition,
  deletePosition
} from "../../actions/Position";
import { connect } from "react-redux";
const uuidv4 = require("uuid/v4");
const columns = require('./colunms')

class Position extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getAllPosition();
  }

  getAllPosition() {
    console.log(this.props.fetchPosition());
  }

  //update position
  editPosition = (data, id) => {
    this.props.putPosition(data, id);
  };

  // to create new position
  createNewPosition = data => {
    let userInfo = getUserInfo();
    data.created_by = "admin";
    data.updated_by = "";
    this.props.postPosition(data);
  };

  // to delete position
  deletePosition = id => {
    this.props.deletePosition(id);
  };

  render() {
    const perform = {
      create: "position:create",
      edit: "position:edit"
    };
    const newData = {
      position_type: "",
      description: ""
    };

    let data = this.props.positions;
    data.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    });

    return (
      <div>
        <Can
          role="Admin"
          perform="position:list"
          no={() => {
            return <Forbidden />;
          }}
        >
          <PageHeaderWrapper
            title="Position"
            subtitle="You can add position data of company by entering New Model button."
            parent="Configuration"
            child="Position"
          />
          {/* <PageHeaderWrapper /> */}
          <EditableTable
            dataSource={data}
            columns={columns}
            title="Position List"
            role="Admin"
            perform={perform}
            newData={newData}
            getData={this.getAllPosition}
            editData={(data, id) => this.editPosition(data, id)}
            createNewData={data => this.createNewPosition(data)}
            deleteData={id => this.deletePosition(id)}
            actionBtnName="Position"
            iconEdit="edit"
            iconDelete="delete"
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
    positions: state.position.list
  };
}
export default connect(
  mapStateToProps,
  { fetchPosition, putPosition, postPosition, deletePosition }
)(Position);
