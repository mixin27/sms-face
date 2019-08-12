import React from 'react';
import { Input, Form } from 'antd';
import EditableContext from './Context';

const FormItem = Form.Item;

export default class EditableCell extends React.Component {
  state = {
    nameStatus: '',
    nameMessage: ''
  };

  getInput = dataIndex => {
    switch (dataIndex) {
      case 'title':
        return <Input autoFocus />;
      case 'mno':
        return <Input autoFocus />;
      default:
        return <Input />;
    }
  };

  nameAsyncValidator = p => {
    console.log('p', p);
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;

    return (
      <EditableContext.Consumer>
        {form => {
          const { getFieldDecorator } = form;
          //const { nameStatus } = this.state
          const { title } = this.props;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem
                  // {{title} == 'Name'?
                  // validateStatus={nameStatus}:
                  // null
                  // }
                  style={{ marginBottom: '3px' }}
                >
                  {getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `${title} field is required !`
                      }
                      // { validator: this.nameAsyncValidator,},
                    ],
                    initialValue: record[dataIndex]
                  })(this.getInput(dataIndex))
                  /* {dataIndex !== 'address'
                    ? getFieldDecorator(dataIndex, {
                        rules: [
                          {
                            required: true,
                            message: `${title} field is required !`
                          }
                          // { validator: this.nameAsyncValidator,},
                        ],
                        initialValue: record[dataIndex]
                      })(this.getInput())
                    : getFieldDecorator(dataIndex, {
                        rules: [
                          {
                            required: false
                          }
                          // { validator: this.nameAsyncValidator,},
                        ],
                        initialValue: record[dataIndex]
                      })(this.getInput())} */
                  }
                </FormItem>
              ) : (
                restProps.children
              )}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}
