"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { requiredUserLogged } from "@/cookies/authValidate";

type Props = {
  user: {
    name: string;
    email: string;
  };
};

export const IconProfileClient = async () => {
  const user = await requiredUserLogged();
  const firstName = user.name.split(" ")[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{firstName.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-start leading-tight">
            <span className="text-sm font-medium">{user.name}</span>
            <div className="flex gap-3">
              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40"></DropdownMenuContent>
    </DropdownMenu>
  );
};
