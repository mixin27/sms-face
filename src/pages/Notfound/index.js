import React from 'react'
import Exception from 'ant-design-pro/lib/Exception';
import 'ant-design-pro/dist/ant-design-pro.css'; // Import whole style

const Error = () => (
    <Exception type="404" title="404 Error!" desc="The page you are looking for might have been removed had its name changed or is temporarily unavailable." backText="Back To Home"/>
)

export default Error