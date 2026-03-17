"use client";

import { BadgePlus, Edit, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
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

import { useCategories } from "@/app/[locale]/(dashboard)/categories/api/categories";
import { CategoryData } from "@/app/[locale]/(dashboard)/categories/types/categories";
import { CreateCategoryModal } from "./CreateCategoryModal";

export function Categories({ token }: { token: string }) {
  const t = useTranslations("category");

  const { data: categoryData, isLoading } = useCategories(token);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat(t("table_format_date"), {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(date));

  return (
    <section>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{t("category_header")}</h1>

        <CreateCategoryModal token={token} />
      </div>

      <div className="mt-10 mb-10">
        <Separator className="mb-6" />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("table_header_name")}</TableHead>
              <TableHead>{t("table_header_product")}</TableHead>
              <TableHead>{t("table_header_createdAt")}</TableHead>
              <TableHead className="text-center">
                {t("table_header_action")}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {categoryData?.map((category: CategoryData) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>

                <TableCell>{category.productsCount}</TableCell>

                <TableCell>{formatDate(category.createdAt)}</TableCell>

                <TableCell className="flex gap-2 justify-center">
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-none"
                  >
                    <Edit size={20} />
                  </Button>

                  <Button
                    size="icon"
                    className="bg-red-600 hover:bg-red-700 rounded-none"
                  >
                    <Trash2 size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {categoryData?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  {t("table_message")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
