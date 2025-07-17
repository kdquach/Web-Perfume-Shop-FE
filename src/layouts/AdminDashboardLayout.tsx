import React from 'react';
import { Layout, theme } from 'antd';
import DashboardSider from '../components/AdminDashboardCompoents/DashboardSider/DashboardSider';
import DashboardHeader from "../components/AdminDashboardCompoents/DashboardHeader/DashboardHeader";

const { Content, Footer } = Layout;

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <DashboardSider />
      <Layout>
        <DashboardHeader style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminDashboardLayout;
