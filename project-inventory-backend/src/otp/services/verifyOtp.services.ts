import { and, eq } from "drizzle-orm";
import { db } from "../../db/connection";
import { otp, users } from "../../db/schema";
import { createJsonWebToken } from "../../libs/jwt";
import { getUserByEmail } from "../../utils/helper/helper";

export const verifyOtpService = async (email: string, code: string) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  const result = await db
    .select()
    .from(otp)
    .where(and(eq(otp.userId, user.id), eq(otp.code, code)))
    .limit(1);

  const otpUser = result[0];

  if (!otpUser) {
    throw new Error("Invalid OTP");
  }

  if (otpUser.used) {
    throw new Error("OTP already used");
  }

  if (new Date() > otpUser.expiresAt) {
    throw new Error("Expired OTP");
  }

  await db.update(otp).set({ used: true }).where(eq(otp.id, otpUser.id));

  const jwt = createJsonWebToken(user.id);

  await db.update(users).set({ token: jwt }).where(eq(users.id, user.id));

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
    token: jwt,
  };
};
