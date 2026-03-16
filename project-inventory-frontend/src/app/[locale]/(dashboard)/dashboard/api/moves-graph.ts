"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


export function useMovesGraph(token: string,period:number) {
  return useQuery({
    queryKey: ["moves-graph",period],
    enabled: !!token,
    queryFn: async () => {
      const res = await api.get(
        `/dashboard/moves-graph?period=${period}`,
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