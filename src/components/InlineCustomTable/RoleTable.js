import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import EditableCell from './EditableCell';
import EditableFormRow from './EditableRow';
import EditableContext from './Context';
import { Table, Popconfirm, Card, Input, Icon, Select,Col,Row } from 'antd';
import Button from './Button';
import './index.css';
import moment from 'moment';

const uuidv4 = require('uuid/v4');

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.dataSource,
      count: props.count,
      editingKey: '',
      editable: false,
      new: true,
      newEntry: false,
      currentPagination: 1,
      customPagesize: 5
    };
    this.columns = props.columns.concat({
      title: <Button role={props.isRolePermission} click={this.handleAdd} />,
      width: '15%',
      align: 'center',
      render: (text, record) => {
        this.state.editable = this.isEditing(record);
        return (
          <div>
         
            {this.state.editable ? (
              <span style={{ fontWeight: 'bold' }}>
                <EditableContext.Consumer>
                  {form => (
                    <a
                      onClick={() => {
                        this.save(form, record.key);
                      }}
                      style={{ marginRight: 8 }}
                    >
                      {this.state.newEntry ? (
                        <span style={{ color: '#52c41a' }}>submit</span>
                      ) : (
                        'save'
                      )}
                    </a>
                  )}
                </EditableContext.Consumer>
                <Popconfirm
                  title="Sure to cancel?"
                  onConfirm={() => this.cancel(record.key)}
                >
                  <a>cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <p
                style={{
                  textAlign: 'center',
                  margin: 0,
                  fontWeight: 'bold'
                }}
              >
             
              <Link to="/usermanagement/role/permission"> <span style={{ color: '#52c41a' }}>  permission</span>
              </Link>
             
              <span style={{ letterSpacing: '3px' }}> </span>
                <a
                  onClick={() => {
                    this.edit(record.key);
                  }}
                >
                  edit
                </a>
                <span style={{ letterSpacing: '3px' }}> </span>

                <Popconfirm
                  title="Are you sure delete?"
                  onConfirm={() => this.delete(record.key)}
                  okType="danger"
                >
                  <a style={{ color: '#ff3333' }}>delete</a>
                </Popconfirm>
              </p>
            )}
          </div>
        );
      }
    });
  }
  //add
  handleAdd = () => {
    const { data } = this.state;
    var count = data.length.toString();
    let d=new Date();
    let createdAt=moment(d,'MM/DD/yyyy').format("DD.MM.YYYY HH:MM");
    var uuid = uuidv4();
    const newData = {
      key: uuid,
      name: '',
      description: '',
      createdAt: createdAt,
      count: count
    };
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
    newData.splice(index, 1);
    this.setState({ data: newData });
  };

  cancel = Id => {
    const data = [...this.state.data];
    this.setState({
      data: data.filter(
        item => item.Id !== Id && item.code !== '' && item.description !== ''
      ),
      editingKey: '',
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
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
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
    console.log('user type: ', inputdata);
    if (inputdata === '') {
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

      console.log('Matched', clone);
    }
  }

  render() {
    const { data, neworedit, currentPagination, customPagesize } = this.state;

    console.log('table data', this.props.isMobile);
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };

    const columns = this.columns.map(col => {
      if (col.key === 'title' && neworedit === false) {
        col.editable = false;
      } else if (col.key === 'title' && neworedit === true) {
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

    return (
      <Card bordered={false}>
      <Row>
          <Col sm={24} md={24} style={{ paddingBottom: '10px'}}>
        {/* <h2>
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
              float: 'right'
            }}
          >
            <Select.Option value="5">5 / page</Select.Option>
            <Select.Option value="10">10 / page</Select.Option>

            <Select.Option value="20">20 / page</Select.Option>
          </Select>
        </div>
        </h2> */}
        <h2 style={{ paddingBottom: '10px' }}>
          {this.props.title}
          <Select
            onChange={pageSizeHandler}
            defaultValue={customPagesize.toString()}
            style={{
              width: '115px',
              float: 'right',
            }}
          >
            <Select.Option value="5">5 / page</Select.Option>
            <Select.Option value="10">10 / page</Select.Option>

            <Select.Option value="20">20 / page</Select.Option>
          </Select>
          <Input
            style={{
              width: '25%',
              marginRight: '-3%',
              float: 'right'
            }}
            onChange={event => {
              this.PositionFilter(event);
              console.log('worked');
            }}
            placeholder="Search"
            prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
        </h2>
        </Col>
        </Row>
        <Row>
        <Col>
        <div style={{ border: '1px solid #e8e8e8' }}>
          <Table
            key={data.key}
            pagination={{
              onChange: onChange,

              pageSize: Number(customPagesize),
              position: 'bottom'
            }}
            loading={this.state.loading}
            components={components}
            dataSource={data}
            columns={columns}
            scroll={{x:0}}
            rowClassName="editable-row"
            bordered
          />
        </div>
        </Col>
        </Row>
      </Card>
    );
  }
}

export default withRouter(EditableTable);
