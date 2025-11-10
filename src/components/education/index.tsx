"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateGraduationSchema,
  updateGraduationAction,
} from "@/data/actions/update-user-actions";
import { useRouter } from "next/navigation";

interface GraduationProps {
  graducation: {
    graduationInstitution: string;
    courseDone: string;
    graduationPercentage: number;
  };
  userId: number;
}

export interface IGraduationInput {
  graduationInstitution: string;
  courseDone: string;
  graduationPercentage: number;
}

const Graduation = ({ graducation, userId }: GraduationProps) => {

  const [isLoading, setIsLoading] = useState(false);
  const [strapiError, setStrapiError] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IGraduationInput>({
    resolver: zodResolver(updateGraduationSchema),
    defaultValues: {
      graduationInstitution: graducation.graduationInstitution,
      courseDone: graducation.courseDone,
      graduationPercentage: Number(graducation.graduationPercentage),
    },
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<IGraduationInput> = async (data) => {
    setIsLoading(true);
    const res = await updateGraduationAction(userId, data);
    if (!res.success) {
      setStrapiError(res.strapiErrors);
    } else {
      toast.success(res.message);
      setTimeout(() => {
        router.refresh();
      }, 800);
    }
    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:text-accent-foreground h-10 px-4 w-[100px] min-h-[25px] py-1 z-20 bg-dark text-white hover:bg-dark/85">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[70%]">
        <DialogHeader>
          <DialogTitle>Graduation Details</DialogTitle>
          <DialogDescription>
            {`Make changes to your profile here. Click save when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4 md:grid-cols-2 grid-cols-1">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="graduationInstitution" className="text-right col-span-1">
                Institution Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="graduationInstitution"
                  {...register("graduationInstitution")}
                  className={
                    errors.graduationInstitution ? "border-red-500 " : ""
                  }
                />
                {errors.graduationInstitution && (
                  <p className="text-red-500 text-xs font-medium">
                    {errors.graduationInstitution.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="courseDone" className="text-right col-span-1">
                Course
              </Label>
              <div className="col-span-3">
                <Input
                  id="courseDone"
                  {...register("courseDone")}
                  className={errors.courseDone ? "border-red-500 " : ""}
                />
                {errors.courseDone && (
                  <p className="text-red-500 text-xs font-medium">
                    {errors.courseDone.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="graduationPercentage" className="text-right col-span-1">
                Percentage
              </Label>
              <div className="col-span-3">

                <Input
                  id="graduationPercentage"
                  type="number"
                  step="any"
                  {...register("graduationPercentage", {
                    valueAsNumber: true,
                  })}
                  className={
                    errors.graduationPercentage
                      ? "border-red-500 "
                      : ""
                  }
                />
                {errors.graduationPercentage && (
                  <p className="text-red-500 text-xs font-medium ">
                    {errors.graduationPercentage.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
          {strapiError && <p className="text-red-500">{strapiError}</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Graduation;
