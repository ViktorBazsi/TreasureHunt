import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <main className="section min-h-screen flex items-center justify-center">
      <div className="w-full max-w-xl bg-c-primary-light/5 p-10 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-black">
          Bejelentkezés
        </h1>
        <LoginForm />
      </div>
    </main>
  );
}
