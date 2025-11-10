import { CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { getUserPicture } from "@/data/services/get-user-loader";
import {
  GraduationCap,
  Building2,
  School,
  Home,
  Mail,
  Phone,
  User2,
} from "lucide-react";
import Link from "next/link";
import { UserType } from "@/types/types";
interface userProp {
  user: UserType;
  UserDetails: any;
}

const Overview = async ({ user, UserDetails }: userProp) => {
  const data = await getUserPicture(user.data?.id);
  const pictureURL = data.data?.formats?.small?.url;

  const formatDate = (date: string) => {
    return date
      ? new Date(date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "Not specified";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">Profile Overview</h2>
          <Link
            href="/dashboard/profile"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit Profile
          </Link>
        </div>

        {/* Profile Section */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  {pictureURL ? (
                    <img
                      src={pictureURL}
                      alt={user.data?.fullname || "Profile"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">
                        {user.data?.fullname?.[0] || "?"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 space-y-4 text-center sm:text-left">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {user.data?.fullname || "Name"}
                  </h3>
                  <p className="text-gray-500">{user.data?.email || "Email"}</p>
                </div>
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700">
                    <Home className="w-4 h-4" />
                    <span>
                      {user.data?.town || "Town"}, {user.data?.state || "State"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700">
                    <Phone className="w-4 h-4" />
                    <span>{user.data?.phone || "Phone not added"}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700">
                    <User2 className="w-4 h-4" />
                    <span>{user.data?.gender || "Not specified"}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Education Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b p-3 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User2 className="w-5 h-5 text-blue-600" />
                </div>
                <CardTitle>Personal Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  { icon: User2, label: "Name", value: user.data?.fullname },
                  { icon: Mail, label: "Email", value: user.data?.email },
                  { icon: Phone, label: "Phone", value: user.data?.phone },
                  {
                    icon: Home,
                    label: "Location",
                    value: `${user.data?.town || "Town"}, ${
                      user.data?.district || "District"
                    }, ${user.data?.state || "State"}`,
                  },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      <span className="text-gray-900 font-medium">
                        {item.value || "Not provided"}
                      </span>
                    </div>
                    {index < 3 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Graduation Details */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b p-3 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                </div>
                <CardTitle>Graduation Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  {
                    label: "Institution",
                    value: UserDetails.data?.[0]?.graduationInstitution,
                  },
                  { label: "Course", value: UserDetails.data?.[0]?.courseDone },
                  {
                    label: "Percentage",
                    value: UserDetails.data?.[0]?.graduationPercentage,
                    isPercentage: true,
                  },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">{item.label}</span>
                      <span
                        className={`${
                          item.isPercentage
                            ? "px-3 py-1 bg-green-100 text-green-800 rounded-full"
                            : "text-gray-900"
                        } font-medium`}
                      >
                        {item.isPercentage && item.value
                          ? `${item.value}%`
                          : item.value || "Not specified"}
                      </span>
                    </div>
                    {index < 2 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Twelfth Details */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b p-3 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Building2 className="w-5 h-5 text-green-600" />
                </div>
                <CardTitle>12th Standard Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  {
                    label: "School",
                    value: UserDetails.data?.[0]?.twelfthSchoolName,
                  },
                  {
                    label: "Stream",
                    value: UserDetails.data?.[0]?.twelfthSpecialization,
                  },
                  {
                    label: "Board",
                    value: UserDetails.data?.[0]?.twelfthSchoolBoard,
                  },
                  {
                    label: "Percentage",
                    value: UserDetails.data?.[0]?.twelfthPercentage,
                    isPercentage: true,
                  },
                  {
                    label: "Passing Year",
                    value: formatDate(
                      UserDetails.data?.[0]?.twelfthPassingYear
                    ),
                  },
                ].map((item, index, arr) => (
                  <div key={index}>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">{item.label}</span>
                      <span
                        className={`${
                          item.isPercentage
                            ? "px-3 py-1 bg-green-100 text-green-800 rounded-full"
                            : "text-gray-900"
                        } font-medium`}
                      >
                        {item.isPercentage && item.value
                          ? `${item.value}%`
                          : item.value || "Not specified"}
                      </span>
                    </div>
                    {index < arr.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tenth Details */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b p-3 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <School className="w-5 h-5 text-orange-600" />
                </div>
                <CardTitle>10th Standard Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  {
                    label: "School",
                    value: UserDetails.data?.[0]?.tenthSchoolName,
                  },
                  {
                    label: "Board",
                    value: UserDetails.data?.[0]?.tenthSchoolBoard,
                  },
                  {
                    label: "Percentage",
                    value: UserDetails.data?.[0]?.tenthPercentage,
                    isPercentage: true,
                  },
                  {
                    label: "Passing Year",
                    value: formatDate(UserDetails.data?.[0]?.tenthPassingYear),
                  },
                ].map((item, index, arr) => (
                  <div key={index}>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">{item.label}</span>
                      <span
                        className={`${
                          item.isPercentage
                            ? "px-3 py-1 bg-green-100 text-green-800 rounded-full"
                            : "text-gray-900"
                        } font-medium`}
                      >
                        {item.isPercentage && item.value
                          ? `${item.value}%`
                          : item.value || "Not specified"}
                      </span>
                    </div>
                    {index < arr.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Overview;
