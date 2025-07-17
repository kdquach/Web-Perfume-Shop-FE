import { message } from "antd";
import { editCategory } from "../../../../api/category.api";
import { useState } from "react";
import CategoryFormModal from "./CategoryFormModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    id?: string;
    name: string;
    description?: string;
  };
  onSuccess?: () => void;
}

const CategoryEditModel: React.FC<Props> = ({
  isOpen,
  onClose,
  onSuccess,
  initialData,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleEditCategory = async (values: {
    name: string;
    description: string;
  }) => {
    try {
      setIsLoading(true);
      if (!initialData?.id) {
        message.error("Không tìm thấy ID danh mục để cập nhật!");
        return;
      }

      const payload = {
        id: initialData.id,
        name: values.name,
        description: values.description,
      };

      await editCategory(payload);
      if (onSuccess) onSuccess();
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      message.error("Có lỗi khi cập nhật danh mục");
    } finally {
      setIsLoading(false);
    }
  };

  // Chỉ truyền name và description vào initialValues cho form
  const initialValues = initialData
    ? { name: initialData.name, description: initialData.description ?? "" }
    : undefined;

  return (
    <CategoryFormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleEditCategory}
      isLoading={isLoading}
      initialValues={initialValues}
    />
  );
};

export default CategoryEditModel;
