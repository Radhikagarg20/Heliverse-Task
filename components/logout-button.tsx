"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  return (
    <Button
      variant="outline"
      size="lg"
      onClick={() => signOut()}
      className="text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 hover:scale-105"
    >
      <LogOut className="h-5 w-5 mr-2" />
      Logout
    </Button>
  );
}
