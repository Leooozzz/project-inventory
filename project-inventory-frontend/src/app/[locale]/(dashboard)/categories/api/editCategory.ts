import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type EditCategoryParams = {
  id: string;
  data: {
    name: string;
  };
};

export function editCategory(token: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: EditCategoryParams) => {
      const res = await api.put(`/categories/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}