import React,{useEffect} from "react";
import { getUserMeLoader } from "@/data/services/get-user-loader";
import AccountLayout from "@/components/account-layout";
import { cookies } from "next/headers";
import axios from "axios";
import { redirect } from "next/navigation";

export default async function AccountPageLayout({
  dashboard,
  login,
}: {
  dashboard: React.ReactNode;
  login: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return redirect("/sign-in");
  }
  const user = await getUserMeLoader();
  if(!user){
    redirect("/sign-in");
  }

  return (
    <AccountLayout user={user}>{user.ok ? dashboard : login}</AccountLayout>
  );
}
