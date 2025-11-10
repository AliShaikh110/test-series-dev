"use client";
import React, {  useState } from "react";
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
  updateTwelfthSchema,
  updateTwelfthAction,
} from "@/data/actions/update-user-actions";
import { CalendarIcon } from "lucide-react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
interface TwelfthProps {
  twelfth: {
    twelfthSchoolName: string;
    twelfthSchoolBoard: string;
    twelfthPercentage: number;
    twelfthPassingYear: string;
    twelfthSpecialization: string;
  };
  userId: number;
}

export interface ITwelfthInput {
  twelfthSchoolName: string;
  twelfthSchoolBoard: string;
  twelfthPercentage: number;
  twelfthPassingYear: string;
  twelfthSpecialization: string;
}

const Twelfth = ({ twelfth, userId }: TwelfthProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [strapiError, setStrapiError] = useState<string | undefined>(undefined);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITwelfthInput>({
    resolver: zodResolver(updateTwelfthSchema),
    defaultValues: {
      twelfthSchoolName: twelfth.twelfthSchoolName,
      twelfthSchoolBoard: twelfth.twelfthSchoolBoard,
      twelfthPercentage: Number(twelfth.twelfthPercentage),
      twelfthPassingYear: twelfth.twelfthPassingYear,
      twelfthSpecialization: twelfth.twelfthSpecialization,
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<ITwelfthInput> = async (data) => {
    setIsLoading(true);
    
    const res = await updateTwelfthAction(userId, data);
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
        <Button
          variant="outline"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:text-accent-foreground h-10 px-4 w-[100px] min-h-[25px] py-1 z-20 bg-dark text-white hover:bg-dark/85"
        >
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[70%]">
        <DialogHeader>
          <DialogTitle>Twelfth</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4 md:grid-cols-2 grid-cols-1">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="twelfthSchoolName"
                className="text-right col-span-1"
              >
                Institution Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="twelfthSchoolName"
                  {...register("twelfthSchoolName")}
                  className={errors.twelfthSchoolName ? "border-red-500 " : ""}
                />
                {errors.twelfthSchoolName && (
                  <p className="text-red-500 text-xs font-medium ">
                    {errors.twelfthSchoolName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="twelfthSchoolBoard"
                className="text-right col-span-1"
              >
                Board
              </Label>
              <div className="col-span-3">
                <Input
                  id="twelfthSchoolBoard"
                  {...register("twelfthSchoolBoard")}
                  className={errors.twelfthSchoolBoard ? "border-red-500 " : ""}
                />
                {errors.twelfthSchoolBoard && (
                  <p className="text-red-500 text-xs font-medium ">
                    {errors.twelfthSchoolBoard.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="twelfthPercentage"
                className="text-right col-span-1"
              >
                Percentage
              </Label>
              <div className="col-span-3">
                <Input
                  id="twelfthPercentage"
                  type="number"
                  step="any"
                  {...register("twelfthPercentage", {
                    valueAsNumber: true,
                  })}
                  className={errors.twelfthPercentage ? "border-red-500 " : ""}
                />
                {errors.twelfthPercentage && (
                  <p className="text-red-500 text-xs font-medium ">
                    {errors.twelfthPercentage.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="twelfthPassingYear"
                className="text-right col-span-1"
              >
                Passing Year
              </Label>

              <div className="relative col-span-3 border rounded-sm">
                <div>
                  <Controller
                    name="twelfthPassingYear"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        id="twelfthPassingYear"
                        selected={field.value ? new Date(field.value) : null}
                        onChange={(date: Date | null) =>
                          field.onChange(
                            date ? date.toISOString().split("T")[0] : ""
                          )
                        }
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Pick a date"
                        className={`w-full p-2 pl-10 text-left font-normal outline-none ${
                          errors.twelfthPassingYear ? "border-red-500" : ""
                        }`}
                      />
                    )}
                  />
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-400" />
                </div>
                {errors.twelfthPassingYear && (
                  <p className="text-red-500 text-xs font-medium col-span-4">
                    {errors.twelfthPassingYear.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="twelfthSpecialization"
                className="text-right col-span-1"
              >
                Specialization
              </Label>
              <div className="col-span-3">
                <Input
                  id="twelfthSpecialization"
                  {...register("twelfthSpecialization")}
                  className={
                    errors.twelfthSpecialization ? "border-red-500 " : ""
                  }
                />
                {errors.twelfthSpecialization && (
                  <p className="text-red-500 text-xs font-medium ">
                    {errors.twelfthSpecialization.message}
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

export default Twelfth;
