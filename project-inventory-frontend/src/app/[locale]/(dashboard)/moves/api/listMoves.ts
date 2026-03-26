"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { movesData } from "../types/moves";

export function listMoves(token: string) {
  return useQuery<movesData[]>({
    queryKey: ["list-moves"],
    enabled: !!token,
    queryFn: async () => {
      const res = await api.get("/moves", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data;
    },
  });
}
