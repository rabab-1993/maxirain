// "use client";

// import { createContext } from "react";

// type Category = {
//   id: number;
//   name: string;
//   imageUrl?: string;
//   description: string;
//   slug: string;
//   // products: []
// };

// export const CategoryContext = createContext<Promise<Category[]> | null>(null);

// export default function CategoryProvider({
//   children,
//   categoryPromise,
// }: {
//   children: React.ReactNode;
//   categoryPromise: Promise<Category[]>;
// }) {
//   return <CategoryContext value={categoryPromise}>{children}</CategoryContext>;
// }

"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  slug: string;
};

type CategoriesContextType = {
  categories: Category[];
  refreshCategories: () => void;
};

const CategoriesContext = createContext<CategoriesContextType | null>(null);

export function CategoriesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/categories");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{ categories, refreshCategories: getCategories }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

// Custom hook for consuming the CategoriesContext
export function useCategories() {
  const context = useContext(CategoriesContext);
  if (!context) throw new Error("useCategories must be used inside Provider");
  return context;
}
