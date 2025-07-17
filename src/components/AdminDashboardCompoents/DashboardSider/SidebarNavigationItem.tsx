import {
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  BookOutlined,
  ProductOutlined,
  BarsOutlined
} from '@ant-design/icons';
import React from 'react';

export interface SidebarNavigationItem {
  title: string;
  key: string;
  url?: string;
  children?: SidebarNavigationItem[];
  icon?: React.ReactNode;
}

export const sidebarNavigation: SidebarNavigationItem[] = [
  {
    title: 'Dashboard',
    key: 'dashboard',
    icon: <PieChartOutlined />,
    url: '/admin',
  },
  {
    title: 'Management',
    key: 'management',
    icon: <BookOutlined />,
    children: [
      {
        title: 'Categories',
        key: 'categories-management',
        icon: <BarsOutlined />,
        url: '/admin/categories-management',
      },
      {
        title: 'Products',
        key: 'products-management',
        icon: <ProductOutlined />,
        url: '/admin/products-management',
      },
    ],
  },
  {
    title: 'Users',
    key: 'users',
    icon: <UserOutlined />,
    children: [
      {
        title: 'Tom',
        key: 'tom',
        url: '/admin/users/tom',
      },
      {
        title: 'Bill',
        key: 'bill',
        url: '/admin/users/bill',
      },
      {
        title: 'Alex',
        key: 'alex',
        url: '/admin/users/alex',
      },
    ],
  },
  {
    title: 'Teams',
    key: 'teams',
    icon: <TeamOutlined />,
    children: [
      {
        title: 'Team 1',
        key: 'team-1',
        url: '/admin/teams/1',
      },
      {
        title: 'Team 2',
        key: 'team-2',
        url: '/admin/teams/2',
      },
    ],
  },
  {
    title: 'Files',
    key: 'files',
    icon: <FileOutlined />,
    url: '/admin/files',
  },
];