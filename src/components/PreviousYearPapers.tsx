"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Lock, Star, Search, Filter, RefreshCw } from "lucide-react";

interface PYQData {
  id: string;
  title: string;
  papersCount: number;
  language: string;
  accessLevel: "easy" | "moderate" | "hard";
  category: string;
}

const pyqData: PYQData[] = [
  { id: "1", title: "SSC CGL PYQs (2016–2024)", papersCount: 48, language: "EN | HI", accessLevel: "easy", category: "SSC & Govt" },
  { id: "2", title: "IBPS PO PYQs (2015–2024)", papersCount: 26, language: "EN | HI", accessLevel: "moderate", category: "Banking" },
  { id: "3", title: "UPSC Prelims PYQs (2011–2024)", papersCount: 28, language: "EN", accessLevel: "hard", category: "Civil Services" },
  { id: "4", title: "CUET UG PYQs (2022–2024)", papersCount: 14, language: "EN | HI", accessLevel: "moderate", category: "CUET" },
  { id: "5", title: "RRB NTPC PYQs (2016–2024)", papersCount: 35, language: "EN | HI", accessLevel: "easy", category: "Railways" },
  { id: "6", title: "SBI PO PYQs (2014–2024)", papersCount: 22, language: "EN | HI", accessLevel: "moderate", category: "Banking" },
];

const categories = [
  "All",
  "SSC & Govt",
  "Banking",
  "Railways",
  "Teaching",
  "Civil Services",
  "MBA",
  "CUET",
  "State PCS",
];

const accessBadgeClass: Record<PYQData["accessLevel"], string> = {
  easy: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  moderate: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  hard: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
};

const accessLabel: Record<PYQData["accessLevel"], string> = {
  easy: "Easy",
  moderate: "Moderate",
  hard: "Hard",
};

export default function PreviousYearPapers() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"relevance" | "papers_desc" | "title_asc">("relevance");

  const filtered = useMemo(() => {
    const list = pyqData.filter((item) => {
      const inCategory = selectedCategory === "All" || item.category === selectedCategory;
      const inQuery = !query.trim() || item.title.toLowerCase().includes(query.toLowerCase());
      return inCategory && inQuery;
    });

    switch (sortBy) {
      case "papers_desc":
        return [...list].sort((a, b) => b.papersCount - a.papersCount);
      case "title_asc":
        return [...list].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return list; // relevance keeps original order or score-based in future
    }
  }, [selectedCategory, query, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setQuery("");
    setSortBy("relevance");
  };

  return (
    <section className="w-full py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Previous Year Papers (PYQs)</h2>
            <p className="mt-1 text-sm text-muted-foreground md:text-base">
              Solve authentic PYQs across 1000+ exams. Attempt online with solutions or download PDFs.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={resetFilters}>
              <RefreshCw className="mr-2 h-4 w-4" />Reset
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 space-y-4">
          <div className="flex flex-col items-stretch gap-3 sm:flex-row">
            <div className="relative w-full sm:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label="Search PYQs"
                placeholder="Search exams, e.g. UPSC, SSC, IBPS..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
              <SelectTrigger className="w-full sm:w-56" aria-label="Sort by">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="papers_desc">Most papers</SelectItem>
                <SelectItem value="title_asc">Title A–Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category chips */}
          <ScrollArea className="whitespace-nowrap">
            <div className="flex items-center gap-2 pb-2">
              {categories.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <Button
                    key={cat}
                    type="button"
                    className={`h-8 rounded-full px-3 text-xs md:h-9 md:px-4 md:text-sm hover:text-white ${active ? 'bg-blue-700' : 'bg-white text-black'} ${active ? "shadow" : ""}`}
                    aria-pressed={active}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <Separator className="my-6" />

        {/* Results summary */}
        <div className="mb-4 text-sm text-muted-foreground">
          Showing <span className="font-medium">{filtered.length}</span> result{filtered.length !== 1 ? "s" : ""}
          {selectedCategory !== "All" && (
            <>
              {" "}in <span className="font-medium">{selectedCategory}</span>
            </>
          )}
          {query && (
            <>
              {" "}for query <span className="font-medium">“{query}”</span>
            </>
          )}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg border p-10 text-center">
            <Search className="mb-2 h-6 w-6 text-muted-foreground" />
            <h3 className="text-base font-medium">No matches found</h3>
            <p className="mt-1 text-sm text-muted-foreground">Try changing filters or using a different search term.</p>
            <div className="mt-4 flex gap-2">
              <Button size="sm" onClick={resetFilters}>Clear filters</Button>
              <Button size="sm" variant="outline" onClick={() => setQuery("")}>Clear search</Button>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((pyq) => (
            <Card key={pyq.id} className="transition-shadow hover:shadow-md">
              <CardHeader className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="line-clamp-2 text-base font-semibold leading-snug md:text-lg">{pyq.title}</h3>
                  <Badge
                    variant="outline"
                    className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] md:text-xs ${accessBadgeClass[pyq.accessLevel]}`}
                  >
                    {pyq.accessLevel === "hard" && <Star className="h-3 w-3" />}
                    {accessLabel[pyq.accessLevel]}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground md:text-sm">
                  <Badge variant="default" className="rounded-full bg-[#dcfce7] text-black">{pyq.category}</Badge>
                  <span>•</span>
                  <span>Language: <span className="font-medium text-foreground">{pyq.language}</span></span>
                  <span>•</span>
                  <span>Papers: <span className="font-medium text-foreground">{pyq.papersCount}</span></span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Attempt timed tests with instant explanations. Track accuracy & speed across years.
                </p>
              </CardContent>
              <CardFooter className="flex flex-col md:flex md:flex-row gap-2">
                <Button className="flex-1">
                  <Lock className="mr-2 h-4 w-4" /> Attempt Online
                </Button>
                {/* <Button variant="outline" className="flex-1">
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button> */}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Footer helper */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          Tip: Use search + category to narrow down, then sort by paper count for comprehensive practice.
        </div>
      </div>
    </section>
  );
}
