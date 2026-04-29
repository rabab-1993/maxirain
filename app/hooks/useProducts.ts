"use client";

import useSWR from "swr";
import type { Product } from "@/app/types/product";

const fetcher = async (url: string): Promise<Product[]> => {
  const res = await fetch(url, {
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to fetch products");
  }

  return data;
};

export function useProducts() {
  const { data, error, isLoading, mutate } = useSWR<Product[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/products`,
    fetcher,
  );

  return {
    products: data ?? [],
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    mutateProducts: mutate,
  };
}