import { Edit, Trash2, UserCheck } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { createUsers } from "@/app/[locale]/(dashboard)/users/api/createUser";
import { useForm } from "react-hook-form";
import {
  createUserSchema,
  userFormData,
} from "@/app/[locale]/(dashboard)/users/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";

export function CreateUserModal({ token }: { token: string }) {
  const t = useTranslations("users");
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<userFormData>({
    resolver: zodResolver(createUserSchema),
  });
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = createUsers(token);

  const handleUserForm = (data: userFormData) => {
    mutate(data, {
      onSuccess: async (result) => {
        if (!result) {
          console.log("Error creating new user.");
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
        <UserCheck size={20} />
        {t("user_form_header")}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form
            action=""
            method="post"
            onSubmit={handleSubmit(handleUserForm)}
            className="flex flex-col gap-3"
          >
            <DialogHeader>
              <DialogTitle>{t("user_form_header")}</DialogTitle>
            </DialogHeader>
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
                placeholder={t("user_form_placeholder_confirmpassword")}
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
              {isPending ? t("create_button") : t("create_button_loading")}
            </Button>
          </form>
        </DialogContent>
       
      </Dialog>
    </section>
  );
}
