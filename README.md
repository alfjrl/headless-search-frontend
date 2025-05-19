This project is a research prototype using Next.js to implement a frontend for the search API for the Digital Collections at UMD Libraries.

It leverages [Tailwind CSS](https://tailwindcss.com/) for styling and [shadcn/ui](https://ui.shadcn.com/) for UI components.

## Getting Started

Once you have cloned the repository to your local machine, install the dependencies by running:

```bash
npm install
```

To start the development server, run one of the following commands:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

### API

- **API Proxy (`app/api/proxy`)**: Handles external API requests on the server side, acting as a proxy between the frontend and external services.
- **Search Function (`lib/api/search`)**: Provides an interface for the frontend to perform search operations, abstracting the details of API calls and response handling.

It currently uses the test api for the score.

### Data Flow

- **Search Term:** The user enters a query in the search box, which sends the term to the search layout.
- **Filter:** When a facet is selected, the facet layout updates and communicates the selected filters to the search layout.
- **Search Result:** The search layout processes the search term and filters, then passes the results to the result layout for display.

The search layout serves as the central hub, handling API requests and ensuring that both the facet layout and result layout receive updated data in response to user actions.
