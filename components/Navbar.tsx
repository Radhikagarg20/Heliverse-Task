import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/options";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import LogoutButton from "./logout-button";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const initials = session?.user.name ? getInitials(session.user.name) : "";

  return (
    <nav className="w-full bg-white border-b border-gray-200 py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-black tracking-tight">
          <span className="inline-block transition-transform hover:scale-110 hover:-rotate-3 duration-200">
            H
          </span>
          <span className="inline-block transition-transform hover:scale-110 hover:rotate-3 duration-200 ml-1">
            F
          </span>
          <span className="inline-block transition-transform hover:scale-110 hover:-rotate-3 duration-200 ml-1">
            D
          </span>
          <span className="inline-block transition-transform hover:scale-110 hover:rotate-3 duration-200 ml-1">
            M
          </span>
        </h1>
        <div className="flex items-center">
          <Avatar className="h-12 w-12 border-2 border-gray-300 transition-all duration-200 hover:scale-105 hover:border-gray-400">
            <AvatarFallback className="bg-gray-100 text-gray-800 font-semibold text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="ml-6">
            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
