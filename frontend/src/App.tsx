import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoadingDialog } from "./components/dialog";

const queryClient = new QueryClient();

const routes = [
  {
    async lazy() {
      const comp = await import("./components/auth-layout");
      return { Component: comp.default };
    },
    children: [
      {
        index: true,
        async lazy() {
          const comp = await import("./pages/stocks");
          return { Component: comp.default };
        },
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: "/",
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={router}
        fallbackElement={
          <div className="relative h-screen bg-gradient-to-b from-[#1EA6A2] to-[#0E519B]">
            <h1>Paddles </h1>
            <p className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 animate-pulse items-center justify-center text-center text-2xl text-white">
              <Loader2 className="text-write mr-3 h-8 w-8 animate-spin" />
              <span>Loading......</span>
            </p>
          </div>
        }
      />
      <LoadingDialog />
    </QueryClientProvider>
  );
}

export default App;
