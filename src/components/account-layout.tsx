import { UserType } from "@/types/types";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import AccountNav, {
  DrawerDemo,
} from "@/components/account-nav";
import Link from "next/link";

interface AccountLayoutProps {
  user: Omit<UserType, "password_hash"> | null;
  children: React.ReactNode;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ children, user }) => {
  return (
    <div className="w-full  ">
      <div className="">
        {user?.ok && !user?.data?.phone && (
          <>
            <Alert variant={"destructive"}>
              <AlertCircle className="h-4 w-4 " />
              <AlertTitle>Phone is not verified!</AlertTitle>
              <AlertDescription>
                Please verify your phone for better user experience and perks
              </AlertDescription>
            </Alert>
          </>
        )}

        <div className="p-4 ml-4 cursor-pointer">
          <Link
            href="/"
            className="group relative inline-flex items-center gap-2  px-4 py-1 text-sm font-medium border-black border shadow-md transition-all duration-300 hover:translate-y-[-1px] hover:shadow-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:translate-y-[1px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transform transition-transform duration-200 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>
        <div
          className={`${
            user?.ok ? "border" : ""
          }  text-sm font-normal rounded-lg `}
        >
          <div className={`${"sm:grid  grid-cols-12"}`}>
            {user?.data && (
              <div className="accountNav col-span-2  border-r  lg:block hidden">
                <AccountNav />
              </div>
            )}
            {user?.ok && (
              <div className="fixed rounded-full left-0 right-0 text-center z-30 bottom-20 lg:hidden block">
                <DrawerDemo />
              </div>
            )}

            <div
              className={`${
                user?.ok
                  ? "lg:col-span-10 col-span-12 h-auto relative"
                  : "lg:col-span-12 col-span-12"
              } `}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
