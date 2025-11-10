"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BookOpen,
  Check,
  ChevronsUpDown,
  GraduationCap,
  Router,
  School,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/utils/cn";
import { fetchCachedData } from "@/utils/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import * as React from "react";
import DatePicker from "react-datepicker";
import { Checkbox } from "@/components/ui/checkbox";

import "react-datepicker/dist/react-datepicker.css";
import { createUserDetail } from "@/data/actions/update-user-actions";
import { useRouter } from "next/navigation";

const Step3Schema = z.object({
  hasGraduation: z.boolean().default(false),
  graduationCollege: z.string().optional(),
  course: z.string().optional(),
  graduationPercentage: z.number().optional(),
  tenthBoard: z.string().nonempty("Please select your 10th board."),
  tenthYear: z.date({
    required_error: "Please select the 10th passing year.",
  }),
  tenthPercentage: z.number().min(0).max(100, "Invalid percentage."),
  tenthSchool: z.string().min(1, "Please enter your 10th school name."),
  twelfthBoard: z.string().nonempty("Please select your 12th board."),
  twelfthYear: z.date({
    required_error: "Please select the 12th passing year.",
  }),
  twelfthPercentage: z.number().min(0).max(100, "Invalid percentage."),
  twelfthSchool: z.string().min(1, "Please enter your 12th school name."),
  twelfthSpecialization: z.string().min(1, "Please enter your 12th specialization."),
})
.superRefine((data, ctx) => {
  // Validate graduation fields only if hasGraduation is true
  if (data.hasGraduation) {
    if (!data.graduationCollege || data.graduationCollege.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter your graduation college/institute.",
        path: ["graduationCollege"],
      });
    }
    
    if (!data.course || data.course.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter your course.",
        path: ["course"],
      });
    }
    
    if (typeof data.graduationPercentage !== 'number' || 
        data.graduationPercentage < 0 || 
        data.graduationPercentage > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid percentage.",
        path: ["graduationPercentage"],
      });
    }
  }

  // Validate 10th and 12th year difference
  const { tenthYear, twelfthYear } = data;
  const differenceInMonths =
    (twelfthYear.getFullYear() - tenthYear.getFullYear()) * 12 +
    (twelfthYear.getMonth() - tenthYear.getMonth());
    
  if (differenceInMonths < 12) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "There should be a minimum of 1-year difference between 10th and 12th passing years.",
      path: ["twelfthYear"],
    });
  }
});

export type Step3FormValues = z.infer<typeof Step3Schema>;

interface Data {
  data: {
    id: number;
    title: string;
    slug: string;
    courseFullForm: string;
    fullForm?: string;
  }[];
}
[];

// Define the Zod schema for validation

// interface Props {
//   nextStep: any;
//   formData: any;
//   handleSubmitUserInformation: any;
// }
interface Board {
  data: {
    id: number;
    title: string;
    slug: string;
    fullForm: string;
  }[];
}
[];

