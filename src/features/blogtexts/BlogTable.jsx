import { CardDefault } from "../../ui/CardDefault";
import BlogBox from "./BlogBox";
import { useTexts } from "./useTexts";

function BlogTable() {
  const { isLoading, error, blogData, fetchStatus } = useTexts();
  const isFetching = fetchStatus === "fetching";

  if (isLoading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  if (isFetching) {
    return <div className="text-center p-5">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-5 text-red-500">Error loading blogs.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
      {blogData?.map((blog) => (
        <CardDefault key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default BlogTable;
