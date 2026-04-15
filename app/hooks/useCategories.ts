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