"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../type/product";
import { getDateRange } from "@/helper/getDateRange";


export function stagnantProducts(token: string,period:number) {
  const { startDate, endDate } = getDateRange(period)
  return useQuery<Product[]>({
    queryKey: ["stagnant-products",period],
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