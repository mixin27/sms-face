import React from 'react'
import Exception from 'ant-design-pro/lib/Exception';
import 'ant-design-pro/dist/ant-design-pro.css'; // Import whole style

const Error = () => (
    <Exception type="403" title="403 Forbidden !" desc="The page you are looking for might have been forbidden." backText="Back To Home"/>
)

export default Error