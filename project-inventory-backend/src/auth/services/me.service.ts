import { formatUser, getUserById } from "../../utils/helper/helper";

export const getUserByIdPublic = async (id: string,teamId:string) => {
  const user = await getUserById(id,teamId)
  if(!user) return null
  return formatUser(user)
};