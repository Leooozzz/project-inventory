import { useMutation } from "@tanstack/react-query";
import { createUser, userData } from "../types/users";
import { api } from "@/lib/api";

export function createUsers(token:string){
    return useMutation({
    mutationFn: async (data: createUser) => {
      const response = await api.post("/users",data,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    },
  });
}