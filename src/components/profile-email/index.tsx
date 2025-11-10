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
import { updateEmailAction, updateEmailSchema } from "@/data/actions/update-user-actions";

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
};

export interface IEmailInput {
  id: number;
  email: string;
}

type MyInformationProps = {
  user: UserType;
};

const ProfileEmail = ({ user }: MyInformationProps) => {
  const [successState, setSuccessState] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [strapiError, setStrapiError] = useState<string | null>(null);
  const clearState = () => {
    setSuccessState(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IEmailInput>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: {
      id: user.data?.id,
      email: user.data?.email,
    },
  });

 

  const onSubmit: SubmitHandler<IEmailInput> = async (data) => {
    setIsLoading(true); // Start loading
    const res = await updateEmailAction(INITIAL_STATE, data);
    setIsLoading(false); // End loading
    if (res?.message) {
      setStrapiError(res.message);
    } else {
      toast.success("Email updated successfully");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full rounded-lg border bg-card text-card-foreground shadow-sm mb-6 sm:px-6 p-4"
    >
      <AccountInfo
        disable={false}
        isLoading={isLoading}
        label="Email"
        currentInfo={
          user.data
            ? `${user?.data.email}`
            : "couldn't fetch data please try later"
        }
        isSuccess={false}
        isError={true}
        clearState={clearState}
      >
        <div className="grid grid-cols-1 gap-y-2">
          {/* <Input hidden {...register("id")} /> */}
          <div className="mb-4">
            <Label htmlFor="email">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              defaultValue={user.data?.email}
              type="email"
              autoComplete="email"
              placeholder="projectmayhem@fc.com"
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-xs font-medium">
                {errors.email.message}
              </p>
            )}
          </div>
          <StrapiErrors error={strapiError} />
        </div>
      </AccountInfo>
    </form>
  );
};

export default ProfileEmail;
