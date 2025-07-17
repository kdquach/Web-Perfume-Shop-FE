import React from "react";
import { Layout } from "antd";

const { Header } = Layout;

interface DashboardHeaderProps {
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ style, children }) => {
  return (
    <Header style={style}>
      {children}
    </Header>
  );
};

export default DashboardHeader;
