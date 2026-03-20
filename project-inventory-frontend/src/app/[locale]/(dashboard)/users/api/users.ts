"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { userData } from "../types/users";

export function listUsers(token: string) {
  return useQuery<userData[]>({
    queryKey: ["list-users"],
    enabled: !!token,
    queryFn: async () => {
      const res = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data;
    },
  });
}
