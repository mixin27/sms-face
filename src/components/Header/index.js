import React from "react";
import { Icon } from "antd";

import RightContent from "./RightContent";
import styles from "./index.module.less";
//import logo from '../../image/LogoSideBar.png'
import { Link } from "react-router-dom";

export default React.memo(props => {
  const { isMobile, collapsed, toggle } = props;

  const getHeadWidth = () => {
    const { collapsed } = props;
    return collapsed ? "calc(100% - 80px)" : "calc(100% - 256px)";
  };
  const getHeadWidthMobile = () => {
    return "calc(100% - 0px)";
  };

  const width = getHeadWidth();
  const widthmobile = getHeadWidthMobile();
  return (
    <div
      style={isMobile ? { widthmobile } : { width }}
      className={styles.header}
    >
      {isMobile && (
        <Link to="/" className={styles.logo} key="logo">
          {/* <img src={logo} alt="logo" width="32" /> */}
        </Link>
      )}
      {/* <span className={styles.trigger} onClick={toggle}>
                    <Icon style={{ color : '#1890ff'}} type={collapsed ? 'menu-unfold' : 'menu-fold'} />
                </span> */}
      <RightContent />
    </div>
  );
});
