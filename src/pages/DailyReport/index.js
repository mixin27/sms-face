import React from "react";
import PageHeaderWrapper from "../../components/PageHeaderWrapper";

import { connect } from "react-redux";
import { fetchSchedules, fetchScheduleByStatus } from "../../actions/Schedule";
import { postDailyReport, fetchDailyReport } from "../../actions/DailyReport";

import api from "../../apis";
import moment from "moment";

import { Card, Form, Select, Input, Button, Divider, Table } from "antd";
import { Link } from "react-router-dom";
import { numberPattern } from "../../utils/validate-pattern";

const uuidv4 = require("uuid/v4");

const Option = { Select };
const { TextArea } = Input;
const FormItem = Form.Item;

class DailyReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job: [],
      current_date: moment().format("YYYY/MM/DD")
    };
  }

  componentDidMount() {
    this.getSchedules();
    this.getAllSchedules();
    this.getAllDailyReport();
  }

  getSchedules() {
    this.props.fetchScheduleByStatus("On Going");
  }

  getAllDailyReport() {
    this.props.fetchDailyReport();
  }

  getAllSchedules() {
    api
      .get(`schedules`)
      .then(response => {
        this.setState({
          job: response.data.data
        });
      })
      .catch(e => console.log(e));
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const report = {
          job_code: values.job_code,
          fup_no: values.fup_no,
          date: this.state.current_date,
          working_hr: values.working_hr,
          description: values.description,
          remark: values.remark,
          created_by: "service-man",
          updated_by: "service-man"
        };

        console.log(report);

        this.props.postDailyReport(report);
        this.props.form.resetFields();
      }
    });
  };

  render() {
    const jobArray = [...this.state.job];
    let dailyReportData = this.props.dailyReports;
    dailyReportData.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    });
    const columns = [
      {
        title: "Job Code",
        key: "job_code",
        dataIndex: "job_code",
        width: "10%"
      },
      {
        title: "FUP No",
        key: "fup_no",
        dataIndex: "fup_no",
        width: "10%"
      },
      {
        title: "Date",
        key: "date",
        dataIndex: "date",
        width: "20%"
      },
      {
        title: "Description",
        key: "description",
        dataIndex: "description",
        width: "40%"
      },
      {
        title: "Remark",
        key: "remark",
        dataIndex: "remark",
        width: "20%"
      },
      // {
      //   title: "Action",
      //   render: record => (
      //     <>
      //       <span style={{color: 'red'}}>
      //         <Link to={`/daily-report/view/${record.id}`}>
      //           View
      //         </Link>
      //       </span>
      //     </>
      //   )
      // }
    ];

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 14
      }
    };

    let data = this.props.schedules;
    const renderJob = (
      <Select style={{ width: "50%" }} placeholder="Select Job">
        {data.map(item => {
          return <Option value={item.job_code}>{item.job_code}</Option>;
        })}
      </Select>
    );

    const renderFUPNo = (
      <Select style={{ width: "50%" }} placeholder="Select FUP">
        {data.map(item => {
          return <Option value={item.fup_no}>{item.fup_no}</Option>;
        })}
      </Select>
    );

    console.log("JOBS: " + this.state.job.job_code);
    return (
      <React.Fragment>
        <PageHeaderWrapper title="Daily Report" parent="Daily Report /" />

        <Card>
          <h3>Report Form</h3>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="Date" {...formItemLayout}>
              <span style={{ color: "#0277BD" }}>{this.state.current_date}</span>
            </FormItem>

            <FormItem label="Job Code" {...formItemLayout}>
              {getFieldDecorator("job_code", {
                rules: [
                  {
                    required: true,
                    message: "Select Job Code"
                  }
                ]
              })(renderJob)}
            </FormItem>

            <FormItem label="FUP No" {...formItemLayout}>
              {getFieldDecorator("fup_no", {
                rules: [
                  {
                    required: true,
                    message: "Select FUP No"
                  }
                ]
              })(renderFUPNo)}
            </FormItem>

            <FormItem label="Working Hours" {...formItemLayout}>
              {getFieldDecorator("working_hr", {
                rules: [
                  {
                    required: true,
                    pattern: numberPattern,
                    message: "Enter Working Hours "
                  }
                ]
              })(
                <Input
                  style={{ width: "50%" }}
                  placeholder="Enter Working Hours"
                />
              )}
            </FormItem>

            <FormItem label="Description" {...formItemLayout}>
              {getFieldDecorator("description", {
                rules: [
                  {
                    required: false,
                    message: "Enter Description "
                  }
                ]
              })(<TextArea rows={4} cols={60} style={{ width: "50%" }} />)}
            </FormItem>

            <FormItem label="Remark" {...formItemLayout}>
              {getFieldDecorator("remark", {
                rules: [
                  {
                    required: false,
                    message: "Enter FUP No "
                  }
                ]
              })(<Input style={{ width: "50%" }} placeholder="Remark" />)}
            </FormItem>

            <span style={{ marginLeft: "20%" }}>
              <Button
                style={{ borderRadius: "20px", width: "90px" }}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
              <span style={{ marginLeft: "20px" }} />
              <Button
                style={{
                  borderRadius: "20px",
                  width: "90px"
                }}
                type="add"
                htmlType="reset"
              >
                Cancel
              </Button>
            </span>
          </Form>

          <Divider />

          {/* <div style={{ backgroundColor: "#ffffff", padding: "16px" }}>
            <Select
              style={{ width: "180px", marginLeft: "80%", marginTop: "16px" }}
              placeholder="Select Job"
            >
              {jobArray.map(job => (
                <Option key={job.job_code}>{job.job_code}</Option>
              ))}
            </Select>
          </div> */}
          <div style={{ margin: "20px" }}>
            <h3>Report History</h3>

            <Table style={{marginTop: '10px'}} dataSource={dailyReportData} columns={columns} />
          </div>
        </Card>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    schedules: state.schedule.list,
    dailyReports: state.dailyReport.list
  };
}

export default connect(
  mapStateToProps,
  { fetchSchedules, fetchScheduleByStatus, postDailyReport, fetchDailyReport }
)(Form.create()(DailyReport));
