"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { movesData } from "../types/moves";

export function listMoves(token: string,offset = 0,limit = 10) {
  return useQuery<movesData[]>({
    queryKey: ["list-moves",offset,limit],
    enabled: !!token,
    queryFn: async () => {
      const res = await api.get("/moves", {
        params:{
          offset,
          limit
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data;
    },
  });
}
