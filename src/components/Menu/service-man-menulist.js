import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";
import { FormattedMessage } from "react-intl";

import history from "../../router/history";
import { menu } from "./service-man-menus.json";

// Menu Icon
import defaultIcon from "../../assets/img/menu/configuration.svg";
import dashboard from "../../assets/img/menu/icon_dashboard.svg";
import profileIcon from "../../assets/img/menu/profile.svg";
import jobIcon from "../../assets/img/menu/job.svg";
import dailyReportIcon from "../../assets/img/menu/complain.svg";
import termsAndConditions from "../../assets/img/menu/accept.svg";

const { SubMenu } = Menu;

const ServicemanMenuList = menu.map((menuItem, i) => {
  let icon = defaultIcon;
  // Filter Icon
  if (menuItem.icon === "dashboard") {
    icon = dashboard;
  } else if (menuItem.icon === "profile") {
    icon = profileIcon;
  } else if (menuItem.icon === "job") {
    icon = jobIcon;
  } else if (menuItem.icon === "daily-report") {
    icon = dailyReportIcon;
  } else if (menuItem.icon === "terms-and-conditions") {
    icon = termsAndConditions;
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
            <span>
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
              <img
                style={{ filter: "opacity(50%)" }}
                src={icon}
                width={25}
                height={25}
              />
              <FormattedMessage id={p.name} defaultMessage={p.name} />
            </Link>
          </Menu.Item>
        ))}
      </SubMenu>
    );
  }
});

export { ServicemanMenuList };

// export function getDefaultSelectedKeys() {
//   let key = [];
//   key.push(history.location.pathname);
//   return key;
// }

// export function getDefaultOpenKeys() {
//   var openKeys = menu
//     .filter(x => x.children !== undefined)
//     .map(x =>
//       x.children.filter(y => y.path === history.location.pathname).length > 0
//         ? x.key
//         : null
//     )
//     .filter(el => {
//       return el != null;
//     });
//   return openKeys;
// }
