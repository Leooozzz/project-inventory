import { and, eq } from "drizzle-orm";
import { db } from "../../db/connection";
import { newUser, users } from "../../db/schema";
import { AppError } from "../../utils/apperror";
import {
  formatUser,
  getUserByEmail,
  getUserById,
  hashPassword,
} from "../../utils/helper/helper";
import { deleteAvatar } from "./file.service";

export const updateUserSevice = async (
  id: string,
  teamId: string,
  data: Partial<newUser>,
) => {
  const userToUpdate = await getUserById(id, teamId);
  if (!userToUpdate) {
    throw new AppError("User not found", 404);
  }
  if (data.email && data.email !== userToUpdate.email) {
    const emailInUse = await getUserByEmail(data.email, true);
    if (emailInUse) throw new AppError("This email is already in use.", 404);
  }
  const updateData: Partial<newUser> = { ...data };
  if (data.password) {
    updateData.password = await hashPassword(data.password);
  }
  if (
    data.avatar &&
    userToUpdate.avatar &&
    data.avatar !== userToUpdate.avatar
  ) {
    await deleteAvatar(userToUpdate.avatar);
  }
  updateData.updatedAt = new Date();
  const result = await db
    .update(users)
    .set(updateData)
    .where(and(eq(users.id, id), eq(users.teamId, teamId)))
    .returning();
  const user = result[0];
  if (!user) return null;
  return await formatUser(user);
};
