import { NavLink } from "react-router-dom";

function ListElemets() {
  return (
    <>
      <NavLink to="/">Blog Yazilari</NavLink>
      <NavLink to="/typeblogs">Blog Yazisiz Yaz</NavLink>
    </>
  );
}

export default ListElemets;
