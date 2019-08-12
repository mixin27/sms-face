import React, { PureComponent } from 'react';
import { Dropdown } from 'antd';

import './index.css'

export default class HeaderDropdown extends PureComponent {
    render() {
        const { overlayClassName, ...props } = this.props;
        return (
            <Dropdown overlayClassName='container' {...props} />
            );
        }
    }