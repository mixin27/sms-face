import React from "react";
import Can from "../../../utils/Can";
import PageHeaderWrapper from "../../../components/PageHeaderWrapper";

import Forbidden from "../../Forbidden";

import { putUser } from "../../../actions/UserAccount";
import { connect } from "react-redux";

import { Form, Input, Card, Button } from "antd";
import styles from "../../../styles/custom.module.less";
import { emailPattern } from "../../../utils/validate-pattern";
import history from "../../../router/history";

import api from "../../../apis";

const FormItem = Form.Item;

class AccountEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      data: {
        id: 0,
        user_name: "",
        password_hash: "",
        phone_no: "",
        email: "",
        role: "",
        created_by: "admin"
      }
    };
  }

  componentDidMount() {
    this.getUser();
  }

  async getUser() {
    const response = await api.get(`users/${this.state.id}`);
    if (response && response.status == 200) {
      let data = response.data.data;
      this.setState({ data: data });
      // this.setInitialValues();
      console.log(this.state.data);
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields(async (err, values) => {
      const { data } = this.state;
      if (!err) {
        const user = {
          user_name: data.user_name,
          password_hash: data.password_hash,
          phone_no: data.phone_no,
          email: data.email,
          role: data.role,
          updated_by: "admin"
        };

        this.props.putUser(user, this.state.id);
        history.push("/account");
      }
    });
  };

  handleCancel = () => {
    history.push("/account");
  };

  handleChange = name => event => {
    this.setState({
      data: {
        ...this.state.data,
        [name]: event.target.value
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { data } = this.state;
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
            title="Edit Account"
            parent="Account"
            child="Edit Account"
          />

          <Card style={{ padding: "16px" }}>
            <Form onSubmit={this.handleSubmit} className={styles.formstyle}>
              <FormItem label="User name">
                {getFieldDecorator("user_name", {
                  initialValue: data.user_name,
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
                    onChange={this.handleChange("user_name")}
                  />
                )}
              </FormItem>

              <FormItem label="Email">
                {getFieldDecorator("email", {
                  initialValue: data.email,
                  rules: [
                    {
                      required: true,
                      pattern: emailPattern,
                      message: "Enter Email "
                    }
                  ]
                })(
                  <Input
                    style={{ width: "50%" }}
                    placeholder="Enter Email"
                    onChange={this.handleChange("email")}
                  />
                )}
                {/* {data.email} */}
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
                    placeholder="Enter New Password"
                    onChange={this.handleChange("password_hash")}
                  />
                )}
              </FormItem>

              <FormItem label="Phone No">
                {getFieldDecorator("phone_no", {
                  initialValue: data.phone_no,
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
                    onChange={this.handleChange("phone_no")}
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
                  Update
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
  { putUser }
)(Form.create()(AccountEdit));
