import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { userValidationSchemaForRegister } from "../schema/userValidationSchema";
import { toast } from "react-toastify";
import Button from "./ui/Button";

export default function RegistrationForm() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialValues = { username: "", email: "", password: "" };

  const handleSubmit = async (values, { setSubmitting }) => {
    const res = await register(values);
    setSubmitting(false);

    if (res.ok) {
      navigate("/login");
    } else {
      // a backend itt result.message-ben hozza a hibát (nálad így nézett ki)
      toast.error(
        res.message?.error || res.message || "Hiba a regisztrációnál!"
      );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={userValidationSchemaForRegister}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6 max-w-md mx-auto mt-6 mb-10">
          <div>
            <label className="block text-sm mb-3 font-medium text-black">
              Felhasználónév
            </label>
            <Field
              name="username"
              type="text"
              required
              className="w-full border rounded-xl px-4 py-2 bg-c-primary/10 border-c-secondary-darkest/30 focus:outline-none focus:ring-2 focus:ring-c-primary/50 "
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-c-warning text-sm mt-1"
            />
          </div>

          <div>
            <label className="block text-sm mb-3 font-medium text-black">
              Email
            </label>
            <Field
              name="email"
              type="email"
              required
              className="w-full border rounded-xl px-4 py-2 bg-c-primary/10 border-c-secondary-darkest/30 focus:outline-none focus:ring-2 focus:ring-c-primary/50 "
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-c-warning text-sm mt-1"
            />
          </div>

          <div>
            <label className="block text-sm mb-3 font-medium text-black">
              Jelszó
            </label>
            <Field
              name="password"
              type="password"
              required
              className="w-full border rounded-xl px-4 py-2 bg-c-primary/10 border-c-secondary-darkest/30 focus:outline-none focus:ring-2 focus:ring-c-primary/50 "
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-c-warning text-sm mt-1"
            />
          </div>

          <Button type="submit" disabled={isSubmitting} block>
            Regisztráció
          </Button>

          <p className="text-sm text-center mt-2 text-gray-400">
            Már van fiókod?{" "}
            <Link
              to="/login"
              className="text-c-secondary-dark hover:text-c-secondary-light"
            >
              Jelentkezz be
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}
