export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const baseUrl = "https://digital-test.lib.umd.edu/api/search/scores";

  try {
    const fullUrl = `${baseUrl}?${searchParams.toString()}`;

    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "NextJS-Proxy",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Proxy data:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch data",
        message: error.message,
      }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }
}
