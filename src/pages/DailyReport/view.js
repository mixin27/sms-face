import React from "react";
import { Modal } from "antd";
import history from "../../router/history";

class DailyReportView extends React.Component {
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

    history.push("/daily-report");
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });

    history.push("/daily-report");
  };

  render() {
    return (
      <Modal visible={this.state.visible} onCancel={this.handleCancel} onOk={this.handleOk}>
        <h2>Report Detail</h2>
      </Modal>
    );
  }
}

export default DailyReportView;
