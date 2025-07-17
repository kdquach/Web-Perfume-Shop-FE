import { Table, Button, message, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { getAllcategories, deleteCategory as deleteCategoryApi } from "../../../../api/category.api";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEditCategory: (category: any) => void;
  refreshTrigger?: number;
}

const CategoriesTable: React.FC<Props> = ({
  onEditCategory,
  refreshTrigger,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await getAllcategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách danh mục:", error);
      message.error("Không thể tải danh sách danh mục");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [refreshTrigger]);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteCategoryApi(id);
      message.success("Xóa danh mục thành công");
      fetchCategories(); // Làm mới danh sách sau khi xóa
    } catch (error) {
      console.error("Lỗi khi xóa danh mục:", error);
      message.error("Xóa danh mục thất bại");
    } finally {
      setDeletingId(null);
    }
  };

  const columns = [
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Hành động",
      key: "action",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: any) => (
        <>
          <Button 
            type="link" 
            onClick={() => onEditCategory(record)}
            icon={<EditOutlined />}
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button 
              type="link" 
              danger
              loading={deletingId === record._id}
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Table
      rowKey={(record) => record._id}
      columns={columns}
      dataSource={categories}
      loading={loading}
      pagination={false}
    />
  );
};

export default CategoriesTable;