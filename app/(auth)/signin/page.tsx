import { Signin } from "@/components/signin-signup/Signin";
import { authOptions } from "@/lib/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex justify-center items-center min-h-screen h-full">
      <Signin />
    </div>
  );
}
