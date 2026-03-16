"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../type/product";



export function lowStock(token: string) {
  return useQuery<Product[]>({
    queryKey: ["low-stock"],
    enabled: !!token,
    queryFn: async () => {
      const res = await api.get(`/dashboard/low-stock`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data;
    },
  });
}