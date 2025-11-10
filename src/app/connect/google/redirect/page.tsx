// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { authService } from "@/data/services/auth-service";
// import { storeAuthToken } from "@/data/actions/auth";

// export default function GoogleCallback() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const access_token = searchParams && searchParams.get("access_token");

//     if (!access_token) {
//       setError("No access token provided");
//       return;
//     }

//     const validateToken = async () => {
//       try {
//         const data = await authService.validateOAuthCallback(
//           "google",
//           access_token
//         );

//         if (data.jwt) {
//           await storeAuthToken(data.jwt);
//         }
//         localStorage.setItem("user", JSON.stringify(data.user));

//         // Check if profile is complete
//         if (!data.user.hasCompletedProfile) {
//           router.push("/complete-profile");
//         } else {
//           router.push("/dashboard");
//         }
//       } catch (error) {
//         console.error("Validation error:", error);
//         setError("Authentication failed");
//       }
//     };

//     validateToken();
//   }, [router, searchParams]);

//   if (error) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center">
//       <div className="text-gray-600">Completing authentication...</div>
//     </div>
//   );
// }
