"use client";
import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import SubmittingButton from "./SubmittingButton";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export function Signin() {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  async function handleSignin(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    startTransition(async () => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid credentials");
      } else {
        toast.success("Signed in successfully!");
        router.push("/");
        router.refresh();
      }
    });
  }

  return (
    <Card className="w-[350px]">
      <CardHeader className="text-center">
        <CardTitle>Welcome Back!</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSignin}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                id="email"
                placeholder="Your email.."
                required
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                type="password"
                id="password"
                placeholder="Your password.."
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <SubmittingButton text="Sign in" pending={isPending} />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-700 underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
