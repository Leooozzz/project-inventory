import { MovesGraph } from "@/components/dashboard/MovesGraph";
import { NosaleStock } from "@/components/dashboard/NosaleStock";
import { PeriodSelect } from "@/components/dashboard/PeriodSelect";
import { ResumeStock } from "@/components/dashboard/ResumeStock";
import { requiredUserLogged } from "@/cookies/authValidate";
import { formateDateToYYYYMMDD } from "@/lib/formateDate";
import { cookies } from "next/headers";

export default async function DashboardPage(props: {
  searchParams: Promise<{ period?: string }>;
}) {
  await requiredUserLogged();
  const token = (await cookies()).get("auth_token")?.value ?? "";
  const searchParams = await props.searchParams;
  const rawPeriod = searchParams.period ? parseInt(searchParams.period) : 1;
  const period = isNaN(rawPeriod) ? 7 : rawPeriod;

  const today = new Date();
  const endDate = formateDateToYYYYMMDD(today);

  const start = new Date(today);
  start.setDate(today.getDate() - period + 1);
  const startDate = formateDateToYYYYMMDD(start);

  return (
    <main className="p-4">
      <div className="mb-5 flex justify-end">
        <PeriodSelect />
      </div>
      <ResumeStock token={token} startDate={startDate} endDate={endDate} />
      <MovesGraph token={token} startDate={startDate} endDate={endDate} />
      <NosaleStock token={token} startDate={startDate} endDate={endDate} />
    </main>
  );
}
