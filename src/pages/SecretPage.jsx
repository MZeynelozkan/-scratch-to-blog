import Navbar from "../ui/Navbar";
import LoginForm from "../features/form/LoginForm";

function SecretPage() {
  return (
    <div>
      <Navbar />

      <main className="mt-8 px-9">
        <LoginForm />
      </main>
    </div>
  );
}

export default SecretPage;
