"use client";

import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogin } from "@/app/[locale]/auth/login/action/login";
import { setAuthCookies } from "@/cookies/setAuthCookie";
import { useAuthStore } from "@/store/auth";
import { LoginFormData, loginSchema } from "@/app/[locale]/auth/login/schema/login";


export function LoginForm() {
  const t = useTranslations("login");
  const router = useRouter();
  const { mutate, isPending } = useLogin();
  const authStore = useAuthStore((state) => state);


  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleSignUpForm = (data: LoginFormData) => {
    mutate(data, {
      onSuccess: async (result) => {
          if (!result?.token) {
    console.error("Token not received");
    return;
  }
        await setAuthCookies(result.token);

        authStore.setToken(result.token);

        router.push("/dashboard");
      },
      onError: () => {
        console.log("Login error");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignUpForm)}
      className="flex flex-col gap-4 p-6 border-2 max-w-2xl"
    >
      <h1 className="text-center text-3xl font-semibold mb-10 mt-10">
        {t("title")}
      </h1>

      <div>
        <Input type="email" placeholder="E-mail" {...register("email")} />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      <div>
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-4 bg-black text-white py-2 rounded"
      >
        {isPending ? "Loading..." : t("button")}
      </button>

      <Link href={"/auth/register"}>
        <p className="text-center text-sm">{t("register_link")}</p>
      </Link>
    </form>
  );
}
