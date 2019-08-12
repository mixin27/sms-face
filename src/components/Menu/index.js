import React from "react";
import { Menu } from "antd";

import {
  MenuList,
  getDefaultSelectedKeys,
  getDefaultOpenKeys
} from "./menulist";

import { ServicemanMenuList } from "./service-man-menulist";

export default ({ onselect, roleid }) => {
  console.log(roleid);

  const list = MenuList;
  const serviceMenuList = ServicemanMenuList;

  const render = () => {
    if (roleid === "super-admin") {
      return (
        <Menu
          onSelect={onselect}
          theme="light"
          mode="inline"
          selectedKeys={getDefaultSelectedKeys()}
          defaultOpenKeys={getDefaultOpenKeys()}
        >
          {list}
        </Menu>
      );
    } else if (roleid === "service-man") {
      return (
        <Menu
          onSelect={onselect}
          theme="light"
          mode="inline"
          selectedKeys={getDefaultSelectedKeys()}
          defaultOpenKeys={getDefaultOpenKeys()}
        >
          {serviceMenuList}
        </Menu>
      );
    } else {
      return (
        <Menu
          onSelect={onselect}
          theme="light"
          mode="inline"
          selectedKeys={getDefaultSelectedKeys()}
          defaultOpenKeys={getDefaultOpenKeys()}
        />
      );
    }
  };

  return { render };
};
