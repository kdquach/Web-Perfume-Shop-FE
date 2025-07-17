// components/category/CategoryFormModal.tsx
import { Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";

interface CategoryFormValues {
  name: string;
  description: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: CategoryFormValues) => Promise<void>;
  isLoading?: boolean;
  initialValues?: CategoryFormValues; // khi chỉnh sửa
}

const CategoryFormModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  initialValues,
}) => {
  const [form] = Form.useForm<CategoryFormValues>();

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue(initialValues || { name: "", description: "" });
    }
  }, [isOpen, initialValues, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
      form.resetFields();
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Do nothing – AntD tự hiện lỗi validate
    }
  };

  return (
    <Modal
      title={initialValues ? "Chỉnh Sửa Danh Mục" : "Thêm Danh Mục"}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      okButtonProps={{ loading: isLoading }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tên Danh Mục:"
          name="name"
          rules={[{ required: true, message: "Tên danh mục không được để trống" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mô Tả"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryFormModal;
