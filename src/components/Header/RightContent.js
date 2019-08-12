import React from "react";
import { connect } from "react-redux";
import { Menu, Avatar, Icon, Spin, Divider } from "antd";
import { FormattedMessage } from "umi-plugin-locale";
import HeaderDropdown from "../HeaderDropdown";
import SelectLang from "../SelectLang";
import styles from "./index.module.less";
import { signOut } from "actions/Auth";
import noti from "../../assets/img/noti.svg";
import history from "../../router/history";

import avatar from "../../assets/img/man.svg"

const RightContent = ({ username, signOut }) => {

  console.log(username);

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      signOut();
      history.push("/");
    } else if (key === "setting") {
    } else if (key === "activity-log") {
    }
  };
  const menu = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={handleMenuClick}>
      {/* <Menu.Item key="setting">
        <Icon type="user" />
        <FormattedMessage
          id="menu.account.setting"
          defaultMessage="Account Setting"
        />
      </Menu.Item>
      <Menu.Item key="activity-log">
        <Icon type="rise" />
        <FormattedMessage
          id="menu.account.activityLog"
          defaultMessage="Activity Log"
        />
      </Menu.Item> */}
      <Menu.Item key="logout">
        <Icon type="logout" />
        <FormattedMessage id="menu.account.logout" defaultMessage="Sign Out" />
      </Menu.Item>
    </Menu>
  );

  const handleNotiMenuClick = ({ key }) => {

  };
  const menuNoti = (
    <Menu
      className={styles.menu}
      selectedKeys={[]}
      onClick={handleNotiMenuClick}
    >
      {/* <Menu.Item key="">
        <Icon type="user" />
        <FormattedMessage
          id="menu.noti.setting"
          defaultMessage="Account Setting"
        />
      </Menu.Item>
      <Menu.Item key="">
        <Icon type="user" />
        <FormattedMessage
          id="menu.noti.setting"
          defaultMessage="Account Setting"
        />
      </Menu.Item> */}
      <Menu.Item key="">
        <Icon type="notification" theme="filled" />
        <FormattedMessage
          id="menu.noti.setting"
          defaultMessage="New message from John"
        />
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={styles.right}>
      <HeaderDropdown overlay={menuNoti}>
        <span className={`${styles.action} ${styles.account}`}>
          <img src={noti} className={styles.noti} />
        </span>
      </HeaderDropdown>

      <Divider type="vertical" style={{marginLeft: '5px', marginRight: '5px'}}/>

      {username ? (
        <HeaderDropdown overlay={menu}>
          <span className={`${styles.action} ${styles.account}`}>
            <Avatar
              size="small"
              className={styles.avatar}
              // src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                src={avatar}
              alt="avatar"
            />
            <span className={styles.name}>{username}</span>
          </span>
        </HeaderDropdown>
      ) : (
        <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
      )}
      {/* <SelectLang className={styles.action} /> */}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    username: state.auth.username
  };
}

export default connect(
  mapStateToProps,
  { signOut }
)(RightContent);
