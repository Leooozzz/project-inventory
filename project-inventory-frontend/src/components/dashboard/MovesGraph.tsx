"use client";

import { useMovesGraph } from "@/app/[locale]/(dashboard)/dashboard/api/moves-graph";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function MovesGraph({
  token,
  startDate,
  endDate,
}: {
  token: string;
  startDate: string;
  endDate: string;
}) {
  const { data, isLoading } = useMovesGraph(token, startDate, endDate);

  if (isLoading) {
    return (
      <div className="w-full h-65 bg-white p-6 border border-zinc-200 flex items-center justify-center">
        <span className="text-zinc-400 text-sm">Carregando...</span>
      </div>
    );
  }

  const formattedData =
    data?.map((item: any) => ({
      date: new Date(item.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      }),
      totalValue: Number(item.totalValue),
    })) ?? [];

  return (
    <div className="w-full bg-white mt-10 mb-10 p-6 border border-zinc-200">
      <div className="mb-4">
        <h2 className="text-zinc-800 font-semibold">Saídas Diárias</h2>
        <p className="text-sm text-zinc-400">Volume de saídas</p>
      </div>

      <div className="w-full h-65">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formattedData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="totalValue" fill="#18181b" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
