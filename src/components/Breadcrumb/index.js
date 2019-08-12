import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import styles from './index.module.less'

const routes = [
    
    { path: '/', breadcrumb: 'Home'},
    { path: '/home', breadcrumb: null},
    { path: '/customerList', breadcrumb: 'Customer List'},
    { path: '/changepassword', breadcrumb: 'Change Password'},
    { path: '/home/unanswered', breadcrumb: 'Un Answered'},
    { path: '/news', breadcrumb: 'News' },
    { path: '/tags', breadcrumb: 'Tags' },
    { path: '/users', breadcrumb: 'User List' },
    { path: '/profile', breadcrumb: 'Profile' },
    { path: '/chgpswd', breadcrumb: 'Change Password' },
    { path: '/users/:id', breadcrumb: 'User Detail' },
    { path: '/topic/:id', breadcrumb: 'Topic Detail'},
];

export default withBreadcrumbs(routes)(({ breadcrumbs }) => {
    return (    
            <Breadcrumb separator=">" className={styles.breadcrumbstyle}>
                {breadcrumbs.map((breadcrumb, index) => (
                    <Breadcrumb.Item key={breadcrumb.key}>
                    {
                        <Link to={breadcrumb.props.match.url}>
                        {breadcrumb}
                        </Link>
                    }
                        {(index < breadcrumbs.length - 2) }
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
    )
})
