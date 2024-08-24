import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NavLink, useLocation } from "react-router-dom";
import { logout } from "../services/postAPI";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../services/userSlice";

function ListElements() {
  // "ListElemets" yerine "ListElements" olarak düzeltilmiştir.
  const queryClient = useQueryClient();

  const userStatus = useSelector((state) => state.user.status);
  const isAuth = userStatus === "authenticated";

  const dispatch = useDispatch();

  const { mutate: logoutFn } = useMutation({
    mutationFn: logout,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["blogsText"],
      }),
  });

  function handleLogout() {
    logoutFn();
    dispatch(userLogout());
  }

  const { pathname } = useLocation();
  return (
    // "return" ifadesi eklenmiştir.
    <>
      <NavLink to="/">Blog Yazilari</NavLink>
      <NavLink to="/typeblogs">Blog Yazisiz Yaz</NavLink>

      {pathname === "/secret" ? (
        <>
          <NavLink to="/signup">Kayit Ol</NavLink>
          <NavLink to="/login">Giris yap</NavLink>
        </>
      ) : null}

      {isAuth && <button onClick={handleLogout}>Logout</button>}
    </>
  );
}

export default ListElements;