export function EducationalDetailsComp(userId: any) {
  const form = useForm({
    resolver: zodResolver(Step3Schema),
    defaultValues: {
      hasGraduation: false,
      graduationCollege: "",
      course: "",
      graduationPercentage: 0,
      tenthBoard: "",
      tenthYear: "",
      tenthSchool: "",
      tenthPercentage: 0,
      twelfthBoard: "",
      twelfthYear: "",
      twelfthSchool: "",
      twelfthSpecialization: "",
      twelfthPercentage: 0,
    }
  });
  const router = useRouter();
    const userIdValue = userId.userId;

  const  onSubmit = async(data: any)=> {

    const payload = {
      data:{
        graduationInstitution: data.graduationCollege,
        courseDone: data.course,
        graduationPercentage: data.graduationPercentage,
        tenthSchoolBoard: data.tenthBoard,
        tenthPassingYear: data.tenthYear, // Fixed incorrect value (was tenthBoard)
        tenthPercentage: data.tenthPercentage,
        tenthSchoolName: data.tenthSchool,
        twelfthSchoolBoard: data.twelfthBoard,
        twelfthPassingYear: data.twelfthYear, // Fixed typo: "twefthPassingYear" -> "twelfthPassingYear"
        twelfthPercentage: data.twelfthPercentage,
        twelfthSchoolName: data.twelfthSchool, 
        users_permissions_user: {
          connect: [userIdValue]
        }, // Corrected: Use user ID directly
      },
    };
  
    const response = await createUserDetail(userId, payload);
    if(response.data){
      router.refresh();
    }
    // graduationData(userId,payload);
  }
  const [courses1, setCourses1] = useState<Data>();

  const [tenthYear, setTenthYear] = useState<Date | null>();
  const [twelfthYear, setTwelfthYear] = useState<Date | null>();

  const [courses2, setCourses2] = useState<Board>();
  const [tenthBoards, settenthBoards] = useState<Board>();

  const [tenthOpen, setTenthOpen] = useState(false);
  const [tenthValue, setTenthValue] = useState("");
  const [selectedBoard, setSelectedBoard] = useState("");

  const [twelfthOpen, setTwelfthOpen] = useState(false);
  const [twelfthValue, setTwelfthValue] = useState("");
  // const [university, setuniversity] = useState<Data>();

  const [courseOpen, setCourseOpen] = useState(false);
  const [courseValue, setCourseValue] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  // const [uniOpen, setUniOpen] = useState(false);
  // const [uniValue, setUniValue] = useState("");

  useEffect(() => {
    getCourse1();
    getCourse2();
  }, []);
  const getCourse1 = async () => {
    const data = await fetchCachedData(
      "/api/coursees?fields[0]=title&pagination[pageSize]=700"
    );
    setCourses1(data);
  };
  const getCourse2 = async () => {
    const data = await fetchCachedData(
      "/api/tweelth-boards?fields[0]=title&fields[1]=slug&fields[2]=fullForm"
    );
    setCourses2(data);
    const tenthData = await fetchCachedData(
      "/api/tenth-boards?fields[0]=title&fields[1]=slug&fields[2]=fullForm"
    );
    settenthBoards(tenthData);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-8 p-6 bg-white rounded-lg shadow-lg">
            {/* Heading Section */}
            <div className="flex items-center space-x-3 border-b border-gray-200 pb-4">
              <div className="bg-green-50 p-2 rounded-lg">
                <School className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  10th Standard Details
                </h2>
                <p className="text-sm text-gray-500">
                  Enter your 10th standard information
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="tenthBoard"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-semibold text-gray-700">
                      Board <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Popover open={tenthOpen} onOpenChange={setTenthOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={tenthOpen}
                            className="w-full h-10 px-3 justify-between bg-gray-50 hover:bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                          >
                            {tenthValue
                              ? tenthBoards?.data.find(
                                  (item) => item.slug === tenthValue
                                )?.fullForm
                              : "Select Board"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0 shadow-xl border border-gray-200">
                          <Command>
                            <CommandInput
                              placeholder="Search boards..."
                              className="h-10 border-0 focus:ring-0"
                            />
                            <CommandList>
                              <CommandEmpty>No board found.</CommandEmpty>
                              <CommandGroup className="max-h-64 overflow-y-auto">
                                {tenthBoards?.data.map((item) => (
                                  <CommandItem
                                    key={item.id}
                                    value={item.slug}
                                    onSelect={(currentValue) => {
                                      setTenthValue(
                                        currentValue === tenthValue
                                          ? ""
                                          : currentValue
                                      );
                                      setSelectedBoard(item.fullForm);
                                      setTenthOpen(false);
                                      field.onChange(currentValue);
                                    }}
                                    className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        tenthValue === item.slug
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    <div className="flex flex-col">
                                      <span className="font-medium">
                                        {item.fullForm}
                                      </span>
                                      <span className="text-xs text-gray-500">
                                        [{item.title}]
                                      </span>
                                    </div>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    {selectedBoard && (
                      <div className="mt-2 p-2 bg-green-50 rounded-md text-sm text-green-700 flex items-center">
                        <Check className="h-4 w-4 mr-2" />
                        Selected: {selectedBoard}
                      </div>
                    )}
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tenthYear"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-semibold text-gray-700">
                      Passing Date <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DatePicker
                          selected={tenthYear}
                          onChange={(date) => {
                            setTenthYear(date);
                            field.onChange(date ?? undefined);
                          }}
                          dateFormat="dd/MM/yyyy"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          placeholderText="DD/MM/YYYY"
                          isClearable
                          maxDate={new Date()}
                          minDate={new Date("1990-01-01")}
                          className="w-full h-10 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 pr-10"
                          customInput={
                            <Input className="w-full h-10 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200" />
                          }
                        />
                        <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </FormControl>
                    {tenthYear && (
                      <div className="mt-1 text-sm text-green-600 flex items-center">
                        <Check className="h-4 w-4 mr-1" />
                        Selected: {tenthYear.toLocaleDateString("en-GB")}
                      </div>
                    )}
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tenthSchool"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-semibold text-gray-700">
                      School Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter school name"
                        className="h-10 px-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tenthPercentage"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-sm font-semibold text-gray-700">
                        Percentage <span className="text-red-500">*</span>
                      </FormLabel>
                      <div className="px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        {field.value ? field.value + "%" : "0%"}
                      </div>
                    </div>
                    <FormControl>
                      <div className="px-2">
                        <Slider
                          onValueChange={(value) => field.onChange(value[0])}
                          max={100}
                          step={1}
                          defaultValue={[field.value || 50]}
                          className="h-2"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* 12th Standard Details */}
          {/* <div className="mt-8"> */}
          {/* <h3 className="text-base font-semibold">12th Standard Details</h3> */}
          <div className="space-y-8 p-6 bg-white rounded-lg shadow-lg mt-8">
            {/* Heading Section */}
            <div className="flex items-center space-x-3 border-b border-gray-200 pb-4">
              <div className="bg-purple-50 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  12th Standard Details
                </h2>
                <p className="text-sm text-gray-500">
                  Enter your 12th standard information
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="twelfthBoard"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-semibold text-gray-700">
                      Board <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Popover open={twelfthOpen} onOpenChange={setTwelfthOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={twelfthOpen}
                            className="w-full h-10 px-3 justify-between bg-gray-50 hover:bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                          >
                            {twelfthValue
                              ? courses2?.data.find(
                                  (item) => item.slug === twelfthValue
                                )?.fullForm
                              : "Select Board"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0 shadow-xl border border-gray-200">
                          <Command>
                            <CommandInput
                              placeholder="Search boards..."
                              className="h-10 border-0 focus:ring-0"
                            />
                            <CommandList>
                              <CommandEmpty>No board found.</CommandEmpty>
                              <CommandGroup className="max-h-64 overflow-y-auto">
                                {courses2?.data.map((item) => (
                                  <CommandItem
                                    key={item.id}
                                    value={item.slug}
                                    onSelect={(currentValue) => {
                                      setTwelfthValue(
                                        currentValue === twelfthValue
                                          ? ""
                                          : currentValue
                                      );
                                      setSelectedBoard(item.fullForm);
                                      setTwelfthOpen(false);
                                      field.onChange(currentValue);
                                    }}
                                    className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        twelfthValue === item.slug
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    <div className="flex flex-col">
                                      <span className="font-medium">
                                        {item.fullForm}
                                      </span>
                                      <span className="text-xs text-gray-500">
                                        [{item.title}]
                                      </span>
                                    </div>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    {selectedBoard && (
                      <div className="mt-2 p-2 bg-purple-50 rounded-md text-sm text-purple-700 flex items-center">
                        <Check className="h-4 w-4 mr-2" />
                        Selected: {selectedBoard}
                      </div>
                    )}
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="twelfthYear"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-semibold text-gray-700">
                      Passing Date <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DatePicker
                          selected={twelfthYear}
                          onChange={(date) => {
                            setTwelfthYear(date);
                            field.onChange(date ?? undefined);
                          }}
                          dateFormat="dd/MM/yyyy"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          placeholderText="DD/MM/YYYY"
                          isClearable
                          maxDate={new Date()}
                          minDate={new Date("1990-01-01")}
                          className="w-full h-10 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 pr-10"
                        />
                        <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </FormControl>
                    {twelfthYear && (
                      <div className="mt-1 text-sm text-purple-600 flex items-center">
                        <Check className="h-4 w-4 mr-1" />
                        Selected: {twelfthYear.toLocaleDateString("en-GB")}
                      </div>
                    )}
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="twelfthSchool"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-semibold text-gray-700">
                      School Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter school name"
                        className="h-10 px-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="twelfthSpecialization"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-semibold text-gray-700">
                      Specialization <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="twelthSpecialization"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="twelfthPercentage"
                render={({ field }) => (
                  <FormItem className="space-y-4 col-span-2">
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-sm font-semibold text-gray-700">
                        Percentage <span className="text-red-500">*</span>
                      </FormLabel>
                      <div className="px-4 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                        {field.value ? field.value + "%" : "0%"}
                      </div>
                    </div>
                    <FormControl>
                      <div className="px-2">
                        <Slider
                          onValueChange={(value) => field.onChange(value[0])}
                          max={100}
                          step={1}
                          defaultValue={[field.value || 50]}
                          className="h-2"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              </div>
               {/* graduation */}
               <div className="w-full">
                    <FormField
                      control={form.control}
                      name="hasGraduation"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0 ">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>I have completed graduation</FormLabel>
                        </FormItem>
                      )}
                    />

                  {form.watch("hasGraduation") && (
                  <div className="space-y-8 p-6 bg-white rounded-lg shadow-lg">
                    {/* Heading Section */}
                    <div className="flex items-center space-x-3 border-b border-gray-200 pb-4">
                      <div className="bg-blue-50 p-2 rounded-lg">
                        <GraduationCap className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">
                          Graduation Details
                        </h2>
                        <p className="text-sm text-gray-500">
                          Enter your graduation information
                        </p>
                      </div>
                    </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="graduationCollege"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-semibold text-gray-700">
                            Graduation College/Institute
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter your college name"
                              className="h-10 px-3 rounded-md border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="course"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-semibold text-gray-700">
                            Course
                          </FormLabel>
                          <FormControl>
                            <Popover open={courseOpen} onOpenChange={setCourseOpen}>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={courseOpen}
                                  className="w-full h-10 px-3 justify-between bg-gray-50 hover:bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                >
                                  {courseValue
                                    ? courses1?.data?.find(
                                        (item) => item.title === courseValue
                                      )?.title
                                    : "Select Course"}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0 shadow-xl border border-gray-200">
                                <Command>
                                  <CommandInput
                                    placeholder="Search courses..."
                                    className="h-10 border-0 focus:ring-0"
                                  />
                                  <CommandList>
                                    <CommandEmpty>No courses found.</CommandEmpty>
                                    <CommandGroup className="max-h-64 overflow-y-auto">
                                      {courses1?.data?.map((item) => (
                                        <CommandItem
                                          key={item.id}
                                          value={item.title}
                                          onSelect={(currentValue) => {
                                            setCourseValue(
                                              currentValue === courseValue
                                                ? ""
                                                : currentValue
                                            );
                                            setSelectedCourse(item.title);
                                            setCourseOpen(false);
                                            field.onChange(currentValue);
                                          }}
                                          className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              courseValue === item.title
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                          <div className="flex flex-col">
                                            <span className="font-medium">
                                              {item.title}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                              {item.title}
                                            </span>
                                          </div>
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          {selectedCourse && (
                            <div className="mt-2 p-2 bg-blue-50 rounded-md text-sm text-blue-700 flex items-center">
                              <Check className="h-4 w-4 mr-2" />
                              Selected: {selectedCourse}
                            </div>
                          )}
                          <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="graduationPercentage"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-sm font-semibold text-gray-700">
                            Graduation Percentage
                          </FormLabel>
                          <div className="px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {field.value ? field.value + "%" : "0%"}
                          </div>
                        </div>
                        <FormControl>
                          <div className="px-2">
                            <Slider
                              onValueChange={(value) => field.onChange(value[0])}
                              max={100}
                              step={1}
                              defaultValue={[field.value || 50]}
                              className="h-2"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                
              )}
              </div>
            </div> 
              <div className="flex justify-end">
                <Button type="submit" >Submit</Button>
              </div>
          {/* </div> */}
          {/* <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div> */}
          {/* </div> */}
        </form>
      </Form>
    </div>
  );
}
