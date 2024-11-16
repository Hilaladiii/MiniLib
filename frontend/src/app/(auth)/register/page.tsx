"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Logo from "@/assets/logo.svg";
import { registerService } from "@/services/auth";
import { registerSchema, TRegister } from "./validation";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TRegister>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<TRegister> = async (data) => {
    const res = await registerService(data);
    if (res.statusCode == 201) {
      toast({
        title: "Success",
        description: res.message,
      });
      router.push("/login");
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
        <div className="inline-flex items-center gap-2 mx-auto mb-6">
          <Logo className="text-primary" />
        </div>
        <h1 className="text-3xl font-medium text-primary">
          Welcome to MiniLib!
        </h1>
        <p className="text-xs mt-1">
          Please enter your credentials to register
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="space-y-4">
            <Input
              placeholder="Username"
              register={register}
              name={"username"}
              errors={errors.username}
              disabled={isSubmitting}
            />
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
            Register
          </Button>
        </form>
        <span className="inline-flex gap-1 items-center mt-5 text-xs text-gray-800 justify-center">
          <p>Already have an account?</p>
          <Link href={"/login"}>Login</Link>
        </span>
      </div>
    </div>
  );
}
