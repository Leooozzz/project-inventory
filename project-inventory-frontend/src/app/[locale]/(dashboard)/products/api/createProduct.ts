import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";


type productData = {
  name: string;
  categoryId: string;
  unitPrice: number;
  unitType: string;
  quantity: string;
  maximumQuantity: string;
  minimumQuantity: string;
};

export function createProduct(token: string) {
  return useMutation({
    mutationFn: async (data: productData) => {
      const response = await api.post("/products", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    },
  });
}
