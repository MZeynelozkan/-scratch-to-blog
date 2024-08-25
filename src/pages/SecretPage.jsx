import Navbar from "../ui/Navbar";
import LoginForm from "../features/form/LoginForm";
import { NavbarSimple } from "../ui/NavbarNew";

function SecretPage() {
  return (
    <div>
      <NavbarSimple />

      <main className="mt-8 px-9">
        <LoginForm />
      </main>
    </div>
  );
}

export default SecretPage;
