"use client";

import { ArrowDown, ArrowUp, Coins } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { useTranslations } from "next-intl";
import { useInventoryValue } from "@/app/[locale]/(dashboard)/dashboard/api/inventory-value";
import { movesSummary } from "@/app/[locale]/(dashboard)/dashboard/api/moves-summary";

export function ResumeStock({
  token,
  startDate,
  endDate,
}: {
  token: string;
  startDate: string;
  endDate: string;
}) {
  const t = useTranslations("dashboard");
  const { data: inventoryData, isLoading: inventoryLoading } =
    useInventoryValue(token);

  const { data: movesData, isLoading: movesLoading } = movesSummary(
    token,
    startDate,
    endDate,
  );

  const loading = inventoryLoading || movesLoading;

  return (
    <section className="grid md:grid-cols-3 grid-cols-1 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            {t("card_1_title")}
          </CardTitle>
          <CardAction>
            <Coins size={20} className="text-gray-400" />
          </CardAction>
        </CardHeader>

        <CardContent>
          <p className="text-xl">
            R$
            {loading
              ? "..."
              : Number(inventoryData?.totalValue ?? 0).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
          </p>
        </CardContent>

        <CardFooter className="bg-white h-10">
          <p className="text-sm">{t("card_1_subtitle")}</p>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            {t("card_2_title")}
          </CardTitle>
          <CardAction>
            <ArrowDown size={20} className="text-gray-400" />
          </CardAction>
        </CardHeader>

        <CardContent>
          <p className="text-xl">
            R$
            {loading
              ? "..."
              : Number(movesData?.in?.value ?? 0).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
          </p>
        </CardContent>

        <CardFooter className="bg-white h-10">
          <p className="text-sm">
            {loading ? "..." : (movesData?.in?.count ?? 0)}{" "}
            {t("card_2_subtitle")}
          </p>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            {t("card_3_title")}
          </CardTitle>
          <CardAction>
            <ArrowUp size={20} className="text-gray-400" />
          </CardAction>
        </CardHeader>

        <CardContent>
          <p className="text-xl">
            R$
            {loading
              ? "..."
              : Number(movesData?.out?.value ?? 0).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
          </p>
        </CardContent>

        <CardFooter className="bg-white h-10">
          <p className="text-sm">
            {loading ? "..." : (movesData?.out?.count ?? 0)}{" "}
            {t("card_3_subtitle")}
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}