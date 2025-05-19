"use client";

import { useState } from "react";

// umdlib
import Facet from "@/components/umdlib/Facet";

function FaccetLayout({ facets, onFilterAppied }) {
  const [activeValues, setActiveValues] = useState({});

  const handleFacetChange = (facetKey, value) => {
    setActiveValues((prevValues) => {
      const newValues = {
        ...prevValues,
        [facetKey]: value,
      };
      onFilterAppied(newValues);
      return newValues;
    });
  };

  // If no facets or empty array, show a message
  if (!facets || facets.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <p className="text-gray-500">currently no filters available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {facets.map((facet) => (
        <Facet
          key={facet.key}
          facet={facet}
          activeValues={activeValues[facet.key] || []}
          onChange={(values) => handleFacetChange(facet.key, values)}
        />
      ))}
    </div>
  );
}

export default FaccetLayout;
