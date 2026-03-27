import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

type movesData = {
  productId: string;
  quantity: number;
  type: string;
};

export function createMoves(token: string) {
  return useMutation({
    mutationFn: async (data: movesData) => {
      const response = await api.post("/moves", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    },
  });
}
