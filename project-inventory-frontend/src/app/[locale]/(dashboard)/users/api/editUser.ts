import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type EditCategoryParams = {
  id: string;
  data: {
    name: string,
    email:string,
    avatar:string,
    password:string
  };
};

export function editUser(token:string){
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: EditCategoryParams) => {
      const res = await api.put(`/user/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-edit"] });
    },
  });
}