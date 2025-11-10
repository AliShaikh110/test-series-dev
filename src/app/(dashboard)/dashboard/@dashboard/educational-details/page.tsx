// "use client";
import { getUserMeLoader } from "@/data/services/get-user-loader";
import { fetchCachedData } from "@/utils/utils";
import React from "react";
import Graduation from "@/components/education";
import Twelfth from "@/components/twelfth-update";
import { Tenth } from "@/components/tenth-update";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getUserPicture } from "@/data/services/get-user-loader";
import { EducationalDetailsComp } from "@/components/page";
import { Camera, InfoIcon, Mail } from "lucide-react";

interface UserDetails {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  courseInterestedIn: string | null;
  given_entrance_exams: string | null;
  graduationInstitution: string;
  courseDone: string;
  graduationPercentage: number;
  entranceExamAttempted: string;
  gender: string;
  tenthSchoolBoard: string;
  tenthPassingYear: string;
  tenthPercentage: number;
  tenthSchoolName: string;
  twelfthSchoolBoard: string;
  twelfthPassingYear: string;
  twelfthPercentage: number;
  twelfthSchoolName: string;
  twelfthSpecialization: string;
}
export interface resProp {
  data: UserDetails[];
}
interface twelfthProps {
  twelfthSpecialization: string;
  twelfthPercentage: number;
  twelfthPassingYear: string;
  twelfthSchoolBoard: string;
  twelfthSchoolName: string;
}
interface tenthProps {
  tenthSchoolBoard: string;
  tenthPassingYear: string;
  tenthPercentage: number;
  tenthSchoolName: string;
}

interface Graducation {
  graduationInstitution: string;
  courseDone: string;
  graduationPercentage: number;
}
interface GraduationProps {
  graducation?: Graducation;
}

interface TwelfthProps {
  twelfthProps?: twelfthProps;
}

interface TenthProps {
  tenthProps?: tenthProps;
}
export interface EducationalDetailsProps {
  tenthProps?: tenthProps;
  twelfthProps?: twelfthProps;
  graducation?: Graducation;
}
const EducationalDetails = async () => {


  const user = await getUserMeLoader();
  if(!user.data) return;
  const id = user.data.id;
  const userDetailsData = `/api/user-details?filters[users_permissions_user][id][$eq]=${id}`;
  const userDetails: resProp = await fetchCachedData(userDetailsData);
  
 
  const graducationQuery = `/api/user-details?filters[users_permissions_user][id][$eq]=${id}&fields[0]=graduationInstitution&fields[1]=graduationPercentage&fields[2]=courseDone`;
  const twelfthQuery = `/api/user-details?filters[users_permissions_user][id][$eq]=${id}&fields[0]=twelfthSpecialization&fields[1]=twelfthPercentage&fields[2]=twelfthPassingYear&fields[3]=twelfthSchoolBoard&fields[4]=twelfthSchoolName`;
  const tenthQuery = `/api/user-details?filters[users_permissions_user][id][$eq]=${id}&fields[0]=tenthSchoolBoard&fields[1]=tenthPassingYear&fields[2]=tenthSchoolName&fields[3]=tenthPercentage`;

  const [graduationData, twelfthData, tenthData] = await Promise.all([
    fetchCachedData(graducationQuery),
    fetchCachedData(twelfthQuery),
    fetchCachedData(tenthQuery),
  ]);
  
  const data = await getUserPicture(user.data?.id);
  let pictureURL = null;
  if (data.data) {
    pictureURL = data.data.formats.small.url;
  }
  return (
    <section className="">
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-gray-100 h-full">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-dark">
            Education Details
          </h2>
          <Card className="mb-6 bg-white hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Profile Image Section */}
                <div className="relative group">
                  <div className="w-28 h-28 rounded-full overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center ring-4 ring-white shadow-lg">
                    {pictureURL ? (
                      <img
                        src={pictureURL}
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-3xl font-bold text-blue-600">
                        {user?.data?.fullname}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-full" />

                    {/* Hover Edit Indicator */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 p-2 rounded-full">
                        <Camera className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Info Section */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="space-y-1 mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {user.data?.fullname || "Name"}
                    </h3>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-500">
                      <Mail className="w-4 h-4" />
                      <p className="text-sm">{user.data?.email || "Email"}</p>
                    </div>
                  </div>

                  {/* Profile Completion Status */}
                  {userDetails?.data?.length === 0 && (
                    <div className="flex flex-col gap-2">
                      <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                        <InfoIcon className="w-4 h-4 text-blue-600" />
                        Complete your profile to unlock more features
                      </p>
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
              </div>
            </CardContent>
          </Card>
          <div className="mb-4 mt-3">
            {userDetails.data.length === 0 ? (
              // Show Step3 component when no user details are available
              <EducationalDetailsComp userId={user.data.id} />
            ) : (
              // Show education details when user details exist
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 justify-between text-black">
                {userDetails.data.map((user:any) => (
                  <React.Fragment key={user?.id}>
                    <div className="border rounded-lg shadow-sm flex justify-between bg-card text-card-foreground sm:px-6 p-4">
                      <div>
                        <h4 className="text-md mb-2 font-bold">
                          12th Standard
                        </h4>
                        <p className="text-gray-700">
                          <span className="font-semibold">School Name:</span>{" "}
                          {user.twelfthSchoolName}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Board:</span>{" "}
                          {user.twelfthSchoolBoard}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Passing Year:</span>{" "}
                          {new Date(user.twelfthPassingYear).getFullYear()}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Percentage:</span>{" "}
                          {user.twelfthPercentage}%
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Specialization:</span>{" "}
                          {user.twelfthSpecialization}
                        </p>
                      </div>
                      <Twelfth twelfth={twelfthData.data[0]} userId={user.id} />
                    </div>

                    <div className="rounded-lg flex justify-between border bg-card text-card-foreground shadow-sm sm:px-6 p-4">
                      <div>
                        <h4 className="text-md mb-2 font-bold">
                          10th Standard
                        </h4>
                        <p className="text-gray-700">
                          <span className="font-semibold">School Name:</span>{" "}
                          {user.tenthSchoolName}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Board:</span>{" "}
                          {user.tenthSchoolBoard}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Passing Year:</span>{" "}
                          {new Date(user.tenthPassingYear).getFullYear()}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Percentage:</span>{" "}
                          {user.tenthPercentage}%
                        </p>
                      </div>
                      <Tenth tenth={tenthData.data[0]} userId={user.id} />
                    </div>

                    <div className="rounded-lg flex justify-between border bg-card text-card-foreground shadow-sm sm:px-6 p-4">
                      <div>
                        <h4 className="text-md mb-2 font-bold">Graduation</h4>
                        <p className="text-gray-700">
                          <span className="font-semibold">Institution:</span>{" "}
                          {user.graduationInstitution}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Course Done:</span>{" "}
                          {user.courseDone}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Percentage:</span>{" "}
                          {user.graduationPercentage}%
                        </p>
                      </div>
                      <Graduation
                        graducation={graduationData.data[0]}
                        userId={user.id}
                      />
                    </div>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
          {/* <EducationalDetail userDetails = {userDetails} user={user} graduationData={graduationData} twelfthData={twelfthData} tenthData={tenthData} /> */}
        </div>
      </main>
    </section>
  );
};

export default EducationalDetails;
