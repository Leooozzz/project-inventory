import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUser } from "@/app/[locale]/(dashboard)/users/api/editUser";
import { Input } from "../ui/input";
import {
  createUserSchema,
  userFormDataEdit,
} from "@/app/[locale]/(dashboard)/users/schema/editUser";

type Props = {
  id: string;
  token: string;
};
export function EditUserModal({ id, token }: Props) {
  const t = useTranslations("users");
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = editUser(token);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<userFormDataEdit>({
    resolver: zodResolver(createUserSchema),
  });
  const handleEditCategoryForm = (data: userFormDataEdit) => {
    const file = data.avatar?.[0];

    mutate(
      {
        id,
        data: {
          ...data,
          avatar: file,
        },
      },
      {
        onSuccess: () => {
          reset();
          setOpen(false);
        },
      },
    );
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" className="rounded-none">
          <Edit size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          action=""
          method="post"
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(handleEditCategoryForm)}
        >
          <DialogHeader>
            <DialogTitle>Editar</DialogTitle>
          </DialogHeader>
          <div>
            <input type="file" {...register("avatar")} />
          </div>
          <div>
            <Input
              className="rounded-none"
              placeholder={t("user_form_placeholder_name")}
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
              placeholder={t("user_form_placeholder_email")}
              type="text"
              {...register("email")}
            />

            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <Input
              className="rounded-none"
              placeholder={t("user_form_placeholder_password")}
              type="password"
              {...register("password")}
            />

            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <div>
            <Input
              className="rounded-none"
              placeholder={t("user_form_placeholder_password")}
              type="password"
              {...register("confirmPassword")}
            />

            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <Button type="submit" className="rounded-none" disabled={isPending}>
            {isPending ? "salvando" : "salvar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
