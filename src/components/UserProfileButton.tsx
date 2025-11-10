"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Edit, LogOutIcon, User } from "lucide-react";
import Link from "next/link";
import { logout } from "@/data/actions/auth";
import { useRouter } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"


interface Props {
  firstName: string | undefined | null;
  email: string | undefined | null;
  pictureURL: string | undefined | null;
}

export const UserProfileButton = ({ firstName, email, pictureURL }: Props) => {
  const router = useRouter();
  // const data = await getUserPicture(userId);
  // const pictureURL = data.data?.formats?.small?.url;

  const handleLogout = async () => {
    try {
      await logout();
      // Optionally refresh the current page to reflect logged out state
      router.refresh();
      // Optionally redirect to login page
      router.push("/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="flex items-center gap-x-2 text-sm ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex justify-center items-center h-[3rem]">
          <div className="h-full w-[3rem] flex items-center justify-center">
            <Avatar className="h-[2rem] w-[2rem]">
              <AvatarImage src={pictureURL || ''} />
              <AvatarFallback>{firstName?.[0]}</AvatarFallback>
            </Avatar> 
          </div>
            <div className="flex flex-col">
              <p>{firstName ? "" + firstName : "Profile"}</p>
              <p className="text-xs text-muted-foreground leading-none">
                {email}
              </p>
            </div>
            <ChevronDown className="" size={15} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="font-medium">
            <Link href={"/dashboard"}>
              <DropdownMenuItem className="hover:bg-accent/10 ">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>
            <Link href={"/dashboard/profile"}>
              <DropdownMenuItem className="hover:bg-accent/10 ">
                <Edit className="mr-2 h-4 w-4" />
                <span>Update profile </span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-accent/10 text-red-500">
              <div onClick={handleLogout} className="flex items-center">
                <LogOutIcon className="mr-2 h-4 w-4" />
                <span>logout</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
