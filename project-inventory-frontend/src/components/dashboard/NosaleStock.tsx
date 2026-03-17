"use client";
import { useLocale, useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { lowStock } from "@/app/[locale]/(dashboard)/dashboard/api/low-stock";
import { stagnantProducts } from "@/app/[locale]/(dashboard)/dashboard/api/stagnant-products";

export function NosaleStock({ token,period } : { token: string,period:number }) {
  const t = useTranslations("dashboard");
  const locale = useLocale();

  const { data: lowStockData, isLoading: stockLoading } = lowStock(token);
  const { data: stagnantData, isLoading: stagnantLoading } =
    stagnantProducts(token,period);

  const loading = stockLoading || stagnantLoading;

  return (
    <section className="grid md:grid-cols-2 grid-cols-1 gap-4">
      <Card className="p-3">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            {t("low_stock")}
          </CardTitle>
          <CardDescription>{t("low_stock_subtitle")}</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 font-semibold">
          {stockLoading ? (
            <p>Loading...</p>
          ) : lowStockData?.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {t("low_stock_alert")}
            </p>
          ) : (
            lowStockData?.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center border-b border-gray-400 p-2"
              >
                <div className="gap-2 flex flex-col">
                  <p>{product.name}</p>
                  <span>
                    QTD: {product.quantity} {product.unitType}
                  </span>
                </div>

                <div className="gap-2 flex flex-col">
                  <p>
                    R$ {Number(product.unitPrice ?? 0).toLocaleString(locale)}
                  </p>
                  <span>MIN: {product.minimumQuantity}</span>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card className="p-3 ">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            {t("stagnant_products")}
          </CardTitle>
          <CardDescription>{t("stagnant_products_subtitle")}</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 font-semibold">
          {stagnantLoading ? (
            <p>Loading...</p>
          ) : stagnantData?.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {t("stagnant_products_alert")}
            </p>
          ) : (
            stagnantData?.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center border-b border-gray-400 p-2"
              >
                <div className="gap-2 flex flex-col">
                  <p>{product.name}</p>
                  <span>
                    QTD: {product.quantity} {product.unitType}
                  </span>
                </div>

                <div className="gap-2 flex flex-col">
                  <p>
                    R$ {Number(product.unitPrice ?? 0).toLocaleString(locale)}
                  </p>
                  <span>MIN: {product.minimumQuantity}</span>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </section>
  );
}
