const fetchResult = async ({ query, filter }) => {
  try {
    const params = new URLSearchParams();
    console.log("Search query:", query);
    console.log("Search filter:", filter);

    if (filter) {
      let i = 0;
      Object.entries(filter).forEach(([facet, values]) => {
        values.forEach((value) => {
          params.append(`f[${i}]`, `${facet}:${value}`);
          i++;
        });
      });
    }

    params.append("q", query);

    console.log("Search params:", params.toString());

    const res = await fetch(`/api/proxy?${params}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error details:", error);
  }
};
export default fetchResult;
