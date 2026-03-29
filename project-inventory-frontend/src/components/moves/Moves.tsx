"use client";
import { useTranslations } from "next-intl";
import { Separator } from "../ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { NewMoveModal } from "./NewMoveModal";
import { listMoves } from "@/app/[locale]/(dashboard)/moves/api/listMoves";
import { movesData } from "@/app/[locale]/(dashboard)/moves/types/moves";
import { useState } from "react";
import { Button } from "../ui/button";

export function Moves({ token }: { token: string }) {
  const t = useTranslations("moves");
  const [page, setPage] = useState(0);
  const limit = 10;
  const { data: movesData, isLoading } = listMoves(token, page * limit, limit);

  return (
    <section>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{t("moves_title")}</h1>
        <NewMoveModal token={token} />
      </div>
      <div className="mt-5 mb-5">
        <Separator />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("moves_table_created")}</TableHead>
              <TableHead>{t("moves_table_type")}</TableHead>
              <TableHead>{t("moves_table_product_name")}</TableHead>
              <TableHead>{t("moves_table_quantity")}</TableHead>
              <TableHead>{t("moves_table_unit_value")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movesData?.map((moves: movesData) => (
              <TableRow key={moves.id}>
                <TableCell>
                  {new Date(moves.createdAt).toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell>{t(`type.${moves.type}`)}</TableCell>
                <TableCell>{moves.productName}</TableCell>
                <TableCell>{moves.quantity}</TableCell>
                <TableCell>
                  {" "}
                  R${" "}
                  {isLoading
                    ? "..."
                    : Number(moves.unitPrice ?? 0).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex mt-10 justify-end">
          <Button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="rounded-none"
          >
            {t("previous_button")}
          </Button>

          <Button
            onClick={() => setPage((p) => p + 1)}
            className="rounded-none"
          >
            {t("next_button")}
          </Button>
        </div>
      </div>
    </section>
  );
}
