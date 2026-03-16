"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useVerifyOtp } from "@/app/[locale]/auth/useotp/action/useotp";
import { useAuthStore } from "@/store/auth";
import { setAuthCookies } from "@/cookies/setAuthCookie";
import { useTranslations } from "next-intl";

type OtpFormData = {
  otp: string;
};

export function UseOtp() {
  const router = useRouter();
  const { mutate, isPending, error } = useVerifyOtp();
  const { handleSubmit, setValue } = useForm<OtpFormData>();
  const [email, setEmail] = useState<string | null>(null);
  const authStore =useAuthStore(state=>state)

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);

  const handleOtp = (data: OtpFormData) => {
    if (!email) return;

    mutate(
      {
        email,
        otp: data.otp,
      },
      {
        onSuccess: async (result) => {
          localStorage.setItem("token", result.token);
          await setAuthCookies(result.token)
          authStore.setToken(result.token)
          router.push("/dashboard");
        },
        onError: () => {
          console.log("Invalid OTP");
        },
      }
    );
  };

  const t = useTranslations("otp")
  return (
    <form
      onSubmit={handleSubmit(handleOtp)}
      className="flex flex-col items-center gap-6 p-6 border-2"
    >
      <h1 className="text-2xl font-semibold">Verify OTP</h1>

      {email &&  <p>{t("email")} {email}</p>}

      <InputOTP maxLength={6} onChange={(value) => setValue("otp", value)}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      {error && <p className="text-red-500">Invalid OTP</p>}

      <button
        type="submit"
        disabled={isPending}
        className="bg-black text-white py-2 px-6 rounded"
      >
        {isPending ? (t("button_conf")) : (t("button"))}
      </button>
    </form>
  );
}
