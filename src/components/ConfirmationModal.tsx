import { FC } from "react";
import { Trash2 } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-900/50" onClick={onCancel} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden text-center pt-7">
        <div className="flex justify-center mb-4">
          <div>
            <Trash2 className="size-12 text-blue-500" />
          </div>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          Are you sure you want
          <br />
          to Delete
        </h3>
        <div className="flex justify-center gap-0.5 pt-4">
          <button
            onClick={onCancel}
            className="w-full py-3 bg-red-500 hover:bg-red-600 text-white  font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-br-lg text-white  font-medium"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
