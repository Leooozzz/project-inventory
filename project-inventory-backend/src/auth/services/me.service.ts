import { formatUser, getUserById } from "../../utils/helper/helper";

export const getUserByIdPublic = async (id: string) => {
  const user = await getUserById(id)
  if(!user) return null
  return formatUser(user)
};