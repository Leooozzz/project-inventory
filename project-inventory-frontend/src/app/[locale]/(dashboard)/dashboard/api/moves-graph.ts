"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useMovesGraph(
  token: string,
  startDate: string,
  endDate: string,
) {
  return useQuery({
    queryKey: ["moves-graph", startDate, endDate],
    enabled: !!token,
    queryFn: async () => {
      const res = await api.get(`/dashboard/moves-graph`, {
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
