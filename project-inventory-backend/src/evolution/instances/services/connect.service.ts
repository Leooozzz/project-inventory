import { and, eq } from "drizzle-orm";
import { db } from "../../../db/connection";
import { whatsappInstance } from "../../../db/schema";
import { AppError } from "../../../utils/apperror";

type instanceType = {
  instance: {
    instanceName: string;
    instanceId: string;
    integration: string;
    status: "open" | "close" | "connecting";
  };
  hash: string;
};
export const connectInstance = async (
  instanceName: string,
  teamId: string,
): Promise<instanceType> => {
  const instance = await db
    .select()
    .from(whatsappInstance)
    .where(
      and(
        eq(whatsappInstance.name, instanceName),
        eq(whatsappInstance.teamId, teamId),
      ),
    )
    .limit(1);
  if (!instance.length) {
    throw new AppError("instance not found", 404);
  }
  const EVOLUTION_API =
    process.env.EVOLUTION_API_URL || "http://evolution-api:8080";

  const response = await fetch(
    `${EVOLUTION_API}/instance/connect/${instanceName}`,
    {
      method: "GET",
      headers: {
        apikey: process.env.AUTHENTICATION_API_KEY!,
      },
    },
  );
  if (!response.ok) {
    const error = await response.json().catch(() => null);

    console.log("Evolution API error:", error);

    throw new AppError("Failed to connect instance", response.status);
  }
  const data = (await response.json()) as instanceType;
  await db
    .update(whatsappInstance)
    .set({
      status: data.instance.status === "open" ? "connected" : "disconnected",
    })
    .where(
      and(
        eq(whatsappInstance.name, instanceName),
        eq(whatsappInstance.teamId, teamId),
      ),
    );
  return data;
};
