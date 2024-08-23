import { useForm } from "react-hook-form";
import { postNewBlogText, updateCurrentPost } from "../../services/postAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function SimpleForm({ isEditMode, id, setIsEditMode }) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate: createData } = useMutation({
    mutationFn: postNewBlogText,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogsText"] });
      reset();
      setIsEditMode(false);
    },
  });

  const { mutate: updateData } = useMutation({
    mutationFn: updateCurrentPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogsText"] });
      reset();
      setIsEditMode(false);
    },
  });

  async function onSubmit(data) {
    if (isEditMode && id) {
      updateData(data);
    } else {
      createData(data);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto p-4 bg-white shadow-md rounded-lg"
    >
      <label
        htmlFor="simpleInput"
        className="block text-gray-700 font-medium mb-2"
      >
        Enter Text:
      </label>
      <input
        id="simpleInput"
        type="text"
        {...register("text", { required: true })}
        className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors.text ? "border-red-500" : ""
        }`}
        placeholder="Type something..."
      />
      {errors.text && (
        <span className="text-red-500 text-sm">This field is required</span>
      )}

      {isEditMode && (
        <>
          <input
            hidden
            type="id"
            defaultValue={id}
            {...register("id")}
            placeholder="Type something..."
          />
        </>
      )}
      <button
        type="submit"
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Submit
      </button>
    </form>
  );
}

export default SimpleForm;
