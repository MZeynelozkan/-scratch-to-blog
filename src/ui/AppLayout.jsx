import { Outlet } from "react-router-dom";
import { NavbarSimple } from "./NavbarNew";

function AppLayout() {
  return (
    <div>
      <NavbarSimple />
      <main className="mt-20 px-9">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
