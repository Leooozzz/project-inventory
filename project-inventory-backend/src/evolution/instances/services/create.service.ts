import { db } from "../../../db/connection";
import { whatsappInstance } from "../../../db/schema";

type instanceType = {
  instance: {
    instanceName: string;
    instanceId: string;
    integration: string;
    status: "open" | "close" | "connecting";
  };
  hash: string;
};
export async function createInstance(
  instanceName: string,
  phone: string,
  teamId: string,
): Promise<instanceType> {
  const EVOLUTION_API =
    process.env.EVOLUTION_API_URL || "http://evolution-api:8080";

  const response = await fetch(`${EVOLUTION_API}/instance/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.AUTHENTICATION_API_KEY!,
    },
    body: JSON.stringify({
      instanceName,
      integration: "WHATSAPP-BAILEYS",
      phone,
    }),
  });

  const data = (await response.json()) as instanceType;

  await db.insert(whatsappInstance).values({
    id: data.instance.instanceId,
    phone,
    name: instanceName,
    teamId: teamId,
    status: data.instance.status === "open" ? "connected" : "disconnected",
  });
  return data;
}
