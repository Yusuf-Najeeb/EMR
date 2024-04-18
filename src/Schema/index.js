import * as yup from "yup";

export const appointmentBookingSchema = yup.object().shape({
  username: yup.string().required("/Email/Phone/Patient ID is required"),
  department: yup.string().required("Select a department"),
  service: yup.string().required("Select a staff"),
  doctor: yup.string().required("Select a doctor"),
  date: yup.string().required("Select a date"),
  time: yup.string().required("Select a time"),
  message: yup.string(),
});
