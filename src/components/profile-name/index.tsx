"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import AccountInfo from "../account-info";
import { UserType } from "@/types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { StrapiErrors } from "@/components/StrapiErrors";
import { updateUserDetailsAction, updateUserDetailsSchema } from "@/data/actions/update-user-actions";

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
};

export interface INameInput {
  id: number;
  fullname: string;
}

type MyInformationProps = {
  user: UserType;
};

const ProfileName = ({ user }: MyInformationProps) => {
  const [successState, setSuccessState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [strapiError, setStrapiError] = useState<string | null>(null);
  const clearState = () => {
    setSuccessState(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INameInput>({
    resolver: zodResolver(updateUserDetailsSchema),
    defaultValues: {
      id: user.data?.id,
      fullname: user.data?.fullname,
    },
  });
  let id = user.data?.id;
  const onSubmit: SubmitHandler<INameInput> = async (data) => {
    setIsLoading(true); 
    const res = await updateUserDetailsAction(id, data);
    setIsLoading(false); 
    if (res?.message) {
      setStrapiError(res.message);
    } else {
      toast.success("Name updated successfully");
    }
  };

  return (
    <>
    {/* <LinkByGallery />  */}
    <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-lg border bg-card text-card-foreground shadow-sm mb-6 sm:px-6 p-4">
      <AccountInfo
        disable={false}
        isLoading={isLoading}
        label="Name"
        currentInfo={
          user.data
            ? `${user.data.fullname}`
            : "couldn't fetch data please try later"
        }
        isSuccess={false}
        isError={true}
        clearState={clearState}
      >
        <div className="grid grid-cols-2 gap-x-4 ">
          <div>
         
            <Label htmlFor="firstName">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="John"
              {...register("fullname")}
              className={errors.fullname ? "border-red-500" : ""}
            />
            {errors.fullname && (
              <p className="text-red-500 text-xs font-medium">
                {errors.fullname.message}
              </p>
            )}
          </div>
       
        </div>
        <StrapiErrors error={strapiError} />
      </AccountInfo>
    </form>
    </>
  );
};

export default ProfileName;
