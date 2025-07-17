/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Image, Popconfirm, Table, Tag, message } from "antd";
import { useEffect, useState, useMemo, useCallback } from "react";
import { deleteProduct, getAllProducts } from "../../../../api/product.api";
import type { ProductInterface } from "../../../../components/interfaces/interfaces";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();

  // Hàm fetch dữ liệu với phân trang
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllProducts({
        page: currentPage,
        limit: pageSize,
      });

      console.log("API Response:", response);

      // Thêm fallback nếu total = 0 nhưng có dữ liệu
      const calculatedTotal =
        response.total > 0
          ? response.total
          : response.data.length > 0
          ? response.data.length
          : 0;

      setProducts(response.data);
      setTotalItems(calculatedTotal);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      message.error("Lỗi khi tải danh sách sản phẩm");
      setProducts([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Xử lý xóa sản phẩm
  const handleDelete = useCallback(
    async (id: string) => {
      setDeletingId(id);
      try {
        await deleteProduct(id);
        message.success("Xóa sản phẩm thành công");
        fetchProducts(); // Reload dữ liệu sau khi xóa
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        message.error("Xóa sản phẩm thất bại");
      } finally {
        setDeletingId(null);
      }
    },
    [fetchProducts]
  );

  // Chuyển hướng chỉnh sửa
  const handleEdit = useCallback(
    (id: string) => {
      navigate(`/edit-product/${id}`);
    },
    [navigate]
  );

  // Tạo image URL với cache buster
  const createImageUrl = useMemo(() => {
    return (url: string) =>
      url
        ? `http://localhost:3000/proxy-image?url=${encodeURIComponent(
            url
          )}&t=${Date.now()}`
        : "";
  }, []);

  // Columns với useMemo để tránh render không cần thiết
  const columns = useMemo(
    () => [
      {
        title: "Ảnh",
        dataIndex: "imageUrls",
        key: "image",
        render: (images: string[]) => (
          <Image
            width={60}
            height={60}
            preview={false}
            placeholder={
              <div style={{ width: 60, height: 60, background: "#f0f0f0" }} />
            }
            src={images?.[0] ? createImageUrl(images[0]) : ""}
            onError={(e) => {
              e.currentTarget.src = "";
              e.currentTarget.alt = "Image load failed";
            }}
          />
        ),
      },
      {
        title: "Tên sản phẩm",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Thương hiệu",
        dataIndex: "brand",
        key: "brand",
      },
      {
        title: "Giới tính",
        dataIndex: "gender",
        key: "gender",
        render: (gender: string) => (
          <Tag color={gender === "nam" ? "blue" : "pink"}>{gender}</Tag>
        ),
      },
      {
        title: "Mô tả",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Giá",
        dataIndex: "price",
        key: "price",
        render: (price: number) => price?.toLocaleString("vi-VN") + "₫",
      },
      {
        title: "Độ lưu hương",
        dataIndex: "longevity",
        key: "longevity",
      },
      {
        title: "Nốt hương",
        dataIndex: "notes",
        key: "notes",
        render: (notes: string[]) =>
          notes?.map((note) => <Tag key={note}>{note}</Tag>),
      },
      {
        title: "Hành động",
        key: "actions",
        render: (_: any, record: ProductInterface) => (
          <>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record._id)}
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
    ],
    [createImageUrl, handleDelete, handleEdit, deletingId]
  );

  return (
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={products}
      loading={loading}
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: totalItems,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "50"],
        onChange: (page, size) => {
          setCurrentPage(page);
          setPageSize(size);
        },
        showTotal: (total) => `Tổng ${total} sản phẩm`,
        position: ["bottomCenter"], // Hiển thị ở giữa
      }}
    />
  );
};

export default ProductTable;
