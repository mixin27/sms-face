import React from "react";
//component
import PageHeaderWrapper from "../../components/PageHeaderWrapper";
import EditableTable from "../../components/InlineCustomTable/CustomTable";
import Can from "../../../src/utils/Can";
import Forbidden from "../Forbidden";
import {
  fetchModel,
  putModel,
  postModel,
  deleteModel
} from "../../actions/Model";
import { connect } from "react-redux";
const uuidv4 = require("uuid/v4");
const columns = require("./columns");

class Model extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getAllModel();
  }

  getAllModel() {
    this.props.fetchModel();
  }

  //update model
  editModel = (data, id) => {
    this.props.putModel(data, id);
  };

  // to create new model
  createNewModel = data => {
    data.created_by = "admin";
    data.updated_by = "";
    this.props.postModel(data);
  };

  // to delete model
  deleteModel = id => {
    this.props.deleteModel(id);
  };

  render() {
    const perform = {
      create: "model:create",
      edit: "model:edit"
    };
    const newData = {
      model_no: "",
      description: ""
    };

    let data = this.props.models;
    data.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    });

    return (
      <div>
        <Can
          role="Admin"
          perform="model:list"
          no={() => {
            return <Forbidden />;
          }}
        >
          <PageHeaderWrapper
            title="Model"
            subtitle="You can add Model data of company by entering New Model button."
            parent="Configuration"
            child="Model"
          />
          {/* <PageHeaderWrapper /> */}
          <EditableTable
            dataSource={data}
            columns={columns}
            title="Model List"
            role="Admin"
            perform={perform}
            newData={newData}
            getData={this.getAllModel}
            editData={(data, id) => this.editModel(data, id)}
            createNewData={data => this.createNewModel(data)}
            deleteData={id => this.deleteModel(id)}
            actionBtnName="Model"
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
    models: state.model.list
  };
}
export default connect(
  mapStateToProps,
  { fetchModel, putModel, postModel, deleteModel }
)(Model);
