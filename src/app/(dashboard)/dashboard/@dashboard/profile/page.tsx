import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getUserMeLoader,
  getUserPicture,
} from "@/data/services/get-user-loader";
import ProfileEmail from "@/components/profile-email";
import { Card, CardContent } from "@/components/ui/card";
import ProfileName from "@/components/profile-name";
import ProfilePhone from "@/components/profile-phone";
import Add from "./add";
import { Mail, User, Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "Profile",
  description: "View and edit your Only education's User Profile.",
};

export default async function Profile() {
  const user = await getUserMeLoader();
  const data = await getUserPicture(user.data?.id);

  let pictureURL = null;
  if (data.data) {
    pictureURL = data.data.formats.small.url;
  }

  if (!user) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Profile Settings
            </h1>
            <p className="text-gray-600">
              Manage your account information and preferences
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {/* Profile Sidebar */}
          <div className="md:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center group">
                      {pictureURL ? (
                        <img
                          src={pictureURL}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-3xl text-gray-400">
                          {user.data?.fullname?.[0] || "?"}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                        <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-0">
                      <Add />
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    {user.data?.fullname || "Your Name"}
                  </h2>
                  <p className="text-gray-500 text-sm mb-4">
                    {user.data?.email || "your.email@example.com"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    Personal Information
                  </h3>
                </div>
                <div className="space-y-6">
                  <ProfileName user={user} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-purple-50">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Contact Information</h3>
                </div>
                <div className="space-y-6">
                  <ProfileEmail user={user} />
                  <div className="border-t border-gray-100 pt-6">
                    <ProfilePhone user={user} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
