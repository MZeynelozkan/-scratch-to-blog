import { useState } from "react";
import SimpleForm from "../form/SimpleForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../../services/postAPI";
import { useSelector } from "react-redux";
import { getUserId } from "../../services/userSlice";
import toast from "react-hot-toast";

function BlogBox({ blog  }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const { id, text } = blog;
  const queryClient = useQueryClient();

  const { mutate: deleteFn, isPending } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("Blog Text Deleted");

      queryClient.invalidateQueries(["blogsText"]);
    },
  });

  const userID = useSelector(getUserId);

  // Cache'deki verilere erişmek için getQueryData kullanımı
  const cachedBlogs = queryClient.getQueryData(["blogsText"]);

  const userIds = cachedBlogs.map((blog) => blog.userId);
  const isYourPost = userIds.includes(userID);

  function handleDelete() {
    deleteFn(id);
  }

  return (
    <div className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg p-6 min-h-[100px]">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{`Blog ID: ${id}`}</h2>
      <p className="text-gray-600 break-words">{text}</p>
      {isYourPost && (
        <>
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className="bg-red-300 px-3 rounded-md mt-4"
          >
            Düzenle
          </button>
          {isEditMode && (
            <SimpleForm
              setIsEditMode={setIsEditMode}
              id={id}
              isEditMode={isEditMode}
            />
          )}
          <button onClick={handleDelete}>Sil</button>
        </>
      )}
    </div>
  );
}

export default BlogBox;
