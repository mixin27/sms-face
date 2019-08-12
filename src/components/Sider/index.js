import React from 'react'
import { Layout,Drawer } from 'antd';
import classNames from 'classnames';
import logo from '../../assets/img/brand.svg'
import styles from './index.module.less'
import { Link } from  'react-router-dom'

import MenuComponent from '../Menu'


const { Sider } = Layout;


export default ({collapsed,isMobile,roleid,theme,onCollapse}) => {
    const siderClassName = classNames(styles.sider, {
        [styles.fixSiderBar]: true,
        [styles.light]: true,
    });
    const siderClassNameMobile = classNames(styles.sider, {
        [styles.fixSiderBar]: false,
        [styles.light]: true,
    });
    
    return isMobile ? (
        
        <Drawer
            visible={!collapsed}
            placement="left"
            onClose={() => onCollapse(true)}
            style={{
                padding: 0,
                height: '100vh',
            }}
        >

        <Sider
            className={siderClassNameMobile}
            width={246}
            trigger={null}
            breakpoint="lg"
            collapsible
            theme={theme}
            collapsed={isMobile ? false : false}
            >
            <div className={styles.logo} id="logo">
                <Link to="/">
                    <img src={logo} alt="logo" />
                    <h1>HYUNDAI</h1>
                </Link>
            </div>  
            <MenuComponent onselect = {() => onCollapse(true)} roleid={roleid}/>
        </Sider>
        </Drawer>
    ) :
    (
    <Sider
            className={siderClassName}
            theme={theme}
            width={256}
            trigger={null}
            breakpoint="lg"
            collapsible
            collapsed={false}
            >
            <div className={styles.logo} id="logo">
                <Link to="/">
                    <img src={logo} alt="logo" />
                    <h1>HYUNDAI</h1>
                </Link>
            </div>  
            <MenuComponent roleid={roleid}/>
        </Sider>
    );
}

