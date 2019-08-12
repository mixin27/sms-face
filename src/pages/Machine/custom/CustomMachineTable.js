import React from "react";
import {
  Table,
  Button,
  Card,
  Select,
  Popconfirm,
  Input,
  Icon,
  message
} from "antd";
import { Link } from "react-router-dom";

class ScrollMachineTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.dataSource,
      count: props.count,
      currentPagination: 1,
      customPagesize: 5
    };
    this.columns = props.columns.concat({
      title: "Action",
      align: "center",
      render: record => (
        <>
          {this.props.module && (
            <div>
              {/* <Link
                style={{ color: "#79C908" }}
                to={{
                  pathname: `/${this.props.module}s/${this.props.module}/view`,
                  state: {
                    id: record.id
                  }
                }}
              >
                View
              </Link>{" "} */}
              <span style={{ marginLeft: "20px" }} />
              <Link
                style={{ color: "#1890FF" }}
                to={`/${this.props.module}s/${this.props.module}/edit/${record.id}`}
              >
                Edit
              </Link>{" "}
              <span style={{ marginLeft: "20px" }} />
              <Popconfirm
                onConfirm={() => this.delete(record.key)}
                onCancel={this.cancel}
                placement="left"
                title="Are you sure delete?"
                okText="Yes"
                cancelText="No"
                okType="danger"
                style={{ backgroundColor: "#33ff33" }}
              >
                <a style={{ color: "#D0021B" }}>Delete</a>
              </Popconfirm>
            </div>
          )}
        </>
      )
    });
  }
  //tableFunction
  onChange(pagination, filters, sorter) {
    console.log("params", pagination, filters, sorter);
  }

  cancel(e) {
    message.error("Click on No");
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
        console.log(item);
        console.log(Object.keys(item));
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
  isEditing = record => record.key === this.state.editingKey;

  // delete = key => {
  //   const newData = [...this.state.data];
  //   const index = newData.findIndex(item => key === item.key);
  //   console.log(index);
  //   newData.splice(index, 1);
  //   this.setState({ data: newData });
  //   const item = newData[index];
  //   if (index != 0) {
  //     // if (this.props.module == "employee") {
  //     //   api.delete(`${this.props.module}s/${newData[index].id}`);
  //     // } else if (this.props.module == "complain") {
  //     //   api.delete(`${this.props.module}s/${newData[index].id}`);
  //     // } else if (this.props.module == "machine") {
  //     //   api.delete(`${this.props.module}s/${newData[index].id}`);
  //     // }
  //     api.delete(`${this.props.module}s/${item.id}`);
  //     message.success("Deleted !");
  //   }
  // };

  delete = key => {
    const newData = [...this.state.data];
    const index = newData.findIndex(item => key === item.key);
    const item = newData[index];

    this.props.deleteData(item.id);
    // message.success('Deleted !');
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
  render() {
    const { data, neworedit, currentPagination, customPagesize } = this.state;

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
    return (
      <Card bordered={false}>
        <h2 style={{ paddingBottom: "10px" }}>
          {this.props.title && (
            <Button
              type="primary"
              style={{
                marginBottom: "20px",
                backgroundColor: "#0277BD",
                borderRadius: "5px"
              }}
            >
              {this.props.module && (
                <Link
                  style={{ color: "#fff" }}
                  to={`/${this.props.module}s/${this.props.module}/new`}
                >
                  New {this.props.title}
                </Link>
              )}
            </Button>
          )}
          <Select
            onChange={pageSizeHandler}
            defaultValue={customPagesize.toString()}
            style={{
              width: "90px",
              float: "right"
              // paddingLeft: '10px'
            }}
          >
            <Select.Option value="5">5</Select.Option>
            <Select.Option value="10">10</Select.Option>

            <Select.Option value="20">20</Select.Option>
          </Select>
          <Input
            style={{
              // maxWidth: '170px',
              // alignContent: 'center',
              // justifyContent: 'center',
              width: "25%",
              marginRight: "1%",
              float: "right"
            }}
            onChange={event => {
              this.PositionFilter(event);
            }}
            placeholder="Search"
            prefix={<Icon type="search" style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </h2>
        <div style={{ border: "1px solid #e8e8e8" }}>
          <Table
            key={data.key}
            pagination={{
              onChange: onChange,
              pageSize: Number(customPagesize),
              position: "bottom"
            }}
            dataSource={data}
            columns={columns}
            rowClassName="editable-row"
            bordered
          />
        </div>
      </Card>
    );
  }
}

export default ScrollMachineTable;
