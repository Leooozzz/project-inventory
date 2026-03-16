"use server";

import { apiServer } from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requiredUserLogged() {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    redirect("/auth/register");
  }
  try {
    const res = await apiServer.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (error: any) {
    redirect("/auth/register");
  }
}
