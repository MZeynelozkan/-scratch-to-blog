import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { loginUser } from "../../services/postAPI"; // loginUser işlevini kullan
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import FormInputs from "../../ui/FormInputs";

function LoginForm() {
  const navigate = useNavigate(); // useNavigate hook'unu kullanın

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success("you logged in");
      navigate("/");
    },
    onError: () => toast.error("Lutfen gecerli hesap giriniz"),
  });

  function onSubmit(data) {
    mutate(data);
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email:
          </label>
          <FormInputs
            id="email"
            type="email"
            register={register}
            errors={errors}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password:
          </label>
          <FormInputs
            id="password"
            type="password"
            register={register}
            errors={errors}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
