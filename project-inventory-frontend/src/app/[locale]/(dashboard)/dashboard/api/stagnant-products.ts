"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../type/product";
import { getDateRange } from "@/helper/getDateRange";

export function stagnantProducts(
  token: string,
  startDate: string,
  endDate: string,
) {
  return useQuery<Product[]>({
    queryKey: ["stagnant-products", startDate, endDate],
    enabled: !!token,
    queryFn: async () => {
      const res = await api.get(`/dashboard/stagnant-products`, {
        params: {
          startDate,
          endDate,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data;
    },
  });
}
