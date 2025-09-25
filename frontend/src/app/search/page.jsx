"use client";
import { useSearchParams } from "next/navigation";
import SearchResults from "../components/SearchResults";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const organ = searchParams.get("organ") || "";
  const city = searchParams.get("city") || "";

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchResults organ={organ} city={city} />
    </div>
  );
}
