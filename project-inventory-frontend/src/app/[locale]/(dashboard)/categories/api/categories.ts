"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { CategoryData } from "../types/categories";


export function categories(token: string) {
  return useQuery<CategoryData[]>({
    queryKey: ["categories"],
    enabled: !!token,
    queryFn: async () => {
      const res = await api.get(
        `/dashboard/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.data;
    },
  });
}