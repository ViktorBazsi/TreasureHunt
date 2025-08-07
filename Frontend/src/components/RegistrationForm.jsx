import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { userValidationSchemaForRegister } from "../schema/userValidationSchema";
import { toast } from "react-toastify";

export default function RegistrationForm() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const res = await register(values);
    setSubmitting(false);

    if (res.ok) {
        navigate("/login");
    } else {
        toast.error(res.message.error || "Hiba a regisztrációnál!");
    }
    console.log(res)
};


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={userValidationSchemaForRegister}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Felhasználónév</label>
            <Field
              name="username"
              type="text"
              required
              className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-600 text-sm mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <Field
              name="email"
              type="email"
              required
              className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-600 text-sm mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Jelszó</label>
            <Field
              name="password"
              type="password"
              required
              className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-600 text-sm mt-1"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-3 rounded-2xl hover:bg-gray-800 transition"
          >
            Regisztráció
          </button>

          <p className="text-sm text-center mt-2">
            Már van fiókod?{" "}
            <a href="/login" className="underline text-black">
              Jelentkezz be
            </a>
          </p>
        </Form>
      )}
    </Formik>
  );
}
