"use client";

// shadcn/ui
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { useState, useEffect, useRef } from "react";

// api call
import fetchResult from "@/lib/api/search";

// umdlib
import SearchBox from "@/components/form/SearchBox";
import FaccetLayout from "./FacetLayout";
import ResultLayout from "./ResultLayout";

function SearchLayout() {
  // initiate api call
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState({});

  // render results
  const [loading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  // render status
  const isFirstRender = useRef(true);

  const handleSearch = async (searchTerm, activeFilter) => {
    setLoading(true);
    try {
      console.log("Fetching data with search term:", searchTerm);
      console.log("Fetching data with active filter:", activeFilter);
      const data = await fetchResult({
        query: searchTerm,
        filter: activeFilter,
      });
      console.log("Fetched data:", data);
      setFetchedData(data);
      setLoading(false);
    } catch (error) {
      // handle error
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (searchTerm && searchTerm.trim() !== "") {
      handleSearch(searchTerm, activeFilter);
    }
  }, [searchTerm, activeFilter]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col items-center justify-center px-6 mb-6">
        <SearchBox onSearchTerm={setSearchTerm} />
      </div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25}>
          <div className="flex flex-col h-full w-full px-6 pb-6">
            <div className="facets">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div>
                  <FaccetLayout
                    facets={fetchedData?.facets}
                    onFilterAppied={setActiveFilter}
                  />
                </div>
              )}
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex h-full w-full px-6 pb-6">
            <div className="content w-full">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div>
                  <ResultLayout results={fetchedData?.search_results} />
                </div>
              )}
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
export default SearchLayout;
