"use client";

import { getDateRange } from "@/helper/getDateRange";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


export function useInventoryValue(token: string) {
   
  return useQuery({
    queryKey: ["inventory-value"],
    enabled: !!token,
    queryFn: async () => {
      const res = await api.get(
        `/dashboard/inventory-value`,
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