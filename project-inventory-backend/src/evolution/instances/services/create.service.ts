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

  return data;
}
