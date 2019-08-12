import React from 'react';
import EditableContext from './Context';
import { Form } from 'antd';

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} style={{ textAlign: 'center' }} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

export default EditableFormRow;
