"use client";

import { CalendarClockIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  movesFormData,
  movesSchema,
} from "@/app/[locale]/(dashboard)/moves/schemas/moves";
import { createMoves } from "@/app/[locale]/(dashboard)/moves/api/createMoves";
import { listProducts } from "@/app/[locale]/(dashboard)/products/api/listProducts";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { productsData } from "@/app/[locale]/(dashboard)/products/types/products";

export function NewMoveModal({ token }: { token: string }) {
  const t = useTranslations("moves");
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
  } = useForm<movesFormData>({
    resolver: zodResolver(movesSchema),
  });
  const { mutate, isPending } = createMoves(token);
  const { data: productData } = listProducts(token);
  const handleMovesForm = (data: movesFormData) => {
    mutate(data, {
      onSuccess: async (result) => {
        if (!result) {
          console.log("Error creating new move.");
          return;
        }
        reset();
        setOpen(false);
      },
    });
  };
  return (
    <section>
      <Button
        className="text-lg font-semibold p-4 flex items-center gap-2 rounded-none"
        onClick={() => setOpen(true)}
      >
        <CalendarClockIcon size={20} />
        {t("moves_button")}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form
            action=""
            method="post"
            className="flex gap-2 flex-col"
            onSubmit={handleSubmit(handleMovesForm)}
          >
            <DialogHeader className="mb-2">
              <DialogTitle>{t("moves_modal")}</DialogTitle>
            </DialogHeader>
            <div className="flex gap-2">
              <Select
                onValueChange={(value) =>
                  setValue("type", value as movesFormData["type"])
                }
              >
                <SelectTrigger className="w-full max-w-48 rounded-none">
                  <SelectValue placeholder={t("moves_select_a_type")} />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectGroup>
                    <SelectLabel>{t("moves_select_a_type")}</SelectLabel>
                    <SelectItem value="in">{t(`type.in`)}</SelectItem>
                    <SelectItem value="out">{t(`type.out`)}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => setValue("productId", value)}>
                <SelectTrigger className="w-full max-w-48 rounded-none">
                  <SelectValue placeholder={t("product_name_select")} />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectGroup>
                    {productData?.map((product: productsData) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Input
                className="rounded-none"
                placeholder={t("moves_quantity_placeholder")}
                type="number"
                {...register("quantity", { valueAsNumber: true })}
              />

              {errors.quantity && (
                <span className="text-red-500 text-sm">
                  {errors.quantity.message}
                </span>
              )}
            </div>
            <Button type="submit" className="rounded-none" disabled={isPending}>
              {isPending ? t("create_button_loading") : t("create_button")}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
