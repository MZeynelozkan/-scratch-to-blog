import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userLogout } from "../services/userSlice";
import { logout } from "../services/postAPI";

function NavList() {
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
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <NavLink
          to="/"
          className="flex items-center hover:text-blue-500 transition-colors"
        >
          Blog Yazilari
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <NavLink
          to="/typeblogs"
          className="flex items-center hover:text-blue-500 transition-colors"
        >
          Blog Yaz
        </NavLink>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        {pathname === "/secret" ? (
          <>
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-medium"
            >
              <NavLink
                to="/signup"
                className="flex items-center hover:text-blue-500 transition-colors"
              >
                Kayit Ol
              </NavLink>
            </Typography>
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-medium"
            >
              <NavLink
                to="/login"
                className="flex items-center hover:text-blue-500 transition-colors"
              >
                Giris Yap
              </NavLink>
            </Typography>
          </>
        ) : null}
      </Typography>

      {isAuth && (
        <Button
          onClick={handleLogout}
          className="flex items-center hover:text-blue-500 transition-colors self-end"
        >
          Logout
        </Button>
      )}
    </ul>
  );
}

export function NavbarSimple() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="mx-auto max-w-[1700px] px-6 py-3">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography as="a" variant="h6" className="mr-4 cursor-pointer py-1.5">
          Zeynel's Blog
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
