import ListElemets from "./ListElemets";
import Logo from "./Logo";

function Navbar() {
  // This Navbar has only one task: Navigate to Pages.
  return (
    <div className="flex items-center w-full p-9 bg-slate-400 justify-between">
      <Logo />
      <ul className="flex space-x-4 font-bold">
        <ListElemets />
      </ul>
    </div>
  );
}

export default Navbar;
