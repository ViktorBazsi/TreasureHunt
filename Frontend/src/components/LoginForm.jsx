import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import {
  userValidationSchemaForLoginEmail,
  userValidationSchemaForLoginName,
} from "../schema/userValidationSchema";
import Button from "./ui/Button";

export default function LoginForm() {
  const { login, authMsg, showAuthMsg } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const handleSubmit = async (values, { setSubmitting }) => {
    const { identifier, password } = values;

    const credentials = identifier.includes("@")
      ? { email: identifier, password }
      : { username: identifier, password };

    const result = await login(credentials);
    setSubmitting(false);

    if (result.ok) {
      navigate(redirectTo);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 mb-10">
      {authMsg.show && (
        <div
          className={`text-sm text-center mb-4 font-medium ${
            authMsg.success ? "text-green-600" : "text-c-warning"
          }`}
        >
          {authMsg.msg}
        </div>
      )}

      <Formik
        initialValues={{ identifier: "", password: "" }}
        validate={async (values) => {
          const { identifier, password } = values;
          const schemaValues = identifier.includes("@")
            ? { email: identifier, password }
            : { username: identifier, password };
          const schema = identifier.includes("@")
            ? userValidationSchemaForLoginEmail
            : userValidationSchemaForLoginName;

          try {
            await schema.validate(schemaValues, { abortEarly: false });
            return {};
          } catch (err) {
            const errors = {};
            err.inner.forEach((ve) => {
              if (["username", "email"].includes(ve.path)) {
                errors.identifier = ve.message;
              } else {
                errors[ve.path] = ve.message;
              }
            });
            return errors;
          }
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div>
              <label className="block mb-3 font-semibold text-black">
                Felhasználónév vagy e-mail
              </label>
              <Field
                name="identifier"
                type="text"
                placeholder="pl. kukori vagy kukori@email.com"
                className="w-full border rounded-xl px-4 py-2 bg-c-primary/10 border-c-secondary-darkest/30 focus:outline-none focus:ring-2 focus:ring-c-primary/50"
              />
              <ErrorMessage
                name="identifier"
                component="div"
                className="text-c-warning text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-3 font-semibold text-black">Jelszó</label>
              <Field
                name="password"
                type="password"
                placeholder="Jelszó"
                className="w-full border rounded-xl px-4 py-2 bg-c-primary/10 border-c-secondary-darkest/30 focus:outline-none focus:ring-2 focus:ring-c-primary/50 "
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-c-warning text-sm mt-1"
              />
            </div>

            <Button type="submit" block disabled={isSubmitting}>
              Bejelentkezés
            </Button>

            <div className="text-center mt-4 text-sm text-gray-400">
              Nincs még profilod?{" "}
              <Link
                to={`/register`}
                onClick={() => showAuthMsg(false)}
                className="font-medium text-c-secondary-dark hover:text-c-secondary-light"
              >
                Regisztrálj!
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
