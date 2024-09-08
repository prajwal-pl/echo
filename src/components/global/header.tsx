"use client";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

interface HeaderProps {
  initialSearch?: string;
}

export const Header: React.FC<HeaderProps> = ({ initialSearch = "" }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>(initialSearch);

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.length > 0) {
      router.push(`/browse-rooms?search=${encodeURIComponent(search)}`);
    } else {
      router.push("/browse-rooms");
    }
  };

  const handleClear = () => {
    setSearch("");
    router.push("/browse-rooms");
  };

  return (
    <header className="border-b border-neutral-600 max-w-screen sticky top-0 bg-white dark:bg-black z-10">
      <div className="py-3 md:py-4 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-1 border rounded-full px-4 text-neutral-700 dark:text-neutral-200"
        >
          <SearchIcon />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by tags or name..."
            className="w-full px-2 py-2 md:px-4 rounded-full outline-none bg-inherit placeholder:text-neutral-700 placeholder:dark:text-neutral-200 placeholder:w-full"
          />
        </form>
        <Button variant="ghost" onClick={handleClear}>
          Clear
        </Button>
      </div>
    </header>
  );
};
