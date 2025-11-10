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
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateTenthSchema,
  updateTenthAction,
} from "@/data/actions/update-user-actions";
import { CalendarIcon } from "lucide-react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
interface TenthProps {
  tenth: {
    tenthSchoolName: string;
    tenthSchoolBoard: string;
    tenthPercentage: number;
    tenthPassingYear: string;
  };
  userId: number;
}

export interface ITenthInput {
  tenthSchoolName: string;
  tenthSchoolBoard: string;
  tenthPercentage: number;
  tenthPassingYear: string;
}

export function Tenth({ tenth, userId }: TenthProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [strapiError, setStrapiError] = useState<string | undefined>(undefined);
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITenthInput>({
    resolver: zodResolver(updateTenthSchema),
    defaultValues: {
      tenthSchoolName: tenth.tenthSchoolName,
      tenthSchoolBoard: tenth.tenthSchoolBoard,
      tenthPercentage: Number(tenth.tenthPercentage),
      tenthPassingYear: tenth.tenthPassingYear,
    },
  });

  const onSubmit: SubmitHandler<ITenthInput> = async (data) => {
    setIsLoading(true);
    const res = await updateTenthAction(userId, data);
    setIsLoading(false);
    if (!res.success) {
      setStrapiError(res.strapiErrors);
    } else {
      toast.success(res.message);
      setTimeout(() => {
        router.refresh();
      }, 500);
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
          <DialogTitle>Tenth Details</DialogTitle>
          <DialogDescription>
            {`Make changes to your profile here. Click save when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4 md:grid-cols-2 grid-cols-1">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tenthSchoolName" className="text-right col-span-1">
                Institution Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="tenthSchoolName"
                  {...register("tenthSchoolName")}
                  className={
                    errors.tenthSchoolName ? "border-red-500 " : ""
                  }
                />
                {errors.tenthSchoolName && (
                  <p className="text-red-500 text-xs font-medium ">
                    {errors.tenthSchoolName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tenthSchoolBoard" className="text-right col-span-1">
                Board
              </Label>
              <div className="col-span-3">
                <Input
                  id="tenthSchoolBoard"
                  {...register("tenthSchoolBoard")}
                  className={
                    errors.tenthSchoolBoard ? "border-red-500 " : ""
                  }
                />
                {errors.tenthSchoolBoard && (
                  <p className="text-red-500 text-xs font-medium ">
                    {errors.tenthSchoolBoard.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tenthPercentage" className="text-right col-span-1">
                Percentage
              </Label>
              <div className="col-span-3">

                <Input
                  id="tenthPercentage"
                  type="number"
                  step="any"
                  {...register("tenthPercentage", {
                    valueAsNumber: true,
                  })}
                  className={
                    errors.tenthPercentage
                      ? "border-red-500 "
                      : ""
                  }
                />

                {errors.tenthPercentage && (
                  <p className="text-red-500 text-xs font-medium ">
                    {errors.tenthPercentage.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tenthPassingYear" className="text-right col-span-1">
                Passing Year
              </Label>
              <div className="relative col-span-3">
                <div className="relative col-span-3 border rounded-sm">
                  <Controller
                    name="tenthPassingYear"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        id="tenthPassingYear"
                        selected={field.value ? new Date(field.value) : null}
                        onChange={(date: Date | null) =>
                          field.onChange(
                            date ? date.toISOString().split("T")[0] : ""
                          )
                        }
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Pick a date"
                        className={`w-full p-2 pl-10 text-left font-normal outline-none ${errors.tenthPassingYear ? "border-red-500" : ""
                          }`}
                      />
                    )}
                  />
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-400" />
                </div>

                {errors.tenthPassingYear && (
                  <p className="text-red-500 text-xs font-medium">
                    {errors.tenthPassingYear.message}
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
}
