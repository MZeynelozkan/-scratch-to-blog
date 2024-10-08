import { useForm } from "react-hook-form";
import { postNewBlogText, updateCurrentPost } from "../../services/postAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getUserId } from "../../services/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FormInputs from "../../ui/FormInputs";
import { useState } from "react";

function SimpleForm({ isEditMode, id, setIsEditMode }) {
  const queryClient = useQueryClient();
  const userId = useSelector(getUserId);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // image aldik ve selected imageyi setledik

  function handleImageChange(e) {
    const image = e.target.files[0];
    setSelectedImage(image);
  }

  // mutate fonksiyonumuzu ayarladik
  const { mutate: createData } = useMutation({
    mutationKey: ["createBlogText"], // Add a unique key for the mutation
    mutationFn: postNewBlogText,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogsText"] });
      reset();

      toast.success("Blog Text Inserted");

      navigate("/");
    },
    onError: (error) => {
      // Optionally handle errors here
      toast.error("Error inserting blog text");
    },
  });

  const { mutate: updateData } = useMutation({
    mutationFn: updateCurrentPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogsText"] });
      toast.success("Blog Text Uptaded");
      reset();
      setIsEditMode(false);
    },
  });

  // react hook formdaki objeyi direkt olarak kullanarak data submitliyoruz
  async function onSubmit(data) {
    const postData = { ...data, id, userId };
    if (isEditMode) {
      updateData(postData);
    } else {
      createData({ ...postData, img: selectedImage });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto p-4 bg-white shadow-md rounded-lg"
    >
      <label
        htmlFor="imageUpload"
        className="block text-gray-700 font-medium mb-2"
      >
        Upload Image
      </label>
      <input type="file" id="imageUpload" onChange={handleImageChange} />

      <label
        htmlFor="textTitle"
        className="block text-gray-700 font-medium mb-2"
      >
        Enter Title:
      </label>
      <FormInputs
        id="textTitle"
        type="text"
        register={register}
        errors={errors}
      />
      <label htmlFor="text" className="block text-gray-700 font-medium mb-2">
        Enter Text:
      </label>
      <FormInputs id="text" type="text" register={register} errors={errors} />

      <input
        hidden
        id="simpleInput"
        type="user_id"
        defaultValue={userId}
        {...register("user_id", { required: true })}
        className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors.text ? "border-red-500" : ""
        }`}
        placeholder="Type something..."
      />

      {errors.text && (
        <span className="text-red-500 text-sm">This field is required</span>
      )}

      {isEditMode && <input type="hidden" value={id} {...register("id")} />}

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
