import { eq, and } from "drizzle-orm";
import { db } from "../../db/connection";
import { otp, users } from "../../db/schema";
import { getUserByEmail } from "../../utils/helper/helper";
import { createJsonWebToken } from "../../libs/jwt";

export const generateOTP = async (userId: string) => {
  let otpArray: number[] = [];
  for (let q = 0; q < 6; q++) {
    otpArray.push(Math.floor(Math.random() * 9));
  }
  let code = otpArray.join("");
  let expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10);

  await db
    .insert(otp)
    .values({
      userId,
      code,
      expiresAt,
      used: false,
    })
    .returning();
  return code;
};
