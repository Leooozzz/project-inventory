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

export function Products({ token }: { token: string }) {
  const t = useTranslations("products");
  const { data: productsData, isLoading } = listProducts(token);
  return (
    <section>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{t("products_title")}</h1>
        <CreateProductModal token={token} />
      </div>
      <div className="mt-10 mb-10">
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
                <TableCell>{product.unitPrice}</TableCell>
                <TableCell>{product.quantity}</TableCell>
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
