import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function AppLayout() {
  return (
    <div>
      <Navbar />

      <main className="mt-8 px-9">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
