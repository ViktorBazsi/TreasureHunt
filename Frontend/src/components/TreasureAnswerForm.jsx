import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import treasureService from "../services/treasure.service";
import Button from "./ui/Button";

const validationSchema = Yup.object({
  answer: Yup.string().required("Kérlek, add meg a válaszod!"),
});

function TreasureAnswerForm({ treasureId, disabled, onSuccess }) {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await treasureService.checkAnswer(treasureId, values.answer);
      const message = res.message;

      if (message?.toLowerCase().includes("helyes")) {
        toast.success(message);
        resetForm();
        onSuccess?.();
      } else {
        toast.warning("❌ Helytelen válasz. Próbáld újra!");
      }
    } catch (err) {
      const backendMessage =
        err?.response?.data?.message || err?.response?.data?.error;
      toast.error(backendMessage || "Valami hiba történt.");
    } finally {
      setSubmitting(false);
    }
  };

  if (disabled) {
    return (
      <p className="text-green-600 font-semibold">
        Ez a kincs már meg van nyitva!
      </p>
    );
  }

  return (
    <Formik
      initialValues={{ answer: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div className="text-left">
            <label
              htmlFor="answer"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Válasz
            </label>
            <Field
              name="answer"
              type="text"
              placeholder="Írd be a válaszod..."
              className="w-full rounded-xl px-3 py-2
                bg-white text-gray-800 placeholder-gray-400
                border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500
                transition"
            />
            <ErrorMessage
              name="answer"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2"
          >
            Beküldés
          </Button>
        </Form>
      )}
    </Formik>
  );
}
export default TreasureAnswerForm;
