"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../type/product";


export function stagnantProducts(token: string) {
  return useQuery<Product[]>({
    queryKey: ["stagnant-products"],
    enabled: !!token,
    queryFn: async () => {
      const res = await api.get(
        `/dashboard/stagnant-products`,
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