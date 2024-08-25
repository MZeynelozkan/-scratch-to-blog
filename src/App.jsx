import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
// import MainPage from "./pages/MainPage";
import AppLayout from "./ui/AppLayout";
// import BlogsForm from "./pages/BlogsForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import SignUp from "./pages/SignUp";
// import LoginPage from "./pages/LoginPage";
// import SecretPage from "./pages/SecretPage";
import { Toaster } from "react-hot-toast";
import { NavbarSimple } from "./ui/NavbarNew";

const MainPage = lazy(() => import("./pages/MainPage"));
const BlogsForm = lazy(() => import("./pages/BlogsForm"));
const SignUp = lazy(() => import("./pages/SignUp"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SecretPage = lazy(() => import("./pages/SecretPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <BrowserRouter>
        <Suspense
          fallback={
            <div className="h-dvh">
              <NavbarSimple />
            </div>
          }
        >
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<MainPage />} />
              <Route path="typeblogs" element={<BlogsForm />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="login" element={<LoginPage />} />
            </Route>
            <Route path="secret" element={<SecretPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
