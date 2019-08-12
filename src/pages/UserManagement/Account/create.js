import React from "react";
import Can from "../../../utils/Can";
import PageHeaderWrapper from "../../../components/PageHeaderWrapper";

import Forbidden from "../../Forbidden";

import { postUser } from "../../../actions/UserAccount";
import { connect } from "react-redux";

import { Form, Input, Card, Button } from "antd";
import styles from "../../../styles/custom.module.less";
import { emailPattern } from "../../../utils/validate-pattern";
import history from "../../../router/history";

const FormItem = Form.Item;

class AccountCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const user = {
          user_name: values.user_name,
          password_hash: values.password,
          phone_no: values.phone_no,
          email: values.email,
          role: "guest",
          created_by: "admin",
          updated_by: "admin"
        };
        this.props.postUser(user);
        history.push("/account");
      }
    });
  };

  handleCancel = () => {
    history.push("/account");
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <React.Fragment>
        <Can
          role="Admin"
          perform="account:list"
          no={() => {
            return <Forbidden />;
          }}
        >
          <PageHeaderWrapper
            title="Create New User"
            parent="Account"
            child="Create New Account"
          />

          <Card style={{ padding: "16px" }}>
            <Form onSubmit={this.handleSubmit} className={styles.formstyle}>
              <FormItem label="User name">
                {getFieldDecorator("user_name", {
                  rules: [
                    {
                      required: true,
                      message: "Enter User Name "
                    }
                  ]
                })(
                  <Input
                    style={{ width: "50%" }}
                    placeholder="Enter User Name"
                  />
                )}
              </FormItem>

              <FormItem label="Email">
                {getFieldDecorator("email", {
                  rules: [
                    {
                      required: true,
                      pattern: emailPattern,
                      message: "Enter Email "
                    }
                  ]
                })(
                  <Input style={{ width: "50%" }} placeholder="Enter Email" />
                )}
              </FormItem>

              <FormItem label="Password">
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "Enter Password "
                    }
                  ]
                })(
                  <Input
                    type="password"
                    style={{ width: "50%" }}
                    placeholder="Enter Password"
                  />
                )}
              </FormItem>

              <FormItem label="Phone No">
                {getFieldDecorator("phone_no", {
                  rules: [
                    {
                      required: true,
                      message: "Enter Phone No "
                    }
                  ]
                })(
                  <Input
                    style={{ width: "50%" }}
                    placeholder="Enter Phone No"
                  />
                )}
              </FormItem>

              {/* Button */}
              <span style={{ marginLeft: "10%" }}>
                <Button
                  style={{ borderRadius: "20px", width: "150px" }}
                  type="primary"
                  htmlType="submit"
                >
                  Create
                </Button>
                <Button
                  style={{
                    borderRadius: "20px",
                    width: "150px",
                    marginLeft: "10%"
                  }}
                  type="add"
                  htmlType="reset"
                  onClick={this.handleCancel}
                >
                  Cancel
                </Button>
              </span>
            </Form>
          </Card>
        </Can>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    lang: state.locale.lang,
    isSignedIn: state.auth.isSignedIn,
    roleid: state.auth.roleid,
    isloaded: state.loading.isloaded
  };
}

export default connect(
  mapStateToProps,
  { postUser }
)(Form.create()(AccountCreate));
