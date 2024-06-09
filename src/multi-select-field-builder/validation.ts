import { object, string } from "yup";

export const MultiOptionSchema = object().shape({
  label: string().required("Required"),
});
