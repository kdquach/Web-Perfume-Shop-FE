import { Button, Row, Typography, message } from "antd";
import AdminDashboardLayout from "../../../layouts/AdminDashboardLayout";
import CategoriesTable from "./components/CategoriesTable";
import { useState, useCallback } from "react";
import CategoryAddModel from "./components/CategoryAddModel";
import CategoryEditModel from "./components/CategoryEditModel";

const CategoriesManagement: React.FC = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editCategoryData, setEditCategoryData] = useState<any>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Hàm refresh dữ liệu
  const refreshData = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  const closeAddModal = () => setAddModalOpen(false);
  const openAddModal = () => setAddModalOpen(true);

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditCategoryData(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditCategory = (category: any) => {
    setEditCategoryData({
      id: category._id,
      name: category.name,
      description: category.description
    });
    setEditModalOpen(true);
  };

  // Xử lý khi thêm/sửa thành công
  const handleSuccess = (action: 'add' | 'edit') => {
    refreshData();
    message.success(
      action === 'add' 
        ? 'Thêm danh mục thành công!' 
        : 'Cập nhật danh mục thành công!'
    );
  };

  return (
    <AdminDashboardLayout>
      <Typography.Title>Quản Lý Danh Mục</Typography.Title>
      <Row></Row>
      <div className="float-end">
        <Button type="primary" onClick={openAddModal}>
          Thêm Danh Mục
        </Button>
      </div>
      
      <CategoryAddModel
        isOpen={addModalOpen}
        onClose={closeAddModal}
        onSuccess={() => handleSuccess('add')}
      />
      
      <CategoryEditModel
        isOpen={editModalOpen}
        onClose={closeEditModal}
        initialData={editCategoryData}
        onSuccess={() => handleSuccess('edit')}
      />
      
      <CategoriesTable 
        onEditCategory={handleEditCategory}
        refreshTrigger={refreshTrigger}
      />
    </AdminDashboardLayout>
  );
};

export default CategoriesManagement;