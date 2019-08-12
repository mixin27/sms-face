import React from "react";
import EditableCell from "./EditableCell";
import EditableFormRow from "./EditableRow";
import EditableContext from "./Context";
import {
  Table,
  message,
  Popconfirm,
  Card,
  Input,
  Icon,
  Select,
  Row,
  Col
} from "antd";
import Button from "./Button";
import "./index.css";
import Can from "../../../src/utils/Can";

import api from "../../apis";
import { getUserInfo, getUserToken } from "../../utils";

const { Option } = Select;
const uuidv4 = require("uuid/v4");

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.dataSource,
      count: props.count,
      editingKey: "",
      editable: false,
      new: true,
      newEntry: false,
      currentPagination: 1,
      customPagesize: 5
    };
    this.columns = props.columns.concat({
      title: (
        <Can
          role={props.role}
          perform={props.perform.create}
          yes={() => {
            return (
              <span>
                <Icon
                  type="plus-circle"
                  theme="outlined"
                  style={{ color: "#0277BD", width: 20, height: 20 }}
                />
                <Button
                  click={this.handleAdd}
                  btnName={this.props.actionBtnName}
                />
              </span>
            );
          }}
          no={() => {
            return <div />;
          }}
        />
      ),
      width: "20%",
      align: "center",
      render: (text, record) => {
        this.state.editable = this.isEditing(record);
        return (
          <div>
            {this.props.btndisable ? (
              <span>Action</span>
            ) : (
              <Can
                role={props.role}
                perform={props.perform.edit}
                yes={() => {
                  return this.state.editable ? (
                    <span style={{ fontWeight: "bold" }}>
                      <EditableContext.Consumer>
                        {form =>
                          this.state.newEntry ? (
                            <a
                              onClick={() => {
                                this.save(form, record.key);
                              }}
                              style={{ marginRight: 8 }}
                            >
                              Submit
                            </a>
                          ) : (
                            <a
                              onClick={() => {
                                this.update(form, record.key);
                              }}
                              style={{ marginRight: 8 }}
                            >
                              Save
                            </a>
                          )
                        }
                      </EditableContext.Consumer>
                      <Popconfirm
                        title="Sure to cancel?"
                        onConfirm={() => this.cancel(record.key)}
                      >
                        <a>Cancel</a>
                      </Popconfirm>
                    </span>
                  ) : (
                    <p
                      style={{
                        textAlign: "center",
                        margin: 0,
                        fontWeight: "bold"
                      }}
                    >
                      <a
                        onClick={() => {
                          this.edit(record.key);
                        }}
                      >
                        Edit
                        <span style={{ marginLeft: "5px" }} />
                        {/* {this.props.iconEdit && <Icon type="edit" />} */}
                      </a>
                      <span style={{ marginLeft: "20px" }} />
                      <Popconfirm
                        title="Are you sure delete?"
                        onConfirm={() => this.delete(record.key)}
                        okType="danger"
                      >
                        <a style={{ color: "#ff3333" }}>
                          Delete
                          <span style={{ marginLeft: "5px" }} />
                          {/* {this.props.iconDelete && (
                            <Icon type="delete" theme="filled" />
                          )} */}
                        </a>
                      </Popconfirm>
                    </p>
                  );
                }}
              />
            )}
          </div>
        );
      }
    });
  }
  //add
  handleAdd = () => {
    if (!this.state.neworedit) {
      const { data } = this.state;
      var count = data.length.toString();
      var uuid = uuidv4();

      const newData = this.props.newData;
      newData.key = uuid;

      this.edit(uuid);
      data.unshift(newData);

      this.setState({
        neworedit: true,
        editable: true,
        data: [...data],
        editingKey: uuid,
        new: false,
        newEntry: true
      });
    }
  };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.dataSource !== prevProps.dataSource) {
      this.setState({
        loading: false,
        data: this.props.dataSource,
        count: this.props.count
      });
    }
  }

  //Delete
  delete = key => {
    const newData = [...this.state.data];
    const index = newData.findIndex(item => key === item.key);
    const item = newData[index];

    this.props.deleteData(item.id);
    // message.success('Deleted !');
  };

  cancel = Id => {
    const data = [...this.state.data];
    this.setState({
      data: data.filter(
        item => item.Id !== Id && item.code !== "" && item.description !== ""
      ),
      editingKey: "",
      neworedit: false,
      new: true
    });
  };

  isEditing = record => record.key === this.state.editingKey;

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return error;
      }
      this.props.createNewData(row);
    });
    this.setState({
      neworedit: false
    });
  }

  update(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return error;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);

      if (index > -1) {
        const item = newData[index];
        this.props.editData(row, item.id);
        this.setState({ editingKey: "" });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key, new: false, newEntry: false });
  }
  //filter
  PositionFilter(event) {
    let inputdata = event.target.value.toLowerCase();
    const master = this.props.dataSource;
    if (inputdata === "") {
      this.setState({
        data: master
      });
    } else {
      const clone = master.filter(item => {
        return Object.keys(item).some(key =>
          item[key]
            .toString()
            .toLowerCase()
            .includes(inputdata.toLowerCase())
        );
      });
      this.setState({
        data: clone
      });
    }
  }

  render() {
    const { data, neworedit, currentPagination, customPagesize } = this.state;

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };

    const columns = this.columns.map(col => {
      if (col.key === "title" && neworedit === false) {
        col.editable = false;
      } else if (col.key === "title" && neworedit === true) {
        col.editable = true;
      }
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });

    const onChange = page => {
      this.setState({
        currentPagination: page
      });
    };
    const pageSizeHandler = value => {
      this.setState({
        customPagesize: value
      });
    };
    const isMobile = window.innerWidth <= 500;
    const x = isMobile ? 1130 : 0;
    return (
      <Card bordered={false}>
        <Row>
          <Col sm={24} md={24} style={{ paddingBottom: "10px" }}>
            <div
              style={{
                padding: "30px 0px",
                fontSize: "20px",
                fontWeight: "500"
              }}
            >
              <span>{this.props.title}</span>
              <Select
                onChange={pageSizeHandler}
                defaultValue={customPagesize.toString()}
                style={{
                  width: "90px",
                  float: "right"
                  // paddingLeft: '10px',
                }}
              >
                <Select.Option value="5">5</Select.Option>
                <Select.Option value="10">10</Select.Option>
                <Select.Option value="20">20</Select.Option>
              </Select>

              <Input
                onChange={event => this.PositionFilter(event)}
                style={{ width: "25%", float: "right", marginRight: "1%" }}
                prefix={
                  <Icon type="search" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Search"
              />
            </div>
          </Col>
          {/*<h2 >
                    {this.props.title}
                    <div style={{ float: 'right' }}>
                        <Input
                        style={{
                            maxWidth: '170px',
                            alignContent: 'center',
                            justifyContent: 'center',
                        }}
                        onChange={event => {
                            this.PositionFilter(event);
                            console.log('worked');
                        }}
                        placeholder="Search"
                        prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />
                        <Select
                        onChange={pageSizeHandler}
                        defaultValue={customPagesize.toString()}
                        style={{
                            width: '115px',
                            float: 'right',
                            paddingLeft: '10px',
                        }}
                        >
                        <Select.Option value="5">5 / page</Select.Option>
                        <Select.Option value="10">10 / page</Select.Option>

                        <Select.Option value="20">20 / page</Select.Option>
                        </Select>
                    </div>
                    </h2>
                    </Col> */}
        </Row>
        <Row>
          <Col sm={24} md={24}>
            <div style={{ border: "1px solid #e8e8e8" }}>
              <Table
                key={data.key}
                pagination={{
                  onChange: onChange,

                  pageSize: Number(customPagesize),
                  position: "bottom"
                }}
                loading={this.state.loading}
                components={components}
                dataSource={data}
                columns={columns}
                rowClassName="editable-row"
                scroll={{ x: x }}
                bordered
              />
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}
export default EditableTable;
