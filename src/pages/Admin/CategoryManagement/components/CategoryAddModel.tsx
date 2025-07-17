import { message } from "antd";
import { addNewCategory } from "../../../../api/category.api";
import { useState } from "react";
import CategoryFormModal from "./CategoryFormModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    id: string;
    name: string;
    description?: string;
  };
  onSuccess?: () => void;
}

const CategoryAddModel: React.FC<Props> = ({ isOpen, onClose, onSuccess  }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCategory = async (values: { name: string; description: string }) => {
    try {
      setIsLoading(true);
      await addNewCategory(values);
      if (onSuccess) onSuccess();
      onClose(); // đóng modal
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      message.error("Có lỗi khi thêm danh mục");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CategoryFormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddCategory}
      isLoading={isLoading}
    />
  );
};

export default CategoryAddModel;
