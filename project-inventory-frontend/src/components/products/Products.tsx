"use client";
import { useTranslations } from "next-intl";
import { CreateProductModal } from "./CreateProductModal";
import { Separator } from "../ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { listProducts } from "@/app/[locale]/(dashboard)/products/api/listProducts";
import { productsData } from "@/app/[locale]/(dashboard)/products/types/products";
import { EditProductModal } from "./EditProductModal";
import { DeleteProductModal } from "./DeleteProductModal";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function Products({ token }: { token: string }) {
  const t = useTranslations("products");
  const { data: productsData, isLoading } = listProducts(token);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{t("products_title")}</h1>
        <CreateProductModal token={token} />
      </div>
      <div className="mt-5 mb-5 w-xl">
        <Card className="p-4">
          <form action="" method="post" className="flex gap-2">
            <Input
              className="rounded-none "
              placeholder={t("product_placeholder_search")}
            />
            <Button className="cursor-pointer rounded-none">
              {t("product_search")}
            </Button>
          </form>
        </Card>
      </div>
      <div className="mt-5 mb-5">
        <Separator />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("product_table_name")}</TableHead>
              <TableHead>{t("product_table_category")}</TableHead>
              <TableHead>{t("product_table_unitprice")}</TableHead>
              <TableHead>{t("product_table_quantitystock")}</TableHead>
              <TableHead>{t("product_table_action")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsData?.map((product: productsData) => (
              <TableRow key={product.id}>
                <TableCell className="flex items-center gap-2">
                  {product.name}
                </TableCell>
                <TableCell>{product.categoryName}</TableCell>
                <TableCell>
                  {" "}
                  R${" "}
                  {isLoading
                    ? "..."
                    : Number(product.unitPrice ?? 0).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                </TableCell>
                <TableCell>
                  {product.quantity}
                  {product.unitType}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <EditProductModal token={token} id={product.id} />

                    <DeleteProductModal token={token} id={product.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
