import * as yup from "yup";

export const appointmentBookingSchema = yup.object().shape({
  patientId: yup.string().required("/Email/Phone/Patient ID is required"),
  departmentId: yup.string().required("Select a department"),
  serviceId: yup.string().required("Select a staff"),
  doctorId: yup.string().required("Select a doctor"),
  appointmentDate: yup.string().required("Select a date"),
  time: yup.string().required("Select a time"),
  verifyPatient: yup.string().required("Confirm information"),
  message: yup.string(),
});
