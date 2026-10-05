import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import { ThemeProvider } from "@/context/ThemeContext";

const PokedexPage = lazy(() => import("@/pages/PokedexPage"));
const CapturedPage = lazy(() => import("./pages/CapturedPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<PokedexPage />} />
                <Route path="captured" element={<CapturedPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const RouteFallback = () => {
  return (
    <div
      className="grid min-h-screen place-items-center bg-stone-50 dark:bg-slate-950"
      role="status"
    >
      <div className="size-10 animate-spin rounded-full border-4 border-stone-200 border-t-red-600" />
      <span className="sr-only">Loading page…</span>
    </div>
  );
};
