
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

type categoryData = {
  name:string
};

export function createCategory(token:string) {
  return useMutation({
    mutationFn: async (data: categoryData) => {
      const response = await api.post("/categories",data,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    },
  });
}