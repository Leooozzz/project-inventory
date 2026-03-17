"use client";

import { getDateRange } from "@/helper/getDateRange";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function movesSummary(token: string,period:number) {
  const { startDate, endDate } = getDateRange(period)
  return useQuery({
    queryKey: ["moves-summary",period],
    enabled: !!token,
    queryFn: async () => {
      const res = await api.get(`/dashboard/moves-summary?period=${period}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data;
    },
  });
}