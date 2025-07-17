import React from "react";
import { Typography } from "antd";
import AdminDashboardLayout from "../../../layouts/AdminDashboardLayout";
import ProductTable from "./components/ProductsTable";

const ProductsManagement: React.FC = () => {
  return (
    <AdminDashboardLayout>
      <Typography.Title>Quản lý nước hoa</Typography.Title>
      <ProductTable />
    </AdminDashboardLayout>
  );
};
export default ProductsManagement;
