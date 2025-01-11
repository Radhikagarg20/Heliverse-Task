"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { SignupAction } from "@/actions/authActions";
import SubmittingButton from "./SubmittingButton";
import { useFormState } from "react-dom";
import { FormState } from "@/types/auth";
import { useEffect } from "react";
import { signIn } from "next-auth/react";

export function Signup() {
  const initialState: FormState = {
    errors: undefined,
    success: false,
  };

  const [state, formAction] = useFormState(SignupAction, initialState);

  useEffect(() => {
    if (state?.success && state.credentials) {
      signIn("credentials", {
        email: state.credentials.email,
        password: state.credentials.password,
        redirect: true,
        callbackUrl: "/",
      });
    }
  }, [state?.success, state.credentials]);

  return (
    <Card className="w-[350px]">
      <CardHeader className="text-center">
        <CardTitle>Welcome!</CardTitle>
        <CardDescription>Register to access our services!</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          {state?.errors?.general && (
            <div className="text-red-500 text-sm mb-4">
              {state.errors.general.map((error, i) => (
                <p key={i}>{error}</p>
              ))}
            </div>
          )}
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                type="text"
                id="name"
                placeholder="Your name.."
                required
              />
              {state?.errors?.name && (
                <div className="text-red-500 text-sm">
                  {state.errors.name.map((error, i) => (
                    <p key={i}>{error}</p>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">email</Label>
              <Input
                name="email"
                type="email"
                id="email"
                placeholder="Your email.."
                required
              />
              {state?.errors?.email && (
                <div className="text-red-500 text-sm">
                  {state.errors.email.map((error, i) => (
                    <p key={i}>{error}</p>
                  ))}
                </div>
              )}
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
              {state?.errors?.password && (
                <div className="text-red-500 text-sm">
                  {state.errors.password.map((error, i) => (
                    <p key={i}>{error}</p>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Role">Role</Label>
              <Select name="role" required>
                <SelectTrigger id="Role">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="MANAGER">MANAGER</SelectItem>
                  <SelectItem value="STAFF">STAFF</SelectItem>
                  <SelectItem value="DELIVERY">DELIVERY</SelectItem>
                </SelectContent>
              </Select>
              {state?.errors?.role && (
                <div className="text-red-500 text-sm">
                  {state.errors.role.map((error, i) => (
                    <p key={i}>{error}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mt-4">
            <SubmittingButton text="Signup" />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <p>
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-700 underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
