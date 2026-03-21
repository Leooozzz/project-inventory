"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { productsData } from "../types/products";


export function listProducts(token: string) {
  return useQuery<productsData[]>({
    queryKey: ["list-products"],
    enabled: !!token,
    queryFn: async () => {
      const res = await api.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data;
    },
  });
}
