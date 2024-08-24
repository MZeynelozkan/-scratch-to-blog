import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AppLayout from "./ui/AppLayout";
import BlogsForm from "./pages/BlogsForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SignUp from "./pages/SignUp";
import LoginPage from "./pages/LoginPage";
import SecretPage from "./pages/SecretPage";

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
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<MainPage />} />
            <Route path="typeblogs" element={<BlogsForm />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<LoginPage />} />
          </Route>
          <Route path="secret" element={<SecretPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
