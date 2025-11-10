import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUserMeLoader } from "@/data/services/get-user-loader";
import Overview from "@/components/overview";
import { fetchCachedData } from "@/utils/utils";
import { resProp } from "./educational-details/page";

export const metadata: Metadata = {
  title: "Account",
  description: "Overview of your account activity.",
};

export default async function OverviewTemplate() {

  

  const user = await getUserMeLoader();
  const id = user.data?.id;
  const userDetailsData = `/api/user-details?filters[users_permissions_user][id][$eq]=${id}`;
  const userDetails: resProp = await fetchCachedData(userDetailsData);

  if (!user) {
    notFound();
  }

  return (
    <>
      <Overview user={user} UserDetails={userDetails} />
    </>
  );
}
