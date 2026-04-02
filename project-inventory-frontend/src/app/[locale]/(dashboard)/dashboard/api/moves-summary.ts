"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function movesSummary(
  token: string,
  startDate: string,
  endDate: string
) {
  return useQuery({
    queryKey: ["moves-summary", startDate, endDate],
    enabled: !!token,
    queryFn: async () => {
      const res = await api.get(`/dashboard/moves-summary`, {
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