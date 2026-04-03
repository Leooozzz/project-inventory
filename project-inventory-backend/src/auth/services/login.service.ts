import { formatUser, getUserByEmail, verifyPassword } from "../../utils/helper/helper";


export const loginService = async (email: string, password: string) => {
  email = email.toLowerCase();
  const user = await getUserByEmail(email);
  if (!user) return null;
  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) return null;
  return user;
};
