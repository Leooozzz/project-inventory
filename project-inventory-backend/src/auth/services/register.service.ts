import { db } from "../../db/connection";
import { users } from "../../db/schema";
import { teams } from "../../db/schema/teams";
import { formatUser, getUserByEmail, hashPassword } from "../../utils/helper/helper";
import { z } from "zod";
import { registerSchema } from "../schema/register.schema";

type RegisterInput = z.infer<typeof registerSchema>;

export const register = async (data: RegisterInput) => {
  const existingUser = await getUserByEmail(data.email);

  if (existingUser) {
    throw new Error("This email is already in use.");
  }

  const hashedPassword = await hashPassword(data.password);

  const result = await db.transaction(async (tx) => {

    const teamResult = await tx.insert(teams).values({
      name: data.email.toLowerCase(),
    }).returning();

    const team = teamResult[0];

    const userResult = await tx.insert(users).values({
      name: data.name,
      email: data.email.toLowerCase(),
      password: hashedPassword,
      role: "super admin",
      teamId: team.id,
    }).returning();

    return userResult[0];
  });

  return formatUser(result);
};