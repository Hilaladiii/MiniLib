"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema, TLogin } from "./validation";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
import Logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
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
      router.push("/user");
      toast({
        title: "Success",
        description: res.message,
      });
    } else {
      toast({
        title: "Failed",
        description: res.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-full max-w-sm flex flex-col justify-center mx-auto">
        {/* <div className="inline-flex items-center gap-2 mx-auto mb-6">
          <Logo className="text-primary" />
        </div> */}
        <h1 className="text-3xl font-medium text-primary">Welcome Back!</h1>
        <p className="text-xs mt-1 text-primary">
          Please enter your credentials to login
        </p>
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
          <Button disabled={isSubmitting} className="mt-8 w-full">
            Login
          </Button>
        </form>
        <span className="inline-flex gap-1 items-center mt-5 text-xs text-gray-800 justify-center">
          <p>Dont have an account?</p>
          <Link href={"/register"}>Register</Link>
        </span>
      </div>
    </div>
  );
}
