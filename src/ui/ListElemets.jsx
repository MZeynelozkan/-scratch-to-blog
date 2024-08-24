import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { logout } from "../services/postAPI";

function ListElemets() {
  const queryClient = useQueryClient();

  const { mutate: logoutFn } = useMutation({
    mutationFn: logout,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["blogsText"],
      }),
  });

  function handleLogout() {
    logoutFn();
  }

  return (
    <>
      <NavLink to="/">Blog Yazilari</NavLink>
      <NavLink to="/typeblogs">Blog Yazisiz Yaz</NavLink>
      <NavLink to="/signup">Kayit Ol</NavLink>
      <NavLink to="/login">Giris yap</NavLink>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default ListElemets;
