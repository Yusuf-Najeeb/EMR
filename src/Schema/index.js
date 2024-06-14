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

export const newPatientSchema = yup.object().shape({
  surname: yup.string().required("Surname is required"),
  other_names: yup.string().required("otherNames are required"),
  email: yup.string().email().required("email is required"),
  phone_number: yup.string().min(11).required("Phone number required"),
  gender: yup.string().required("Gender is required"),
  date_of_birth: yup.string().required("Date of Birth is required"),
  address: yup.string().required("Address is required"),
  nationality: yup.string().required("Nationality is required"),
  country_of_residence: yup.string().required("Resident country is required"),
  serviceId: yup.number().required("Select a staff"),
  appointmentDate: yup.string().required("Select a date"),
  time: yup.string().required("Select a time"),
  doctorId: yup.number().required("Select a doctor"),
  departmentId: yup.number().required("Select a department"),
  message: yup.string(),
});
