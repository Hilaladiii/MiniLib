"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema, TLogin } from "./validation";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Logo from "@/assets/logo.svg";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<TLogin> = async (data) => {
    const res = await login(data);
    if (res.statusCode == 200) {
      router.push("/admin/dashboard");
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-full max-w-sm flex flex-col justify-center mx-auto">
        <div className="inline-flex items-center gap-2 mx-auto mb-6">
          <Logo className="text-black" />
        </div>
        <h1 className="text-3xl font-medium">Welcome Back!</h1>
        <p className="text-xs mt-1">Please enter your credentials to login</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="space-y-4">
            <Input
              placeholder="Email"
              register={register}
              name={"email"}
              errors={errors.email}
              disabled={isSubmitting}
            />
            <Input
              placeholder="Password"
              register={register}
              name={"password"}
              type="password"
              errors={errors.password}
              disabled={isSubmitting}
            />
          </div>
          <Link href={"/"} className="block text-xs underline mt-3 text-right">
            Forgot password?
          </Link>
          <Button variant="black" disabled={isSubmitting} className="mt-8">
            Login
          </Button>
        </form>
        <span className="inline-flex gap-1 items-center mt-5 text-xs text-gray-700 justify-center">
          <p>Dont have an account?</p>
          <Link href={"/register"}>Register</Link>
        </span>
      </div>
    </div>
  );
}
