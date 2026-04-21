"use client";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  categoryName: string;
  productsCount?: number;
};

export default function DeleteCategoryModal({
  isOpen,
  onClose,
  onConfirm,
  categoryName,
  productsCount = 0,
}: Props) {
  if (!isOpen) return null;

  const hasProducts = productsCount > 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-100 shadow-xl space-y-4 dark:bg-[#085E5A]">
        <h2 className="text-xl font-bold dark:text-[#fdd3ad]">Confirm Deletion</h2>

        <p className=" dark:text-[#F5E1D0]">
          Are you sure you want to delete category
          <span className="font-bold dark:text-[#fdd3ad]"> {categoryName}</span>؟
        </p>

        {hasProducts && (
          <p className="text-red-500 text-sm dark:text-red-400">
            product{productsCount > 1 ? "s" : ""} will be affected. Please
            remove or reassign them before deleting this category.
          </p>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <button onClick={onClose} className="cursor-pointer px-4 py-2 rounded-xl border dark:border-[#fdd3ad] dark:text-[#fdd3ad]">
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={hasProducts}
            className={`px-4 py-2 rounded-xl text-white ${
              hasProducts
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
