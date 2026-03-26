import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type EditCategoryParams = {
  id: string;
  data: {
    name?: string;
  categoryId?: string;
  unitPrice?: number;
  unitType?: string;
  quantity?: string;
  maximumQuantity?: string;
  minimumQuantity?: string;
  };
};

export function editProduct(token: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: EditCategoryParams) => {
      const res = await api.put(`/products/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}