import { Separator } from "@/components/ui/separator";
import React from "react";

export default function AccountSetting(){
  return (
    <section>     
      <main className="flex-1 overflow-y-auto sm:p-8 p-4 bg-gray-100 h-screen">
            <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-dark">Account Settings</h2>

            <div className="border  rounded-lg p-4 shadow-sm text-dark bg-white my-3">
                <div className="sm:p-5 p-1">
                  <div className="font-semibold text-sm md:text-base pb-3 flex justify-between">
                    {" "}
                    Email Communications

                    <label className="relative inline-flex cursor-pointer items-center">
                    <input id="switch" type="checkbox" className="peer sr-only"defaultChecked />
                    <label htmlFor="switch" className="hidden"></label>
                    <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-orange-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                  </label>
                  </div>
                  <Separator />
                  <div className="font-semibold text-sm md:text-base pb-3 flex justify-between items-center mt-4">
                    {" "}
                    SMS Communications
                    <label className="relative inline-flex cursor-pointer items-center">
                    <input id="switch" type="checkbox" className="peer sr-only"defaultChecked />
                    <label htmlFor="switch" className="hidden"></label>
                    <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-orange-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                  </label>
                  </div>

              
                </div>
              </div>
        </div> 
      </main>
    </section>
  );
}

