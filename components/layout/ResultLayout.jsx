"use client";

// shadcn/ui
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ResultLayout({ results }) {
  // If no search results or empty array, show a message
  if (!results || results.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <p className="text-gray-500">currently no results available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {results.map((result) => (
        <Card key={result.id} className="h-fit gap-0">
          <CardHeader>
            <CardTitle className="text-lg">{result.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center">{result.composer}</li>
              <li className="flex items-center">
                {result.collection_dictionary}
              </li>
              <li className="flex items-center">{result.id}</li>
            </ul>
          </CardContent>
          <CardFooter>{result.footer}</CardFooter>
        </Card>
      ))}
    </div>
  );
}
export default ResultLayout;
