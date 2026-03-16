import ProductForm from "@/app/components/ProductForm";

export default function NewProduct() {
  return (
    <div className="p-10">
      <h1 className="text-2xl mb-6">New Product</h1>

      <ProductForm />
    </div>
  );
}
