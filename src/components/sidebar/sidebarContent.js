import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Icon from "@ant-design/icons";
import { BiDownload } from "react-icons/bi";
import { MdVideoLibrary, MdDashboard } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";

const SidebarContent = ({ collapsed }) => {
  const location = useLocation();

  return (
    <Menu
      mode="inline"
      theme="dark"
      inlineCollapsed={collapsed}
      selectedKeys={location.pathname}
    >
      <Menu.Item key="/dashboard" icon={<Icon component={MdDashboard} />}>
        <Link to="/dashboard" style={{ color: "#fff" }}>
          Dashboard
        </Link>
      </Menu.Item>
      <Menu.Item key="/dashboard/projects/all" icon={<Icon component={BiDownload} />}>
        <Link to="/dashboard/projects/all" style={{ color: "#fff" }}>
          All Projects
        </Link>
      </Menu.Item>
      <Menu.Item
        key="/dashboard/projects/archived"
        icon={<Icon component={RiUserSettingsLine} />}
      >
        <Link to="/dashboard/projects/archived" style={{ color: "#fff" }}>
          Archived Projects
        </Link>
      </Menu.Item>
      <Menu.Item
        key="/dashboard/projects/completed"
        icon={<Icon component={MdVideoLibrary} />}
      >
        <Link to="/dashboard/projects/completed" style={{ color: "#fff" }}>
          Completed Projects
        </Link>
      </Menu.Item>
    </Menu>
  );
};
export default SidebarContent;
