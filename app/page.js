import SearchLayout from "@/components/layout/SearchLayout";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen max-w-screen-2xl mx-auto">
      <h1 className="text-4xl font-bold mt-8 mb-6 px-6">Search Demo</h1>
      <SearchLayout />

      {/* <SearchArea /> */}
    </div>
  );
}
