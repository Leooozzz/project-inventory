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
import { CreateUserModal } from "./CreateUserModal";
import { listUsers } from "@/app/[locale]/(dashboard)/users/api/users";
import { userData } from "@/app/[locale]/(dashboard)/users/types/users";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Edit, Trash2 } from "lucide-react";
import { EditUserModal } from "./EditUserModal";

export function Users({ token }: { token: string }) {
  const t = useTranslations("users");
  const { data: usersData, isLoading } = listUsers(token);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Usuários</h1>
        <CreateUserModal token={token} />
      </div>

      <div className="mt-10 mb-10">
        <Separator />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("user_header_name")}</TableHead>
              <TableHead>{t("user_header_email")}</TableHead>
              <TableHead>{t("user_header_function")}</TableHead>
              <TableHead>{t("user_header_action")}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {usersData?.map((user: userData) => (
              <TableRow key={user.id}>
                <TableCell className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={user.avatar ?? ""} alt={user.name} />
                    <AvatarFallback>
                      {user.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {user.name}
                </TableCell>

                <TableCell>{user.email}</TableCell>

                <TableCell>
                  {user.isAdmin
                    ? t("user_isAdmin_true")
                    : t("user_isAdmin_false")}
                </TableCell>

                <TableCell>
                  <div className="flex gap-2">
                    <EditUserModal token={token} id={user.id}/>

                    <button className="p-1 hover:bg-red-100 rounded">
                      <Trash2 size={18} className="text-red-600" />
                    </button>
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
