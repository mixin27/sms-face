import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";
import { FormattedMessage } from "react-intl";

import history from "../../router/history";
import { menu } from "./menus.json";

// Menu Icon
import defaultIcon from "../../assets/img/menu/configuration.svg";
import dashboard from "../../assets/img/menu/icon_dashboard.svg";
import machine from "../../assets/img/menu/machine.svg";
import complain from "../../assets/img/menu/complain.svg";
import schedule from "../../assets/img/menu/schedule.svg";
import assignToSchedule from "../../assets/img/menu/assign-schedule.svg";
import userManagement from "../../assets/img/menu/user-male.svg";

const { SubMenu } = Menu;

const MenuList = menu.map((menuItem, i) => {
  let icon = null;
  // Filter Icon
  if (menuItem.icon === "dashboard") {
    icon = dashboard;
  } else if (menuItem.icon === "configuration") {
    icon = defaultIcon;
  } else if (menuItem.icon === "") {
    icon = null;
  } else if (menuItem.icon === "") {
    icon = null;
  } else if (menuItem.icon === "") {
    icon = null;
  } else if (menuItem.icon === "") {
    icon = null;
  } else if (menuItem.icon === "machine") {
    icon = machine;
  } else if (menuItem.icon === "complain") {
    icon = complain;
  } else if (menuItem.icon === "assignToSchedule") {
    icon = assignToSchedule;
  } else if (menuItem.icon === "schedule") {
    icon = schedule;
  } else if (menuItem.icon === "usermanagement") {
    icon = userManagement;
  }

  if (menuItem.children === undefined || menuItem.children.length === 0) {
    return (
      <Menu.Item key={menuItem.path.toString()}>
        <Link to={menuItem.path}>
          {/* <Icon type={menuItem.icon} /> */}
          <img
            style={{ filter: "opacity(50%)" }}
            src={icon}
            width={25}
            height={25}
          />
          <span style={{ marginLeft: "10px" }}>
            <FormattedMessage
              id={menuItem.name}
              defaultMessage={menuItem.name}
            />
          </span>
        </Link>
      </Menu.Item>
    );
  } else {
    return (
      <SubMenu
        key={menuItem.key.toString()}
        title={
          <span>
            {/* <Icon type={menuItem.icon} /> */}
            <img
              style={{ filter: "opacity(50%)" }}
              src={icon}
              width={25}
              height={25}
            />
            <span style={{ marginLeft: "10px" }}>
              <FormattedMessage
                id={menuItem.name}
                defaultMessage={menuItem.name}
              />
            </span>
          </span>
        }
      >
        {menuItem.children.map(p => (
          <Menu.Item key={p.path.toString()}>
            <Link to={p.path}>
              {/* <Icon type={p.icon} /> */}
              {/* {icon === null ? "" : <img src={icon} width={25} height={25} />} */}
              <FormattedMessage id={p.name} defaultMessage={p.name} />
            </Link>
          </Menu.Item>
        ))}
      </SubMenu>
    );
  }
});

export { MenuList };

export function getDefaultSelectedKeys() {
  let key = [];
  key.push(history.location.pathname);
  return key;
}

export function getDefaultOpenKeys() {
  var openKeys = menu
    .filter(x => x.children !== undefined)
    .map(x =>
      x.children.filter(y => y.path === history.location.pathname).length > 0
        ? x.key
        : null
    )
    .filter(el => {
      return el != null;
    });
  return openKeys;
}
