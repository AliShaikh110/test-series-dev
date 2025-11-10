import { Disclosure, DisclosurePanel } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import useToggleState from "@/lib/use-toggle-state";
import { useFormStatus } from "react-dom";
import { cn } from "@/utils/cn";
import { Badge } from "@/components/ui/badge";
// import { BottomGradient } from "../register";

type AccountInfoProps = {
  label: string;
  currentInfo: string | React.ReactNode;
  isSuccess?: boolean;
  isError?: boolean;
  errorMessage?: string;
  clearState: () => void;
  children?: React.ReactNode;
  isLoading:boolean
  disable:boolean
};

const AccountInfo = ({
  label,
  currentInfo,
  isSuccess,
  isError,
  clearState,
  isLoading,
  disable=false,
  errorMessage = "An error occurred, please try again",
  children,
}: AccountInfoProps) => {
  const { state, close, toggle } = useToggleState();

  const handleToggle = () => {
    clearState();
    setTimeout(() => toggle(), 100);
  };

  useEffect(() => {
    if (isSuccess) {
      close();
    }
  }, [isSuccess, close]);

  return (
    <div className="text-sm relative my-3">
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <span className=" text-dark capitalize text-lg font-semibold">
            {label}
          </span>
          <div className="flex items-center flex-1 basis-0 justify-end gap-x-4">
            {typeof currentInfo === "string" ? (
              <span className="text-gray-500 text-base">{currentInfo}</span>
            ) : (
              currentInfo
            )}
          </div>
        </div>
        <div>
          <Button
            variant="outline"
            className="w-[100px] min-h-[25px] py-1 z-20 bg-dark text-white hover:bg-dark/85"
            onClick={handleToggle}
            type={state ? "reset" : "button"}
          >
            {state ? "Cancel" : "Edit"}
          </Button>
        </div>
      </div>

      {/* Success state */}
      <Disclosure>
        <DisclosurePanel
          static
          className={cn(
            "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
            {
              "max-h-[1000px] opacity-100": isSuccess,
              "max-h-0 opacity-0": !isSuccess,
            }
          )}
        >
          <Badge className="p-2 my-4 bg-green" color="green">
            <span>{label} updated successfully</span>
          </Badge>
        </DisclosurePanel>
      </Disclosure>

      <Disclosure>
        <DisclosurePanel
          static
          className={cn(
            "transition-[max-height,opacity] duration-300 ease-in-out overflow-visible",
            {
              "max-h-[1000px] opacity-100": state,
              "max-h-0 opacity-0": !state,
            }
          )}
        >
          <div className="flex flex-col gap-y-2 py-4 z-10 ">
            <div>{children}</div>
            <div className="flex items-center justify-end mt-2">
              <Button
                disabled={isLoading || disable}
                className="w-full small:max-w-[140px]"
                type="submit"
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
                    ></path>
                  </svg>
                ) : (
                  <>update</>
                )}{" "}
              </Button>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
};

export default AccountInfo;
