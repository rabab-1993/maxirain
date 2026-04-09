"use client";

import Image from "next/image";

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  isVisible?: boolean;
};

type MultipleProductsGalleryProps = {
  products: Product[];
};

export default function MultipleProductsGallery({
  products,
}: MultipleProductsGalleryProps) {
  return (
    <section className="w-full py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Products Gallery</h2>
          <p className="mt-2 text-sm text-gray-500">
            Browse all isVisible products
          </p>
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center text-gray-500">
            No products found
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                  <span
                    className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium text-white ${
                      product.isVisible ? "bg-green-600" : "bg-red-500"
                    }`}
                  >
                    {product.isVisible ? "isVisible" : "Out of stock"}
                  </span>
                </div>

                <div className="p-4">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <span className="whitespace-nowrap text-sm font-bold text-indigo-600">
                      ${product.price}
                    </span>
                  </div>

                  {product.description && (
                    <p className="line-clamp-3 text-sm text-gray-600">
                      {product.description}
                    </p>
                  )}

                  <button
                    className="mt-4 w-full rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                    type="button"
                  >
                    View Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
