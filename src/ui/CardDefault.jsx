import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getUserId } from "../services/userSlice";
import { deletePost } from "../services/postAPI";
import SimpleForm from "../features/form/SimpleForm";

export function CardDefault({ blog }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const { id, text, textTitle, imagePath } = blog;
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
    <Card className="mt-6 w-full max-w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={`https://ubdkewhszfatpktidcvx.supabase.co/storage/v1/object/public/avatars/${imagePath}`}
          alt="card-image"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {textTitle}
        </Typography>
        <Typography>{text}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        {isYourPost && (
          <div className="space-x-6">
            <Button onClick={() => setIsEditMode(!isEditMode)}>Edit</Button>
            <Button onClick={handleDelete}>Delete</Button>
            {isEditMode && (
              <SimpleForm
                setIsEditMode={setIsEditMode}
                id={id}
                isEditMode={isEditMode}
              />
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
