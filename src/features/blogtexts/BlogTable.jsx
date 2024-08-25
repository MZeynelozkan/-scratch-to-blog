import { CardDefault } from "../../ui/CardDefault";
import { useTexts } from "./useTexts";

function BlogTable() {
  const { isLoading, error, blogData, fetchStatus } = useTexts();

  if (isLoading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-5 text-red-500">Error loading blogs.</div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {blogData?.map((blog) => (
          <CardDefault key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

export default BlogTable;
