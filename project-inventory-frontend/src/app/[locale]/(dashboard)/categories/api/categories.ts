"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { CategoryData } from "../types/categories";

export function useCategories(token: string) {
  return useQuery<CategoryData[]>({
    queryKey: ["categories", { includeProductCount: true }],
    enabled: !!token,
    queryFn: async () => {
      const res = await api.get("/categories", {
        params: {
          includeProductCount: true,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data;
    },
  });
}