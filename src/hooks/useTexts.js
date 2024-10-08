import { useQuery } from "@tanstack/react-query";
import { getBlogText } from "../services/getAPIs";

export function useTexts() {
  const {
    isLoading,
    error,
    data: blogData,
    fetchStatus,
  } = useQuery({
    queryKey: ["blogsText"],
    queryFn: getBlogText,
  });

  return { isLoading, error, blogData, fetchStatus };
}
