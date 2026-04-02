"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { productsData } from "../types/products";

export function listProducts(
  token: string,
  name: string,
  offset = 0,
  limit = 10,
) {
  return useQuery<productsData[]>({
    queryKey: ["list-products", name, offset, limit],
    enabled: !!token,
    queryFn: async () => {
      const res = await api.get("/products", {
        params: {
          ...(name ? { name } : {}),
          offset,
          limit,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data;
    },
  });
}
