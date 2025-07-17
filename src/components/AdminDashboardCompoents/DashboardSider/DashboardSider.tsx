import React, { useState } from "react";
import { Menu, Layout } from "antd";
import {
  sidebarNavigation,
  type SidebarNavigationItem,
} from "./SidebarNavigationItem";

const { Sider } = Layout;

// Hàm chuyển SidebarNavigationItem sang MenuProps['items']
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";

const mapSidebarToMenuItems = (
  navItems: SidebarNavigationItem[]
): MenuProps["items"] =>
  navItems.map((item) => ({
    key: item.key,
    icon: item.icon,
    label: item.url ? <Link to={item.url}>{item.title}</Link> : item.title,
    children: item.children ? mapSidebarToMenuItems(item.children) : undefined,
  }));

const DashboardSider: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={250}
      collapsedWidth={80}
    >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
        >
          <img
            src="/public/kd-logo-white.png"
            alt="Logo"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={mapSidebarToMenuItems(sidebarNavigation)}
        />  
    </Sider>
  );
};

export default DashboardSider;
