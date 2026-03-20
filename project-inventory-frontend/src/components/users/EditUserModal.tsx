import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema, userFormData } from "@/app/[locale]/(dashboard)/users/schema/user";
import { editUser } from "@/app/[locale]/(dashboard)/users/api/editUser";

type Props = {
  id: string;
  token: string;
};
export function EditUserModal({ id, token }: Props){
    const t = useTranslations("users");
     const [open, setOpen] = useState(false);
    const { mutate, isPending } = editUser(token);
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
      } = useForm<userFormData>({
        resolver: zodResolver(createUserSchema),
      });
    return(
       <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <Button size="icon" variant="outline" className="rounded-none">
          <Edit size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form action="" method="post">

            <DialogHeader>
            <DialogTitle>Editar</DialogTitle>
          </DialogHeader>
            
            <Button type="submit" className="rounded-none" disabled={isPending}>
            {isPending ? "salvar":"salvando"}
          </Button>
        </form>
      </DialogContent>
       </Dialog>
    )
}