import React, { useState, useCallback, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fetchCachedData } from "@/utils/utils";
import debounce from "lodash.debounce";

const SEARCH_THRESHOLD = 3; 
const DEBOUNCE_DELAY = 300;

interface CityOption {
  id: number;
  attributes: {
    title: string;
    slug: string;
  };
}

const CitySelector = ({ value, onChange, error }: any) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState<CityOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedFetchCities = useCallback(
    debounce(async (search: string) => {
      if (search.length >= SEARCH_THRESHOLD) {
        setIsLoading(true);
        try {
          // Updated query to use proper Strapi filters
          const cityQuery = `/api/cities?populate=*&filters[title][$containsi]=${encodeURIComponent(search.trim())}&pagination[pageSize]=20`;
          
          const response = await fetchCachedData(cityQuery);
          
          if (response && response.data) {
            setCities(response.data);
          } else {
            console.error('Invalid response format:', response);
            setCities([]);
          }
        } catch (error) {
          console.error("Error fetching cities:", error);
          setCities([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setCities([]);
      }
    }, DEBOUNCE_DELAY),
    []
  );

  useEffect(() => {
    return () => {
      debouncedFetchCities.cancel();
    };
  }, [debouncedFetchCities]);

  const handleSearchChange = (search: string) => {
    const cleanedSearch = search.trim();
    setSearchTerm(cleanedSearch);
    if (cleanedSearch.length >= SEARCH_THRESHOLD) {
      debouncedFetchCities(cleanedSearch);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between py-4 h-12",
            error ? "border-red-500" : ""
          )}
        >
          {value || "Select city..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search cities..."
            value={searchTerm}
            onValueChange={handleSearchChange}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>
              {searchTerm.length < SEARCH_THRESHOLD ? (
                `Type ${SEARCH_THRESHOLD} or more characters to search...`
              ) : isLoading ? (
                "Loading..."
              ) : cities.length === 0 ? (
                "No cities found."
              ) : null}
            </CommandEmpty>
            <CommandGroup>
              {cities.map((city:any) => (
                <CommandItem
                  key={city.id}
                  value={city.title}
                  onSelect={(currentValue) => {
                    onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  {city.title}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === city.title ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CitySelector;