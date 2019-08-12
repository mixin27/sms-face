import React from "react";
import { Modal } from "antd";
import history from "../../router/history";

class DetailMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }

  handleOk = () => {
    this.setState({
      visible: false
    });

    history.push("/machines");
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });

    history.push("/machines");
  };

  render() {
    return (
      <Modal visible={this.state.visible} onCancel={this.handleCancel} onOk={this.handleOk}>
        <h2>Machine Detail</h2>
      </Modal>
    );
  }
}

export default DetailMachine;
