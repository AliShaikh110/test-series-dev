"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PreventBackNavigation() {
    const router = useRouter();

    useEffect(() => {
      // Push current page to history so we trap the user here
      history.pushState(null, "", location.href);
  
      const handlePopState = () => {
        router.replace("/");  // push to the home page or any other page you want
      };
  
      window.addEventListener("popstate", handlePopState);
  
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }, [router]);
  
    return null;
}
