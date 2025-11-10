"use client";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TenthCard = (userId: any) => {
  const [metric, setMetric] = useState({
    tenthBoadName: "",
    tenthPassingYear: "",
    tenthSchoolName: "",
    tenthPercentage: null,
  });

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        // Fetch boards




        // Fetch metric details
        const url2 = `https://admin.onlyeducation.co.in/api/user-details?filters[users_permissions_user][id][$eq]=${userId.userId}&fields[0]=tenthSchoolBoard&fields[1]=tenthPassingYear&fields[2]=tenthSchoolName&fields[3]=tenthPercentage`;
        const tenthDetails = await fetchData(url2, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (tenthDetails.data) {
          setMetric({
            tenthBoadName: tenthDetails.data.tenthSchoolBoard,
            tenthPassingYear: tenthDetails.data.tenthPassingYear,
            tenthSchoolName: tenthDetails.data.tenthSchoolName,
            tenthPercentage: tenthDetails.data.tenthPercentage,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (userId) {
      fetchDataAsync();
    }
  }, [userId, metric]); // Removed unnecessary dependencies like `metric`

  return (
    <div>
      <h2>Tenth Card</h2>
      {metric.tenthBoadName ? (
        <div>
          <p>Board Name: {metric.tenthBoadName}</p>
          <p>Passing Year: {metric.tenthPassingYear}</p>
          <p>School Name: {metric.tenthSchoolName}</p>
          <p>Percentage: {metric.tenthPercentage}</p>
        </div>
      ) : (
        <p>Loading details...</p>
      )}
    </div>
  );
};

export default TenthCard;
