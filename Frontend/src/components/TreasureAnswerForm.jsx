import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import treasureService from "../services/treasure.service";

const validationSchema = Yup.object({
  answer: Yup.string().required("Kérlek, add meg a válaszod!"),
});

function TreasureAnswerForm({ treasureId, disabled, onSuccess }) {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await treasureService.checkAnswer(treasureId, values.answer);
      const message = res.message;

      if (message === "Helyes válasz!") {
        toast.success(message);
        resetForm();

        // ✅ Jelzés a szülő komponensnek, hogy sikeres
        if (onSuccess) onSuccess();
      } else {
        toast.warning("❌ Helytelen válasz. Próbáld újra!");
      }
    } catch (err) {
      toast.error(`Hiba: ${err.message}`);
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
          <div>
            <label htmlFor="answer" className="block font-medium">
              Válasz:
            </label>
            <Field
              name="answer"
              type="text"
              className="w-full border rounded-md px-3 py-2"
            />
            <ErrorMessage
              name="answer"
              component="div"
              className="text-red-600 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white rounded-xl px-6 py-3 font-semibold hover:bg-gray-800 transition"
          >
            Beküldés
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default TreasureAnswerForm;
