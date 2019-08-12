//react
import React from "react";
import QueueAnim from "rc-queue-anim";
import history from "../../router/history";
import config from "../../utils/config";
//redux
import { connect } from "react-redux";
import { signIn, currentUser } from "../../actions/Auth";
//ant
import { Button, Icon, Form, Input, Layout, Card } from "antd";
//image
import logo from "./lg.jpg";
import serviceLogo from "../../assets/img/logo_service.png";
//css
import styles from "./index.module.less";

const { Footer } = Layout;

const FormItem = Form.Item;

class Login extends React.Component {
  state = { loading: false };

  componentDidMount() {
    if (this.props.isSignedIn) {
      history.push("/");
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props
          .signIn(values)
          .then(aa => {
            this.props.currentUser();
          })
          .catch(e => console.log(e));
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { isloaded } = this.props;
    return (
      <React.Fragment>
        <div className={styles.loginContainer}>
          <div>
            <Card
              bordered={true}
              // style={{ border: '1px solid #0277BD' }}
              className={styles.form}
            >
              <QueueAnim delay={200} type="top">
                {/* <div className={styles.logo} key="1">
                
              </div> */}
                <img style={{ width: "200px" }} alt="logo" src={logo} />

                <div
                  style={{
                    marginTop: "-35px",
                    marginLeft: "10%",
                    color: "#0277BD",
                    fontFamily: "monospace"
                  }}
                >
                  <span>Service Management System</span>
                </div>
              </QueueAnim>
              <div
                className={styles.formContainer}
                style={{ marginTop: "20px" }}
              >
                <div className={styles.formLeft}>
                  <div className={styles.des} key="1">
                    {/* <img alt="logo" src={`https://i.gifer.com/7spU.gif`} /> */}
                    <img alt="logo" src={serviceLogo} />
                  </div>
                </div>
                <div className={styles.formRight}>
                  <h3
                    style={{
                      marginBottom: "10px",
                      marginTop: "20px",
                      fontWeight: "500",
                      color: '#0277BD'
                    }}
                  >
                    LOGIN
                  </h3>
                  <form layout="vertical" onSubmit={this.handleSubmit}>
                    <QueueAnim delay={200} type="top">
                      <FormItem key="1">
                        {getFieldDecorator("email", {
                          rules: [
                            {
                              type: "email",
                              message: "The input is not valid E-mail!"
                            },
                            {
                              required: true,
                              message: "Required username"
                            }
                          ]
                        })(
                          <Input
                            prefix={
                              <Icon
                                type="mail"
                                style={{ color: "rgba(0,0,0,.25)" }}
                                theme="filled"
                              />
                            }
                            placeholder="User Name"
                          />
                        )}
                      </FormItem>
                      <FormItem key="2">
                        {getFieldDecorator("password", {
                          rules: [
                            {
                              required: true,
                              message: "Required password"
                            }
                          ]
                        })(
                          <Input.Password
                            prefix={
                              <Icon
                                type="lock"
                                style={{ color: "rgba(0,0,0,.25)" }}
                                theme="filled"
                              />
                            }
                            type="password"
                            placeholder="Password"
                          />
                        )}
                      </FormItem>
                      <FormItem key="3">
                        <Button
                          style={{
                            backgroundColor: "#0277BD",
                            color: "white",
                            height: "45px",
                            borderRadius: "10px"
                          }}
                          htmlType="submit"
                          size="default"
                          loading={isloaded}
                        >
                          LOGIN
                        </Button>
                      </FormItem>
                    </QueueAnim>
                  </form>
                </div>
              </div>
            </Card>
          </div>
          {/* <div className={styles.footer}>
            <Footer style={{ textAlign: "center", background: "#fff" }}>
              {config.footerText}
            </Footer>
          </div> */}
        </div>
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
  { signIn, currentUser }
)(Form.create()(Login));
