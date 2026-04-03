import { eq, isNull, and } from "drizzle-orm";
import { db } from "../../db/connection";
import { users } from "../../db/schema";
import { formatUser } from "../../utils/helper/helper";

export const listUserService = async (
  offset: number = 0,
  limit: number = 10,
  teamId: string,
) => {
  const usersList = await db
    .select()
    .from(users)
    .where(and(isNull(users.deletedAt), eq(users.teamId, teamId)))
    .offset(offset)
    .limit(limit);
  return usersList.map(formatUser);
};
