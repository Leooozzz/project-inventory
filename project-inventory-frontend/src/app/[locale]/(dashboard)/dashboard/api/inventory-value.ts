"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


export function useInventoryValue(token: string,period:number) {
  return useQuery({
    queryKey: ["inventory-value",period],
    enabled: !!token,
    queryFn: async () => {
      const res = await api.get(
        `/dashboard/inventory-value?period=${period}`,
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