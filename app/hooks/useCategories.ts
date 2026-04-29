"use client";

import useSWR from "swr";
import type { Category } from "@/app/types/category";

const fetcher = async (url: string): Promise<Category[]> => {
  const res = await fetch(url, {
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to fetch categories");
  }

  return data;
};
const fetchCategory = async (url: string): Promise<Category> => {

  const res = await fetch(url, {
    cache: "no-store",
  });

  const oneCategory = await res.json();

  if (!res.ok) {
    throw new Error(oneCategory?.error || "Failed to fetch category");
  }

  return oneCategory;
};

export function useCategories() {
  const { data, error, isLoading, mutate } = useSWR<Category[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    fetcher,
  );


  return {
    categories: data ?? [],
    error: error instanceof Error ? error.message : null,
    loading: isLoading,
    mutateCategories: mutate,
  };
}


export function useCategory(id: string) {
  const { data, error, isLoading, mutate } = useSWR<Category>(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`,
    fetchCategory,
  );
  return {
    category: data ?? null,
    error: error instanceof Error ? error.message : null,
    loading: isLoading,
    mutateCategory: mutate,
  };
}
