import { LoginForm } from "@/components/auth/login";

export default function Login() {
  return (
    <main className="flex justify-center mt-20 mb-20 ">
      <div className="w-full max-w-2xl ">
        <LoginForm />
      </div>
    </main>
  );
}
