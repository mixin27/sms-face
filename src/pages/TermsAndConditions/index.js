import React from "react";
import { Card, Menu, Row, Col, Checkbox, Button, Tabs } from "antd";
import history from "../../router/history";
import PageHeaderWrapper from "../../components/PageHeaderWrapper";
import TermsAndCondt from "./terms-and-conditions";
import Privacy from "./privacy";

const { TabPane } = Tabs;

const cardTitle = (
  <h2
    style={{ fontWeight: "bold", fontFamily: "sans-serif", color: "#696969" }}
  >
    Terms and Conditions
  </h2>
);
const { SubMenu } = Menu;

class TermsAndConditions extends React.Component {
  state = {
    btnDisable: false
  };

  onChange = e => {
    console.log("checked = ", e.target.checked);
    this.setState({
      btnDisable: e.target.checked
    });
  };
  handleSubmit(e) {
    e.preventDefault();
    history.push("/");
  }

  render() {
    return (
      <div>
        {/* <PageHeaderWrapper title="" parent="" /> */}

        <Card
          style={{
            marginLeft: "20px"
          }}
          title={cardTitle}
          bordered={true}
        >
          <Tabs defaultActiveKey="1" tabPosition="left">
            <TabPane tab="Terms and Conditions" key={1}>
              <TermsAndCondt />
            </TabPane>
            <TabPane tab="Privacy" key={2}>
              <Privacy />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    );
  }
}

export default TermsAndConditions;
