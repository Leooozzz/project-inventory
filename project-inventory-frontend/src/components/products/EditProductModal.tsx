"use client";

import { Box, Edit } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProductSchema,
  productFormData,
} from "@/app/[locale]/(dashboard)/products/schema/product";
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
import { useCategories } from "@/app/[locale]/(dashboard)/categories/api/categories";
import { CategoryData } from "@/app/[locale]/(dashboard)/categories/types/categories";
import { editProduct } from "@/app/[locale]/(dashboard)/products/api/editProduct";
import { editProductSchema, productEditFormData } from "@/app/[locale]/(dashboard)/products/schema/editProduct";

type Props = {
  id: string;
  token: string;
};
export function EditProductModal({ id, token }: Props) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("products");
  const { data: categoryData } = useCategories(token);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
  } = useForm<productEditFormData>({
    resolver: zodResolver(editProductSchema),
  });
  const { mutate, isPending } = editProduct(token);
  const handleUserForm = (data: productEditFormData) => {
    mutate(
      {
        id,
        data,
      },
      {
        onSuccess: async (result) => {
          if (!result) {
            console.log("Error editing product.");
            return;
          }
          reset();
          setOpen(false);
        },
      },
    );
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" className="rounded-none">
          <Edit size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          action=""
          method="post"
          className="flex gap-2 flex-col"
          onSubmit={handleSubmit(handleUserForm)}
        >
          <DialogTitle>Editar</DialogTitle>
          <div>
            <Input
              className="rounded-none"
              placeholder={t("product_name_placeholder")}
              type="text"
              {...register("name")}
            />

            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <Input
              className="rounded-none"
              placeholder={t("product_unitprice_placeholder")}
              type="number"
              {...register("unitPrice", { valueAsNumber: true })}
            />

            {errors.unitPrice && (
              <span className="text-red-500 text-sm">
                {errors.unitPrice.message}
              </span>
            )}
          </div>

          <div>
            <Input
              className="rounded-none"
              placeholder={t("product_quantity_Placeholder")}
              type="text"
              {...register("quantity")}
            />

            {errors.quantity && (
              <span className="text-red-500 text-sm">
                {errors.quantity.message}
              </span>
            )}
          </div>
          <div>
            <Input
              className="rounded-none"
              placeholder={t("product_maximumquantity_placeholder")}
              type="text"
              {...register("maximumQuantity")}
            />

            {errors.maximumQuantity && (
              <span className="text-red-500 text-sm">
                {errors.maximumQuantity.message}
              </span>
            )}
          </div>
          <div>
            <Input
              className="rounded-none"
              placeholder={t("product_minimumquantity_placeholder")}
              type="text"
              {...register("minimumQuantity")}
            />

            {errors.minimumQuantity && (
              <span className="text-red-500 text-sm">
                {errors.minimumQuantity.message}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Select
              onValueChange={(value) =>
                setValue("unitType", value as productFormData["unitType"])
              }
            >
              <SelectTrigger className="w-full max-w-48 rounded-none">
                <SelectValue placeholder={t("product_unit_type")} />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectGroup>
                  <SelectLabel>{t("product_type")}</SelectLabel>
                  <SelectItem value="Kg">Kg</SelectItem>
                  <SelectItem value="g">g</SelectItem>
                  <SelectItem value="l">l</SelectItem>
                  <SelectItem value="ml">ml</SelectItem>
                  <SelectItem value="un">un</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setValue("categoryId", value)}>
              <SelectTrigger className="w-full max-w-48 rounded-none">
                <SelectValue placeholder={t("product_category_select")} />
              </SelectTrigger>

              <SelectContent className="rounded-none">
                <SelectGroup>
                  <SelectLabel>{t("product_type")}</SelectLabel>

                  {categoryData?.map((category: CategoryData) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="rounded-none" disabled={isPending}>
            {isPending ? "editando" : "editar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
